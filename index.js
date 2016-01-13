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
		if (Array.isArray(args)) {
			super.trigger(evt, args);
		} else {
			var arr = [];
			arr.push(args);
			super.trigger(evt, arr);
		}
	}

	unbind(eventObj) {
		super.off(eventObj.evt, eventObj.listener);
	}
}

class ModuleHelper extends ModuleEventEmitter {

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

  assign(path, assign) { 
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

  instantiate(path, className, events) {
    
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
              // todo: refractor this, connect event emitter with loader
              // so this flag would be added automatically
              if (baseClassObj['_triggered_' + onBaseClass]) {
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
        this.assign(path, new className());
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

  registerEvent(event) {
    if(this.triggered.indexOf(event) == -1) { 
      this.triggered.push(event);
      this.emit(event);
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

var moduleHelper = new ModuleHelper();
moduleHelper.eventEmitter = ModuleEventEmitter;

window.moduleHelper = moduleHelper;