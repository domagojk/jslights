var EventEmitter = require('wolfy87-eventemitter');

class ModuleEventEmitter extends EventEmitter {
  on(evt, listener) {
    super.on(evt, listener);
    return {
      evt: evt,
      listener: listener
    };
  }

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
      this.on(path, function() {
        cb();
      });
    }
  }

  _assign(path, assign) { 
    assign.jsLights = {
      path: path
    };

    var components = path.split('.');

    var pointer = window;
    var i = 0;

    for (var component of components) {
      i++;

      if(!pointer[component]) {
        if(i == components.length)
          pointer[component] = assign;
        else
          pointer[component] = {};
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
                baseClassObj.on(onBaseClass, () => {
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
        this._assign(path, cb());
        return false;
      }
      return deps;
    }

    var deps = checkDeps(events, true);
    if (!deps) {
      return;
    }

    deps.forEach( dependency => {
      this.on(dependency, function() {
        checkDeps(deps);
      }); 
    });
  }

  registerEvent(event) {
    if(this.triggered.indexOf(event) == -1) { 
      this.triggered.push(event);
      this.trigger(event);
    }
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
