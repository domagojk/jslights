var EventEmitter = require('wolfy87-eventemitter');

class ModuleEventEmitter extends EventEmitter {
  on(evt, listener) {
    super.on(evt, listener);
    return {
      evt: evt,
      listener: listener
    };
  }

  //todo: intercept emit
  trigger(evt, args) {
    //if (!Array.isArray(args)) {
      var arr = [];
      arr.push(args);
      args = arr;
    //}

    if (window.jsLights.monitor) {
      this._monitoring(evt, args);   
    } else {
      super.trigger(evt, args);
    }

    this._registerTrigger(evt);
  }

  unbind(eventObj) {
    if (!eventObj) {
      return;
    }
    super.off(eventObj.evt, eventObj.listener);
  }

  _monitoring(evt, args) {
    var start = performance.now();
    super.trigger(evt, args);
    var end = performance.now();
    var time = end - start;

    var path = this.constructor.name;
    if (path == 'jsLights') {
      path = evt;
    } else {
      if (this.jsLights && this.jsLights.path) {
        path = this.jsLights.path;
      }
      path += '->' + evt;
    }
    
    if (!window.jsLights._monitStats[path]) {
      window.jsLights._monitStats[path] = {
        executed: 0,
        totalExecTime: 0
      };
    }
    var c = window.jsLights._monitStats[path];
    c.totalExecTime += time;
    c.executed++;
    c.avgExecTime = c.totalExecTime / c.executed;
    c.totalExecTime = parseFloat(c.totalExecTime.toFixed(2));
    c.avgExecTime = parseFloat(c.avgExecTime.toFixed(2));

    if (!this._events)
      c.listeners = 0;
    else 
      c.listeners = Object.keys(this._events).length;
  }

  _registerTrigger(evt) {
    if (!this.jsLights) {
      this.jsLights = {};
    }
    if (!this.jsLights.triggered) {
      this.jsLights.triggered = {};
    } 
    if (this.jsLights.triggered[evt] !== undefined) {
      this.jsLights.triggered[evt]++;
    } else {
      this.jsLights.triggered[evt] = 1;
    }
  }
}

class jsLights extends ModuleEventEmitter {

  constructor() {
    super();

    this.triggered = ['EventEmitter'];
    this._beforeDependency = {};
    this._classExtendedWith = {};

    if (document.body) {
      this.triggered.push('onDocumentReady');
    } else {
      document.addEventListener('DOMContentLoaded', () => {
        this.registerEvent('onDocumentReady');
      });
    }
  }

  assign(path, reference, dependency) {
    var register = this.register(path, reference);
    register.after(dependency)
    register.assign();
    return register;
  }

  register(path, reference) {
    var jsLights = this;

    if (!path) {
      throw new Error('Missing namespace or reference');
    }
    if (typeof path != "string") {
      reference = path;
      path = false;
    }

    return new class {
      constructor() {
        this._after = [];
        this.path = path;
        this.reference = reference;
        this._listeningFor = new Set();
      }

      after(path) {
        if (typeof path == 'string')
          this._after.push(path);
        else if (Array.isArray(path))
          this._after = this._after.concat(path);

        return this;
      }

      before(path) {
        if (!this.path) {
          throw Error('can not set before() without namespacing function');
        }

        var paths = [];
        if (typeof path == 'string')
          paths.push(path);
        else if (Array.isArray(path))
          paths = paths.concat(path);

        for (var i=0; i<paths.length; i++) {
          var path = paths[i];
          if(jsLights.triggered.indexOf(path) != -1) { 
            throw new Error(path + ' is already trigger');
          }

          if (jsLights._beforeDependency[path]) {
            if (jsLights._beforeDependency[path].indexOf(this.path) == -1) {
              jsLights._beforeDependency[path].push(this.path);
            }
          } else {
            jsLights._beforeDependency[path] = [this.path];
          }
        }
        
        return this;
      }

      instantiate(params) {

        this.onPassedDependencies = () => {
          var reference = new this.reference(params);
          if (this.path) {
            jsLights._assign(this.path, reference, this._override);
          }
        };
        this._checkDependencies();

        return this;
      }

      execute(params) {
        
        this.onPassedDependencies = () => {
          var reference = this.reference(params);
          if (this.path) {
            jsLights._assign(this.path, reference, this._override);
          }
        };
        this._checkDependencies();

        return this;
      }

      override() {
        this._override = true;
        return this;
      }

      extend(path, reference) {

        this._classCreator = reference || this.reference;

        // when path is instantiated
        jsLights.onPathInstantiated(path, () => {
          // creating new class constructor
          this.reference = this._classCreator(jsLights._getPropertyByPath(path));
          // assigning it at "path"
          this.assign();

          // "recompile" all classes which extends this one
          jsLights._recompileClass(this);

          if (!jsLights._classExtendedWith[path]) {
           jsLights._classExtendedWith[path] = new Set();
          }
          
          jsLights._classExtendedWith[path].add(this);
          
        });

        return this;
      }

      assign() {
        this.onPassedDependencies = () => {
          jsLights._assign(this.path, this.reference, this._override);
        };
        this._checkDependencies();

        return this;
      }

      _checkDependencies() {

        // should some events be assigned before
        if (this._before) {
          // check if there are dependencies for assigned path
          for (var i=0; i < this._before.length; i++) {
            // itereate over dependencies
            var depPath = this._before[i];
            // check if already triggered
            if (jsLights.triggered.indexOf(depPath) != -1) {
              // event is already triggered
              if (!this._startedDepCheck) {
                // if initial check
                throw new Error(depPath +' is already assigned. Can not set before() for ' + this.path);
              } else {
                continue;
              }
            } 
            // set listener for dependency
            jsLights.once(depPath, () => {
              this._checkDependencies();
            });
            return;
          }
        }

        var passed = 0;
        this._after.forEach( dependency => {
          if (jsLights.triggered.indexOf(dependency) != -1) 
            passed++;
        });

        if (passed == this._after.length) {
          if (this.onPassedDependencies) {
            this.onPassedDependencies();
          }
          this.onPassedDependencies = false;
          return;
        }

        this._after.forEach( dependency => {
          if (!this._startedDepCheck && dependency.indexOf('->') != -1) {
            var eventsArr = dependency.split('->');
            var baseClass = eventsArr[0];
            var onBaseClass = eventsArr[1];

            jsLights.onPathInstantiated(baseClass, () => {
              var baseClassObj = jsLights._getPropertyByPath(baseClass);
              if (!baseClassObj) {
                throw new Error(baseClass + ' not found');
              }
              else if (!baseClassObj.on) {
                throw new Error(baseClass + ' has no .on function');
              } else {
                if (baseClassObj.jsLights && baseClassObj.jsLights.triggered && baseClassObj.jsLights.triggered[onBaseClass]) {
                  jsLights.registerEvent(dependency);
                } else {
                  baseClassObj.once(onBaseClass, () => {
                    jsLights.registerEvent(dependency);
                  });
                }
              }
            });
          }

          if (jsLights.triggered.indexOf(dependency) == -1) {
            // dependency is not yet triggered
            // when registered, start again
            if (!this._listeningFor.has(dependency)) {
              this._listeningFor.add(dependency);

              jsLights.once(dependency, () => {
                this._checkDependencies();
                this._listeningFor.delete(dependency);
              });
            }
            
          }
        });
        this._startedDepCheck = true;
      }
    }
  }

  extend(path, reference) {
    var register = this.register(path);
    register.override()
    register.extend(path, reference);
    return register;
  }

  instantiate(path, reference, dependency) {
    var register = this.register(path, reference);
    register.after(dependency)
    register.instantiate();
    return register;
  }

  onPathInstantiated(path, cb) {
    if (this.triggered.indexOf(path) != -1) {
      cb();
    } else {
      var self = this;
      this.once(path, function() {
        cb();
      });
    }
  }

  _assign(path, assign, override) { 

    if (!path) {
      throw new Error('can not assign without namespace');
    }

    if (!assign === undefined) {
      throw new Error('can not assign "undefined" for ' + path);
    }

    if (assign) {
      assign.jsLights = {
        path: path
      };
    }

    var components = path.split('.');

    var pointer = window;
    var i = 0;

    for (var component of components) {
      i++;

      if(!pointer[component]) {
        pointer[component] = {};
      }

      if(i == components.length) {
        pointer[component] = assign;
      }

      pointer = pointer[component];
    }
    this.registerEvent(path);
  }

  _recompileClass(origReference) {
    if (this._classExtendedWith[origReference.path]) { 
      for (let c of this._classExtendedWith[origReference.path]) {
        if(origReference == c) {
          continue;
        }
        // creating new class constructor
        c.reference = c._classCreator(this._getPropertyByPath(origReference.path));
        // assigning and overiding it
        c.override();
        c.assign();
        this._recompileClass(c);
      }
    }
  }

  registerEvent(event) {
    
    if(this.triggered.indexOf(event) == -1) { 
      this.triggered.push(event);
    }
    this.trigger(event);
  }

  _getPropertyByPath(path) {
    
    if (path == 'EventEmitter') {
      return window.jsLights.eventEmitter;
    }

    var parts = path.split( '.' );
    var property = window;

    for (var i = 0; i < parts.length; i++ ) {
      property = property[parts[i]];
      if (property === undefined)
        return undefined;
    }
    
    if(i == 0)
      return undefined;

    return property;
  }
}

var jsl = new jsLights();
jsl._monitStats = {}
jsl.stats = function() {
  console.table(jsl._monitStats);
}
jsl.eventEmitter = ModuleEventEmitter;

window.jsLights = jsl;
