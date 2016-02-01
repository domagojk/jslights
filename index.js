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

    this.triggered = [];
    this._beforeDependency = {};

    if (document.body) {
      this.triggered.push('onDocumentReady');
    } else {
      document.addEventListener('DOMContentLoaded', () => {
        this.registerEvent('onDocumentReady');
      });
    }
  }

  assign(path, reference, dependency) {
    this._onPassedDependencies({
      path: path,
      dependency: dependency
    }, function() {
      return reference;
    });
  }

  register(path, reference) {
    var jsLights = this;

    return new class {
      constructor() {
        this._after = [];
        this.path = path;
        this.reference = reference;
      }

      after(path) {
        if (typeof path == 'string')
          this._after.push(path);
        else if (Array.isArray(path))
          this._after = this._after.concat(path);

        return this;
      }

      before(path) {
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

        return this;
      }

      instantiate(params) {
        jsLights._onPassedDependencies({
          path: this.path,
          override: (params && params.override) ? params.override : this.override,
          dependency: this._after
        }, () => {
          return new this.reference(params);
        });

        return this;
      }

      execute(params) {
        jsLights._onPassedDependencies({
          path: this.path,
          override: (params && params.override) ? params.override : this.override,
          dependency: this._after
        }, () => {
          return this.reference(params);
        });

        return this;
      }

      assign(params) {
        jsLights._onPassedDependencies({
          path: this.path,
          override: (params && params.override) ? params.override : this.override,
          dependency: this._after
        }, () => {
          return this.reference;
        });

        return this;
      }
    }
  }

  override(path, reference) {
    var register = this.register(path, reference);
    register.override = true;
    register._after.push(path);
    return register;
  }

  instantiate(path, reference, dependency) {
    this._onPassedDependencies({
      path: path,
      dependency: dependency
    }, function() {
      return new reference();
    });
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

  _assign(path, cb) { 

    // should some events be assigned before
    if (this._beforeDependency[path]) {
      // check if there are dependencies for assigned path
      for (var i=0; i < this._beforeDependency[path].length; i++) {
        // itereate over dependencies
        var depPath = this._beforeDependency[path][i];
        // set listener for dependency
        this.once(depPath, () => {
          let index = this._beforeDependency[path].indexOf(depPath);
          this._beforeDependency[path].splice(index, 1);
          this._assign(path, cb);
        });
        return;
      }
    }

    var assign = cb();

    assign.jsLights = {
      path: path
    };

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

  _onPassedDependencies(params, cb) {
    var events = params.dependency;
    var path = params.path;

    if (!events)
      events = [];

    if (typeof events == 'string') {
      events = [events];
    }

    var checkDeps = (events, initial) => {
      // if class is already instantiated
      if (this.triggered.indexOf(path) != -1) {
        if (params.override) {
          this._assign(path, cb);
        }

        return;
      }

      var deps = [];
      events.forEach( dependency => {
        if (initial && dependency.indexOf('->') != -1) {
          var eventsArr = dependency.split('->');
          var baseClass = eventsArr[0];
          var onBaseClass = eventsArr[1];

          this.onPathInstantiated(baseClass, () => {
            var baseClassObj = this._getPropertyByPath(baseClass);
            if (!baseClassObj) {
              throw new Error(baseClass + ' not found');
            }
            else if (!baseClassObj.on) {
              throw new Error(baseClass + ' has no .on function');
            } else {
              if (baseClassObj.jsLights && baseClassObj.jsLights.triggered && baseClassObj.jsLights.triggered[onBaseClass]) {
                this.registerEvent(dependency);
              } else {
                baseClassObj.once(onBaseClass, () => {
                  this.registerEvent(dependency);
                });
              }
            }
          });
        }

        if (this.triggered.indexOf(dependency) == -1) {
          // dependency is not yet triggered
          deps.push(dependency);
        }
      });

      if (deps.length == 0) {
        this._assign(path, cb);
        return false;
      }
      return deps;
    }

    var deps = checkDeps(events, true);
    if (!deps) {
      return;
    }

    deps.forEach( dependency => {
      this.once(dependency, function() {
        checkDeps(deps);
      }); 
    });
  }

  registerEvent(event) {
    
    if(this.triggered.indexOf(event) == -1) { 
      this.triggered.push(event);
    }
    this.trigger(event);
  }

  _getPropertyByPath(path) {
      
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
