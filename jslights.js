var EventEmitter = require('wolfy87-eventemitter');

class ModuleEventEmitter extends EventEmitter {

  constructor(params) {
    super(params);
    this._hooks = {};
  }

  on(evt, listener) {
    super.on(evt, listener);
    return {
      evt: evt,
      listener: listener
    };
  }

  addHook(name, cb, options) {
    if (!this._hooks[name]) {
      this._hooks[name] = [];
    }

    var priority = (options && options.priority) ? options.priority : 0;

    this._hooks[name].push({
      cb: cb,
      priority: priority
    });

    this._hooks[name] = this._hooks[name].sort(function(a, b) {
      return b.priority - a.priority;
    });
  }

  callHooks(name, ref) {
    if (this._hooks[name]) {
      for (var i=0; i < this._hooks[name].length; i++) {
        var hook = this._hooks[name][i];
        var returnHookVal = hook.cb(ref);
        if (returnHookVal) {
          return returnHookVal;
        }
      }
    }
  }

  trigger(evt, args) {
    var arr = [];
    arr.push(args);
    args = arr;

    super.trigger(evt, args);
    this._registerTrigger(evt);
  }

  unbind(eventObj) {
    if (!eventObj) {
      return;
    }
    super.off(eventObj.evt, eventObj.listener);
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

class JsLights extends ModuleEventEmitter {

  constructor() {
    super();

    this.triggered = ['EventEmitter', 'Base'];
    this._beforeDependency = {};
    this._classExtendedWith = {};
    this._alias = {};
    this._registered = new Set();

    if (document) {
      if (document.body) {
        this.triggered.push('onDocumentReady');
      } else {
        document.addEventListener('DOMContentLoaded', () => {
          this.registerEvent('onDocumentReady');
        });
      }
    }
  }

  assign(path, reference, dependency) {
    var register = this.register(path, reference);
    register.after(dependency)
    register.assign();
    return register;
  }

  after(after, cb) {
    if (typeof cb != 'function') {
      throw new Error('invalid callback function');
    }

    if (!Array.isArray(after)) {
      after = [after];
    }

    var passed = 0;
    after.forEach( dependency => {
      if (this.triggered.indexOf(dependency) != -1) 
        passed++;
    });

    if (passed == after.length) {
      cb();
      delete cb.jsLights;
      return;
    }

    if (!cb.jsLights)
      cb.jsLights = {};

    if (!cb.jsLights._listeningFor)
      cb.jsLights._listeningFor = new Set();

    after.forEach( dependency => {
      if (!cb.jsLights._startedDepCheck && dependency.indexOf('->') != -1) {
        var eventsArr = dependency.split('->');
        var baseClass = eventsArr[0];
        var onBaseClass = eventsArr[1];

        jsLights.after(baseClass, () => {
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
        if (!cb.jsLights._listeningFor.has(dependency)) {
          cb.jsLights._listeningFor.add(dependency);

          jsLights.once(dependency, () => {
            jsLights.after(after, cb);

            if (cb.jsLights && cb.jsLights._listeningFor) 
              cb.jsLights._listeningFor.delete(dependency);
          });
        }
        
      }
    });
    cb.jsLights._startedDepCheck = true;
  }

  createInstances(config) {
    for (var path in config) {
      this.register(path, function(path) {
        var fn = this._getPropertyByPath(path);
        return new fn();
      }.bind(this, config[path])).dependency(config[path]).execute();
    }
  }

  register(path, reference) {
    var jsLights = this;

    if (typeof path != "string") {
      reference = path;
      path = false;
    }

    return new class {
      constructor() {
        this._after = [];
        this.path = jsLights._getOriginPath(path);
        this.reference = reference;
        this._listeningFor = new Set();

        jsLights._registered.add(this);
      }

      after(path) {
        if (typeof path == 'string')
          this._after.push(path);
        else if (Array.isArray(path))
          this._after = this._after.concat(path);

        return this;
      }

      before(path) {
        if (!this.path)
          throw Error('can not set before() without namespacing function');

        var paths = [];
        if (typeof path == 'string')
          paths.push(path);
        else if (Array.isArray(path))
          paths = paths.concat(path);

        for (var i=0; i<paths.length; i++) {
          var path = paths[i];
          if(jsLights.triggered.indexOf(path) != -1)
            throw new Error(path + ' is already trigger');

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

      dependency(path) {
        // alias of "after"
        return this.after(path);
      }

      instantiate(params) {

        this.onPassedDependencies = () => {
          var reference = new this.reference(params);
          this._assign(reference);
        };
        this._checkDependencies();

        return this;
      }

      execute() {
        
        if (!this.onPassedDependencies) {
          this.onPassedDependencies = () => {
            var reference = this.reference();
            this._assign(reference);
          };
        }
        
        this._checkDependencies();

        return this;
      }

      executeAs(id) {
        this.id(id);
        this.execute();
      }

      id(id) {
        this._id = id;
        this.path = jsLights._getOriginPath(this.path);
        jsLights._alias[id] = this.path;

        if (this._assigned) {
          jsLights.registerEvent(id);
        }

        return this;
      }

      extends(path, reference) {

        path = jsLights._getOriginPath(path);

        if (!this.reference && reference) {
          // if there is no registered reference, assign it inside extends()
          this.reference = reference;
        }
        if (!this.path && path) {
          // if there is no registered path, assign it inside extends()
          this.path = path;
          if (this._id)
            jsLights._alias[this._id] = this.path;
        }

        this._classCreator = this.reference;
        // add path as dependency for this class
        this.after(path);

        this.onPassedDependencies = () => {

          var superReference = jsLights._getPropertyByPath(path);
          var superjsLightsInstance = superReference._jsLightsInstance;
          this.parent = superjsLightsInstance;
          this.reference = this._classCreator(superReference);
          this.reference._jsLightsInstance = this;

          if (superjsLightsInstance) {
            superjsLightsInstance._addChild(this);       
          }

          if (this.path == path) {
            superjsLightsInstance._recompileChildren(this);
          }

          this.assign();
                    
        };

        return this;
      }

      assign() {
        this.onPassedDependencies = () => {
          this._assign(this.reference);
        };
        this._checkDependencies();

        return this;
      }

      _assign(reference) {
        if (!this.path)
          throw new Error('can not assign without namespace');

        if (!reference === undefined)
          throw new Error('can not assign "undefined" for ' + this.path);

        if (reference) {
          reference.jsLights = {
            path: this.path
          };
        }

        var components = this.path.split('.');
        var pointer = window;
        var i = 0;

        for (var component of components) {
          i++;

          if(!pointer[component]) {
            pointer[component] = {};
          }

          if(i == components.length) {
            pointer[component] = reference;
          }

          pointer = pointer[component];
        }

        jsLights.registerEvent(this.path);

        if (this._id) {
          jsLights.registerEvent(this._id);
        }
        this._assigned = true;
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

            jsLights.after(baseClass, () => {
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

      _recompileChildren(parent) {
        if (!this.children)
          return;

        this.children.forEach(child => {
          if (child != parent) {
            child.reference = child._classCreator(parent.reference);
            child.assign();

            child._recompileChildren(child);
          }
        });
      }

      _addChild(child) {
        if (!this.children)
          this.children = [];

        this.children.push(child);  
      }
    }
  }

  extend(path, reference) {
    var register = this.register(path, reference);
    register.extends(path);
    return register;
  }

  id(id) {
    var register = this.register();
    register.id(id)
    return register;
  }

  inspect(path) {
    if (!path) {
      throw new Error('Invalid path');
    }
    
    var found = false;
    for (var item of this._registered) {
      if (item.path == path) {
        found = true;
        if (item.onPassedDependencies == false) {
          console.log('Status: %cTriggered', 'color: green;')
        } else {
          console.log('Status: %cPending', 'color: red;')
        }

        if (item._after.length) {
          console.log('Dependencies:');
          item._after.forEach( dep => {
            if (this.triggered.indexOf(dep) == -1) {
              console.log(dep + ' %c (pending)', 'color: red')
            } else {
              console.log(dep + ' %c (triggered)', 'color: green')
            }
          });
        }
      }
    }

    if (!found) {
      console.log(path + ' is not registered');
    }
  }

  instantiate(path, reference, dependency) {
    var register = this.register(path, reference);
    register.after(dependency)
    register.instantiate();
    return register;
  }

  // deprecated
  onPathInstantiated(path, cb) {
    console.warn("jsLights.onPathInstantiated is deprecated. Please use after()");
    console.trace();
    if (this.triggered.indexOf(path) != -1) {
      cb();
    } else {
      var self = this;
      this.once(path, function() {
        cb();
      });
    }
  }

  registerEvent(event) {
    
    if(this.triggered.indexOf(event) == -1) { 
      this.triggered.push(event);
    }
    this.trigger(event);
  }

  _getOriginPath(path) {
    while (this._alias[path]) {
      path = this._alias[path];
    }
    return path;
  } 

  _getPropertyByPath(path) {
    
    path = this._alias[path] || path;

    if (path == 'EventEmitter' || path == 'Base') {
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

var jsl = new JsLights();
jsl.eventEmitter = jsl.base = ModuleEventEmitter;

window.jsLights = jsl;
