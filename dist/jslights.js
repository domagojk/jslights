(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EventEmitter = require('wolfy87-eventemitter');

var ModuleEventEmitter = (function (_EventEmitter) {
  _inherits(ModuleEventEmitter, _EventEmitter);

  function ModuleEventEmitter() {
    _classCallCheck(this, ModuleEventEmitter);

    _get(Object.getPrototypeOf(ModuleEventEmitter.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(ModuleEventEmitter, [{
    key: 'on',
    value: function on(evt, listener) {
      _get(Object.getPrototypeOf(ModuleEventEmitter.prototype), 'on', this).call(this, evt, listener);
      return {
        evt: evt,
        listener: listener
      };
    }

    //todo: intercept emit
  }, {
    key: 'trigger',
    value: function trigger(evt, args) {
      //if (!Array.isArray(args)) {
      var arr = [];
      arr.push(args);
      args = arr;
      //}

      if (window.jsLights.monitor) {
        this._monitoring(evt, args);
      } else {
        _get(Object.getPrototypeOf(ModuleEventEmitter.prototype), 'trigger', this).call(this, evt, args);
      }

      this._registerTrigger(evt);
    }
  }, {
    key: 'unbind',
    value: function unbind(eventObj) {
      if (!eventObj) {
        return;
      }
      _get(Object.getPrototypeOf(ModuleEventEmitter.prototype), 'off', this).call(this, eventObj.evt, eventObj.listener);
    }
  }, {
    key: '_monitoring',
    value: function _monitoring(evt, args) {
      var start = performance.now();
      _get(Object.getPrototypeOf(ModuleEventEmitter.prototype), 'trigger', this).call(this, evt, args);
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

      if (!this._events) c.listeners = 0;else c.listeners = Object.keys(this._events).length;
    }
  }, {
    key: '_registerTrigger',
    value: function _registerTrigger(evt) {
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
  }]);

  return ModuleEventEmitter;
})(EventEmitter);

var jsLights = (function (_ModuleEventEmitter) {
  _inherits(jsLights, _ModuleEventEmitter);

  function jsLights() {
    var _this = this;

    _classCallCheck(this, jsLights);

    _get(Object.getPrototypeOf(jsLights.prototype), 'constructor', this).call(this);

    this.triggered = ['EventEmitter'];
    this._beforeDependency = {};
    this._classExtendedWith = {};

    if (document.body) {
      this.triggered.push('onDocumentReady');
    } else {
      document.addEventListener('DOMContentLoaded', function () {
        _this.registerEvent('onDocumentReady');
      });
    }
  }

  _createClass(jsLights, [{
    key: 'assign',
    value: function assign(path, reference, dependency) {
      var register = this.register(path, reference);
      register.after(dependency);
      register.assign();
      return register;
    }
  }, {
    key: 'register',
    value: function register(path, reference) {
      var jsLights = this;

      if (!path) {
        throw new Error('Missing namespace or reference');
      }
      if (typeof path != "string") {
        reference = path;
        path = false;
      }

      return new ((function () {
        function _class() {
          _classCallCheck(this, _class);

          this._after = [];
          this.path = path;
          this.reference = reference;
          this._listeningFor = new Set();
        }

        _createClass(_class, [{
          key: 'after',
          value: function after(path) {
            if (typeof path == 'string') this._after.push(path);else if (Array.isArray(path)) this._after = this._after.concat(path);

            return this;
          }
        }, {
          key: 'before',
          value: function before(path) {
            if (!this.path) {
              throw Error('can not set before() without namespacing function');
            }

            var paths = [];
            if (typeof path == 'string') paths.push(path);else if (Array.isArray(path)) paths = paths.concat(path);

            for (var i = 0; i < paths.length; i++) {
              var path = paths[i];
              if (jsLights.triggered.indexOf(path) != -1) {
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
        }, {
          key: 'instantiate',
          value: function instantiate(params) {
            var _this2 = this;

            this.onPassedDependencies = function () {
              var reference = new _this2.reference(params);
              if (_this2.path) {
                jsLights._assign(_this2.path, reference, _this2._override);
              }
            };
            this._checkDependencies();

            return this;
          }
        }, {
          key: 'execute',
          value: function execute(params) {
            var _this3 = this;

            this.onPassedDependencies = function () {
              var reference = _this3.reference(params);
              if (_this3.path) {
                jsLights._assign(_this3.path, reference, _this3._override);
              }
            };
            this._checkDependencies();

            return this;
          }
        }, {
          key: 'override',
          value: function override() {
            this._override = true;
            return this;
          }
        }, {
          key: 'extend',
          value: function extend(path, reference) {
            var _this4 = this;

            this._classCreator = reference || this.reference;

            // when path is instantiated
            jsLights.onPathInstantiated(path, function () {
              // creating new class constructor
              _this4.reference = _this4._classCreator(jsLights._getPropertyByPath(path));
              // assigning it at "path"
              _this4.assign();

              // "recompile" all classes which extends this one
              jsLights._recompileClass(_this4);

              if (!jsLights._classExtendedWith[path]) {
                jsLights._classExtendedWith[path] = new Set();
              }

              jsLights._classExtendedWith[path].add(_this4);
            });

            return this;
          }
        }, {
          key: 'assign',
          value: function assign() {
            var _this5 = this;

            this.onPassedDependencies = function () {
              jsLights._assign(_this5.path, _this5.reference, _this5._override);
            };
            this._checkDependencies();

            return this;
          }
        }, {
          key: '_checkDependencies',
          value: function _checkDependencies() {
            var _this6 = this;

            // should some events be assigned before
            if (this._before) {
              // check if there are dependencies for assigned path
              for (var i = 0; i < this._before.length; i++) {
                // itereate over dependencies
                var depPath = this._before[i];
                // check if already triggered
                if (jsLights.triggered.indexOf(depPath) != -1) {
                  // event is already triggered
                  if (!this._startedDepCheck) {
                    // if initial check
                    throw new Error(depPath + ' is already assigned. Can not set before() for ' + this.path);
                  } else {
                    continue;
                  }
                }
                // set listener for dependency
                jsLights.once(depPath, function () {
                  _this6._checkDependencies();
                });
                return;
              }
            }

            var passed = 0;
            this._after.forEach(function (dependency) {
              if (jsLights.triggered.indexOf(dependency) != -1) passed++;
            });

            if (passed == this._after.length) {
              if (this.onPassedDependencies) {
                this.onPassedDependencies();
              }
              this.onPassedDependencies = false;
              return;
            }

            this._after.forEach(function (dependency) {
              if (!_this6._startedDepCheck && dependency.indexOf('->') != -1) {
                var eventsArr = dependency.split('->');
                var baseClass = eventsArr[0];
                var onBaseClass = eventsArr[1];

                jsLights.onPathInstantiated(baseClass, function () {
                  var baseClassObj = jsLights._getPropertyByPath(baseClass);
                  if (!baseClassObj) {
                    throw new Error(baseClass + ' not found');
                  } else if (!baseClassObj.on) {
                    throw new Error(baseClass + ' has no .on function');
                  } else {
                    if (baseClassObj.jsLights && baseClassObj.jsLights.triggered && baseClassObj.jsLights.triggered[onBaseClass]) {
                      jsLights.registerEvent(dependency);
                    } else {
                      baseClassObj.once(onBaseClass, function () {
                        jsLights.registerEvent(dependency);
                      });
                    }
                  }
                });
              }

              if (jsLights.triggered.indexOf(dependency) == -1) {
                // dependency is not yet triggered
                // when registered, start again
                if (!_this6._listeningFor.has(dependency)) {
                  _this6._listeningFor.add(dependency);

                  jsLights.once(dependency, function () {
                    _this6._checkDependencies();
                    _this6._listeningFor['delete'](dependency);
                  });
                }
              }
            });
            this._startedDepCheck = true;
          }
        }]);

        return _class;
      })())();
    }
  }, {
    key: 'extend',
    value: function extend(path, reference) {
      var register = this.register(path);
      register.override();
      register.extend(path, reference);
      return register;
    }
  }, {
    key: 'instantiate',
    value: function instantiate(path, reference, dependency) {
      var register = this.register(path, reference);
      register.after(dependency);
      register.instantiate();
      return register;
    }
  }, {
    key: 'onPathInstantiated',
    value: function onPathInstantiated(path, cb) {
      if (this.triggered.indexOf(path) != -1) {
        cb();
      } else {
        var self = this;
        this.once(path, function () {
          cb();
        });
      }
    }
  }, {
    key: '_assign',
    value: function _assign(path, assign, override) {

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

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = components[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var component = _step.value;

          i++;

          if (!pointer[component]) {
            pointer[component] = {};
          }

          if (i == components.length) {
            pointer[component] = assign;
          }

          pointer = pointer[component];
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator['return']) {
            _iterator['return']();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      this.registerEvent(path);
    }
  }, {
    key: '_recompileClass',
    value: function _recompileClass(origReference) {
      if (this._classExtendedWith[origReference.path]) {
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = this._classExtendedWith[origReference.path][Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var c = _step2.value;

            if (origReference == c) {
              continue;
            }
            // creating new class constructor
            c.reference = c._classCreator(this._getPropertyByPath(origReference.path));
            // assigning and overiding it
            c.override();
            c.assign();
            this._recompileClass(c);
          }
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2['return']) {
              _iterator2['return']();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }
      }
    }
  }, {
    key: 'registerEvent',
    value: function registerEvent(event) {

      if (this.triggered.indexOf(event) == -1) {
        this.triggered.push(event);
      }
      this.trigger(event);
    }
  }, {
    key: '_getPropertyByPath',
    value: function _getPropertyByPath(path) {

      if (path == 'EventEmitter') {
        return window.jsLights.eventEmitter;
      }

      var parts = path.split('.');
      var property = window;

      for (var i = 0; i < parts.length; i++) {
        property = property[parts[i]];
        if (property === undefined) return undefined;
      }

      if (i == 0) return undefined;

      return property;
    }
  }]);

  return jsLights;
})(ModuleEventEmitter);

var jsl = new jsLights();
jsl._monitStats = {};
jsl.stats = function () {
  console.table(jsl._monitStats);
};
jsl.eventEmitter = ModuleEventEmitter;

window.jsLights = jsl;

},{"wolfy87-eventemitter":2}],2:[function(require,module,exports){
/*!
 * EventEmitter v4.2.11 - git.io/ee
 * Unlicense - http://unlicense.org/
 * Oliver Caldwell - http://oli.me.uk/
 * @preserve
 */

;(function () {
    'use strict';

    /**
     * Class for managing events.
     * Can be extended to provide event functionality in other classes.
     *
     * @class EventEmitter Manages event registering and emitting.
     */
    function EventEmitter() {}

    // Shortcuts to improve speed and size
    var proto = EventEmitter.prototype;
    var exports = this;
    var originalGlobalValue = exports.EventEmitter;

    /**
     * Finds the index of the listener for the event in its storage array.
     *
     * @param {Function[]} listeners Array of listeners to search through.
     * @param {Function} listener Method to look for.
     * @return {Number} Index of the specified listener, -1 if not found
     * @api private
     */
    function indexOfListener(listeners, listener) {
        var i = listeners.length;
        while (i--) {
            if (listeners[i].listener === listener) {
                return i;
            }
        }

        return -1;
    }

    /**
     * Alias a method while keeping the context correct, to allow for overwriting of target method.
     *
     * @param {String} name The name of the target method.
     * @return {Function} The aliased method
     * @api private
     */
    function alias(name) {
        return function aliasClosure() {
            return this[name].apply(this, arguments);
        };
    }

    /**
     * Returns the listener array for the specified event.
     * Will initialise the event object and listener arrays if required.
     * Will return an object if you use a regex search. The object contains keys for each matched event. So /ba[rz]/ might return an object containing bar and baz. But only if you have either defined them with defineEvent or added some listeners to them.
     * Each property in the object response is an array of listener functions.
     *
     * @param {String|RegExp} evt Name of the event to return the listeners from.
     * @return {Function[]|Object} All listener functions for the event.
     */
    proto.getListeners = function getListeners(evt) {
        var events = this._getEvents();
        var response;
        var key;

        // Return a concatenated array of all matching events if
        // the selector is a regular expression.
        if (evt instanceof RegExp) {
            response = {};
            for (key in events) {
                if (events.hasOwnProperty(key) && evt.test(key)) {
                    response[key] = events[key];
                }
            }
        }
        else {
            response = events[evt] || (events[evt] = []);
        }

        return response;
    };

    /**
     * Takes a list of listener objects and flattens it into a list of listener functions.
     *
     * @param {Object[]} listeners Raw listener objects.
     * @return {Function[]} Just the listener functions.
     */
    proto.flattenListeners = function flattenListeners(listeners) {
        var flatListeners = [];
        var i;

        for (i = 0; i < listeners.length; i += 1) {
            flatListeners.push(listeners[i].listener);
        }

        return flatListeners;
    };

    /**
     * Fetches the requested listeners via getListeners but will always return the results inside an object. This is mainly for internal use but others may find it useful.
     *
     * @param {String|RegExp} evt Name of the event to return the listeners from.
     * @return {Object} All listener functions for an event in an object.
     */
    proto.getListenersAsObject = function getListenersAsObject(evt) {
        var listeners = this.getListeners(evt);
        var response;

        if (listeners instanceof Array) {
            response = {};
            response[evt] = listeners;
        }

        return response || listeners;
    };

    /**
     * Adds a listener function to the specified event.
     * The listener will not be added if it is a duplicate.
     * If the listener returns true then it will be removed after it is called.
     * If you pass a regular expression as the event name then the listener will be added to all events that match it.
     *
     * @param {String|RegExp} evt Name of the event to attach the listener to.
     * @param {Function} listener Method to be called when the event is emitted. If the function returns true then it will be removed after calling.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.addListener = function addListener(evt, listener) {
        var listeners = this.getListenersAsObject(evt);
        var listenerIsWrapped = typeof listener === 'object';
        var key;

        for (key in listeners) {
            if (listeners.hasOwnProperty(key) && indexOfListener(listeners[key], listener) === -1) {
                listeners[key].push(listenerIsWrapped ? listener : {
                    listener: listener,
                    once: false
                });
            }
        }

        return this;
    };

    /**
     * Alias of addListener
     */
    proto.on = alias('addListener');

    /**
     * Semi-alias of addListener. It will add a listener that will be
     * automatically removed after its first execution.
     *
     * @param {String|RegExp} evt Name of the event to attach the listener to.
     * @param {Function} listener Method to be called when the event is emitted. If the function returns true then it will be removed after calling.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.addOnceListener = function addOnceListener(evt, listener) {
        return this.addListener(evt, {
            listener: listener,
            once: true
        });
    };

    /**
     * Alias of addOnceListener.
     */
    proto.once = alias('addOnceListener');

    /**
     * Defines an event name. This is required if you want to use a regex to add a listener to multiple events at once. If you don't do this then how do you expect it to know what event to add to? Should it just add to every possible match for a regex? No. That is scary and bad.
     * You need to tell it what event names should be matched by a regex.
     *
     * @param {String} evt Name of the event to create.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.defineEvent = function defineEvent(evt) {
        this.getListeners(evt);
        return this;
    };

    /**
     * Uses defineEvent to define multiple events.
     *
     * @param {String[]} evts An array of event names to define.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.defineEvents = function defineEvents(evts) {
        for (var i = 0; i < evts.length; i += 1) {
            this.defineEvent(evts[i]);
        }
        return this;
    };

    /**
     * Removes a listener function from the specified event.
     * When passed a regular expression as the event name, it will remove the listener from all events that match it.
     *
     * @param {String|RegExp} evt Name of the event to remove the listener from.
     * @param {Function} listener Method to remove from the event.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.removeListener = function removeListener(evt, listener) {
        var listeners = this.getListenersAsObject(evt);
        var index;
        var key;

        for (key in listeners) {
            if (listeners.hasOwnProperty(key)) {
                index = indexOfListener(listeners[key], listener);

                if (index !== -1) {
                    listeners[key].splice(index, 1);
                }
            }
        }

        return this;
    };

    /**
     * Alias of removeListener
     */
    proto.off = alias('removeListener');

    /**
     * Adds listeners in bulk using the manipulateListeners method.
     * If you pass an object as the second argument you can add to multiple events at once. The object should contain key value pairs of events and listeners or listener arrays. You can also pass it an event name and an array of listeners to be added.
     * You can also pass it a regular expression to add the array of listeners to all events that match it.
     * Yeah, this function does quite a bit. That's probably a bad thing.
     *
     * @param {String|Object|RegExp} evt An event name if you will pass an array of listeners next. An object if you wish to add to multiple events at once.
     * @param {Function[]} [listeners] An optional array of listener functions to add.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.addListeners = function addListeners(evt, listeners) {
        // Pass through to manipulateListeners
        return this.manipulateListeners(false, evt, listeners);
    };

    /**
     * Removes listeners in bulk using the manipulateListeners method.
     * If you pass an object as the second argument you can remove from multiple events at once. The object should contain key value pairs of events and listeners or listener arrays.
     * You can also pass it an event name and an array of listeners to be removed.
     * You can also pass it a regular expression to remove the listeners from all events that match it.
     *
     * @param {String|Object|RegExp} evt An event name if you will pass an array of listeners next. An object if you wish to remove from multiple events at once.
     * @param {Function[]} [listeners] An optional array of listener functions to remove.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.removeListeners = function removeListeners(evt, listeners) {
        // Pass through to manipulateListeners
        return this.manipulateListeners(true, evt, listeners);
    };

    /**
     * Edits listeners in bulk. The addListeners and removeListeners methods both use this to do their job. You should really use those instead, this is a little lower level.
     * The first argument will determine if the listeners are removed (true) or added (false).
     * If you pass an object as the second argument you can add/remove from multiple events at once. The object should contain key value pairs of events and listeners or listener arrays.
     * You can also pass it an event name and an array of listeners to be added/removed.
     * You can also pass it a regular expression to manipulate the listeners of all events that match it.
     *
     * @param {Boolean} remove True if you want to remove listeners, false if you want to add.
     * @param {String|Object|RegExp} evt An event name if you will pass an array of listeners next. An object if you wish to add/remove from multiple events at once.
     * @param {Function[]} [listeners] An optional array of listener functions to add/remove.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.manipulateListeners = function manipulateListeners(remove, evt, listeners) {
        var i;
        var value;
        var single = remove ? this.removeListener : this.addListener;
        var multiple = remove ? this.removeListeners : this.addListeners;

        // If evt is an object then pass each of its properties to this method
        if (typeof evt === 'object' && !(evt instanceof RegExp)) {
            for (i in evt) {
                if (evt.hasOwnProperty(i) && (value = evt[i])) {
                    // Pass the single listener straight through to the singular method
                    if (typeof value === 'function') {
                        single.call(this, i, value);
                    }
                    else {
                        // Otherwise pass back to the multiple function
                        multiple.call(this, i, value);
                    }
                }
            }
        }
        else {
            // So evt must be a string
            // And listeners must be an array of listeners
            // Loop over it and pass each one to the multiple method
            i = listeners.length;
            while (i--) {
                single.call(this, evt, listeners[i]);
            }
        }

        return this;
    };

    /**
     * Removes all listeners from a specified event.
     * If you do not specify an event then all listeners will be removed.
     * That means every event will be emptied.
     * You can also pass a regex to remove all events that match it.
     *
     * @param {String|RegExp} [evt] Optional name of the event to remove all listeners for. Will remove from every event if not passed.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.removeEvent = function removeEvent(evt) {
        var type = typeof evt;
        var events = this._getEvents();
        var key;

        // Remove different things depending on the state of evt
        if (type === 'string') {
            // Remove all listeners for the specified event
            delete events[evt];
        }
        else if (evt instanceof RegExp) {
            // Remove all events matching the regex.
            for (key in events) {
                if (events.hasOwnProperty(key) && evt.test(key)) {
                    delete events[key];
                }
            }
        }
        else {
            // Remove all listeners in all events
            delete this._events;
        }

        return this;
    };

    /**
     * Alias of removeEvent.
     *
     * Added to mirror the node API.
     */
    proto.removeAllListeners = alias('removeEvent');

    /**
     * Emits an event of your choice.
     * When emitted, every listener attached to that event will be executed.
     * If you pass the optional argument array then those arguments will be passed to every listener upon execution.
     * Because it uses `apply`, your array of arguments will be passed as if you wrote them out separately.
     * So they will not arrive within the array on the other side, they will be separate.
     * You can also pass a regular expression to emit to all events that match it.
     *
     * @param {String|RegExp} evt Name of the event to emit and execute listeners for.
     * @param {Array} [args] Optional array of arguments to be passed to each listener.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.emitEvent = function emitEvent(evt, args) {
        var listenersMap = this.getListenersAsObject(evt);
        var listeners;
        var listener;
        var i;
        var key;
        var response;

        for (key in listenersMap) {
            if (listenersMap.hasOwnProperty(key)) {
                listeners = listenersMap[key].slice(0);
                i = listeners.length;

                while (i--) {
                    // If the listener returns true then it shall be removed from the event
                    // The function is executed either with a basic call or an apply if there is an args array
                    listener = listeners[i];

                    if (listener.once === true) {
                        this.removeListener(evt, listener.listener);
                    }

                    response = listener.listener.apply(this, args || []);

                    if (response === this._getOnceReturnValue()) {
                        this.removeListener(evt, listener.listener);
                    }
                }
            }
        }

        return this;
    };

    /**
     * Alias of emitEvent
     */
    proto.trigger = alias('emitEvent');

    /**
     * Subtly different from emitEvent in that it will pass its arguments on to the listeners, as opposed to taking a single array of arguments to pass on.
     * As with emitEvent, you can pass a regex in place of the event name to emit to all events that match it.
     *
     * @param {String|RegExp} evt Name of the event to emit and execute listeners for.
     * @param {...*} Optional additional arguments to be passed to each listener.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.emit = function emit(evt) {
        var args = Array.prototype.slice.call(arguments, 1);
        return this.emitEvent(evt, args);
    };

    /**
     * Sets the current value to check against when executing listeners. If a
     * listeners return value matches the one set here then it will be removed
     * after execution. This value defaults to true.
     *
     * @param {*} value The new value to check for when executing listeners.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.setOnceReturnValue = function setOnceReturnValue(value) {
        this._onceReturnValue = value;
        return this;
    };

    /**
     * Fetches the current value to check against when executing listeners. If
     * the listeners return value matches this one then it should be removed
     * automatically. It will return true by default.
     *
     * @return {*|Boolean} The current value to check for or the default, true.
     * @api private
     */
    proto._getOnceReturnValue = function _getOnceReturnValue() {
        if (this.hasOwnProperty('_onceReturnValue')) {
            return this._onceReturnValue;
        }
        else {
            return true;
        }
    };

    /**
     * Fetches the events object and creates one if required.
     *
     * @return {Object} The events storage object.
     * @api private
     */
    proto._getEvents = function _getEvents() {
        return this._events || (this._events = {});
    };

    /**
     * Reverts the global {@link EventEmitter} to its previous value and returns a reference to this version.
     *
     * @return {Function} Non conflicting EventEmitter class.
     */
    EventEmitter.noConflict = function noConflict() {
        exports.EventEmitter = originalGlobalValue;
        return EventEmitter;
    };

    // Expose the class either via AMD, CommonJS or the global object
    if (typeof define === 'function' && define.amd) {
        define(function () {
            return EventEmitter;
        });
    }
    else if (typeof module === 'object' && module.exports){
        module.exports = EventEmitter;
    }
    else {
        exports.EventEmitter = EventEmitter;
    }
}.call(this));

},{}]},{},[1]);
