!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},r.name);t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return D(e.substr(6));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["1"], [], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("2", [], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  ;
  (function(exports) {
    'use strict';
    function EventEmitter() {}
    var proto = EventEmitter.prototype;
    var originalGlobalValue = exports.EventEmitter;
    function indexOfListener(listeners, listener) {
      var i = listeners.length;
      while (i--) {
        if (listeners[i].listener === listener) {
          return i;
        }
      }
      return -1;
    }
    function alias(name) {
      return function aliasClosure() {
        return this[name].apply(this, arguments);
      };
    }
    proto.getListeners = function getListeners(evt) {
      var events = this._getEvents();
      var response;
      var key;
      if (evt instanceof RegExp) {
        response = {};
        for (key in events) {
          if (events.hasOwnProperty(key) && evt.test(key)) {
            response[key] = events[key];
          }
        }
      } else {
        response = events[evt] || (events[evt] = []);
      }
      return response;
    };
    proto.flattenListeners = function flattenListeners(listeners) {
      var flatListeners = [];
      var i;
      for (i = 0; i < listeners.length; i += 1) {
        flatListeners.push(listeners[i].listener);
      }
      return flatListeners;
    };
    proto.getListenersAsObject = function getListenersAsObject(evt) {
      var listeners = this.getListeners(evt);
      var response;
      if (listeners instanceof Array) {
        response = {};
        response[evt] = listeners;
      }
      return response || listeners;
    };
    function isValidListener(listener) {
      if (typeof listener === 'function' || listener instanceof RegExp) {
        return true;
      } else if (listener && typeof listener === 'object') {
        return isValidListener(listener.listener);
      } else {
        return false;
      }
    }
    proto.addListener = function addListener(evt, listener) {
      if (!isValidListener(listener)) {
        throw new TypeError('listener must be a function');
      }
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
    proto.on = alias('addListener');
    proto.addOnceListener = function addOnceListener(evt, listener) {
      return this.addListener(evt, {
        listener: listener,
        once: true
      });
    };
    proto.once = alias('addOnceListener');
    proto.defineEvent = function defineEvent(evt) {
      this.getListeners(evt);
      return this;
    };
    proto.defineEvents = function defineEvents(evts) {
      for (var i = 0; i < evts.length; i += 1) {
        this.defineEvent(evts[i]);
      }
      return this;
    };
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
    proto.off = alias('removeListener');
    proto.addListeners = function addListeners(evt, listeners) {
      return this.manipulateListeners(false, evt, listeners);
    };
    proto.removeListeners = function removeListeners(evt, listeners) {
      return this.manipulateListeners(true, evt, listeners);
    };
    proto.manipulateListeners = function manipulateListeners(remove, evt, listeners) {
      var i;
      var value;
      var single = remove ? this.removeListener : this.addListener;
      var multiple = remove ? this.removeListeners : this.addListeners;
      if (typeof evt === 'object' && !(evt instanceof RegExp)) {
        for (i in evt) {
          if (evt.hasOwnProperty(i) && (value = evt[i])) {
            if (typeof value === 'function') {
              single.call(this, i, value);
            } else {
              multiple.call(this, i, value);
            }
          }
        }
      } else {
        i = listeners.length;
        while (i--) {
          single.call(this, evt, listeners[i]);
        }
      }
      return this;
    };
    proto.removeEvent = function removeEvent(evt) {
      var type = typeof evt;
      var events = this._getEvents();
      var key;
      if (type === 'string') {
        delete events[evt];
      } else if (evt instanceof RegExp) {
        for (key in events) {
          if (events.hasOwnProperty(key) && evt.test(key)) {
            delete events[key];
          }
        }
      } else {
        delete this._events;
      }
      return this;
    };
    proto.removeAllListeners = alias('removeEvent');
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
          for (i = 0; i < listeners.length; i++) {
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
    proto.trigger = alias('emitEvent');
    proto.emit = function emit(evt) {
      var args = Array.prototype.slice.call(arguments, 1);
      return this.emitEvent(evt, args);
    };
    proto.setOnceReturnValue = function setOnceReturnValue(value) {
      this._onceReturnValue = value;
      return this;
    };
    proto._getOnceReturnValue = function _getOnceReturnValue() {
      if (this.hasOwnProperty('_onceReturnValue')) {
        return this._onceReturnValue;
      } else {
        return true;
      }
    };
    proto._getEvents = function _getEvents() {
      return this._events || (this._events = {});
    };
    EventEmitter.noConflict = function noConflict() {
      exports.EventEmitter = originalGlobalValue;
      return EventEmitter;
    };
    if (typeof define === 'function' && define.amd) {
      define(function() {
        return EventEmitter;
      });
    } else if (typeof module === 'object' && module.exports) {
      module.exports = EventEmitter;
    } else {
      exports.EventEmitter = EventEmitter;
    }
  }(this || {}));
  return module.exports;
});

$__System.register("1", ["2"], function (_export, _context) {
  "use strict";

  var WolfyEventEmitter, _classCallCheck, _createClass, _possibleConstructorReturn, _get, _inherits, EventEmitter, JsLights, jsl;

  return {
    setters: [function (_) {
      WolfyEventEmitter = _.default;
    }],
    execute: function () {
      _classCallCheck = function (instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      };

      _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }

        return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);
          if (staticProps) defineProperties(Constructor, staticProps);
          return Constructor;
        };
      }();

      _possibleConstructorReturn = function (self, call) {
        if (!self) {
          throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return call && (typeof call === "object" || typeof call === "function") ? call : self;
      };

      _get = function get(object, property, receiver) {
        if (object === null) object = Function.prototype;
        var desc = Object.getOwnPropertyDescriptor(object, property);

        if (desc === undefined) {
          var parent = Object.getPrototypeOf(object);

          if (parent === null) {
            return undefined;
          } else {
            return get(parent, property, receiver);
          }
        } else if ("value" in desc) {
          return desc.value;
        } else {
          var getter = desc.get;

          if (getter === undefined) {
            return undefined;
          }

          return getter.call(receiver);
        }
      };

      _inherits = function (subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
          throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        }

        subClass.prototype = Object.create(superClass && superClass.prototype, {
          constructor: {
            value: subClass,
            enumerable: false,
            writable: true,
            configurable: true
          }
        });
        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
      };

      EventEmitter = function (_WolfyEventEmitter) {
        _inherits(EventEmitter, _WolfyEventEmitter);

        function EventEmitter() {
          _classCallCheck(this, EventEmitter);

          var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(EventEmitter).call(this));

          _this._hooks = {};
          return _this;
        }

        /**
         * @memberof jsLights
         * @method addHook
         * @desc Registering hook by name
         *
         * @param {String} name Hook name
         * @param {Function} cb callback function
         * @param {Object} options aditional options
         * @param {Object} options.priority hooks with greater priority will be called first (default is 0)
         * @example
         * My.singleton.addHook('onFetchingResults', this.myFunction, { priority: 10 });
         */

        _createClass(EventEmitter, [{
          key: 'addHook',
          value: function addHook(name, cb, options) {
            if (!this._hooks[name]) {
              this._hooks[name] = [];
            }

            var priority = options && options.priority ? options.priority : 0;

            this._hooks[name].push({
              cb: cb,
              priority: priority
            });

            this._hooks[name] = this._hooks[name].sort(function (a, b) {
              return b.priority - a.priority;
            });
          }

          /**
           * @memberof jsLights
           * @method callHooks
           * @desc Calling hooks for given name ordered by priority
           * If hook is not returning false, execution stops
           *
           * @param {String} name calling hooks registerd with given name
           * @param {*} ref argument passed in hook
           * @return {*} return value from hook
           * @example
           * this.callHooks('onFetchingResults', {myParameter: 5});
           */

        }, {
          key: 'callHooks',
          value: function callHooks(name, ref) {
            if (this._hooks[name]) {
              for (var i = 0; i < this._hooks[name].length; i++) {
                var hook = this._hooks[name][i];
                var returnHookVal = hook.cb(ref);
                if (returnHookVal) {
                  return returnHookVal;
                }
              }
            }
          }

          /**
           * @memberof jsLights
           * @method on
           * @desc Adds a listener function to the specified event
           *
           * @param {String} evt - name of the event to attach the listener to
           * @param {Function} listener - Method to be called when the event is emitted
           * @return {Object} object with callback reference which can be used for unbinding
           * @example
           * My.singleton.on('notification', function(data) {
           *  // callback when notification event is triggered
           * });
           */

        }, {
          key: 'on',
          value: function on(evt, listener) {
            _get(Object.getPrototypeOf(EventEmitter.prototype), 'on', this).call(this, evt, listener);
            return {
              evt: evt,
              listener: listener
            };
          }

          /**
           * @memberof jsLights
           * @method trigger
           * @desc Emits an event of your choice
           * when emitted, every listener attached to that event will be executed.
           *
           * @param {String} evt name of the event to emit and execute listeners
           * @param {*} args optional argument to be passed to each listener
           * @return {Object} current instance of EventEmitter for chaining
           * @example
           * this.trigger('notification', { title: "Hello, its me." });
           */

        }, {
          key: 'trigger',
          value: function trigger(evt, args) {
            var arr = [];
            arr.push(args);
            args = arr;

            var toReturn = _get(Object.getPrototypeOf(EventEmitter.prototype), 'trigger', this).call(this, evt, args);
            this._registerTrigger(evt);
            return toReturn;
          }

          /**
           * @memberof jsLights
           * @method unbind
           * @desc Removes a listener function based on eventObject returned from method .on()
           *
           * @param {Object} eventObj
           * @example
           * this._onNotifyReference = this.on("notification", function() {});
           * this.unbind(this._onNotifyReference);
           */

        }, {
          key: 'unbind',
          value: function unbind(eventObj) {
            if (!eventObj) {
              return;
            }
            _get(Object.getPrototypeOf(EventEmitter.prototype), 'off', this).call(this, eventObj.evt, eventObj.listener);
          }

          /*
           * Registers trigger event
           * @param {String} evt - name of the event
           */

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

        return EventEmitter;
      }(WolfyEventEmitter);

      JsLights = function (_EventEmitter) {
        _inherits(JsLights, _EventEmitter);

        function JsLights() {
          _classCallCheck(this, JsLights);

          var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(JsLights).call(this));

          _this2.triggered = ['EventEmitter', 'Base'];
          _this2._beforeDependency = {};
          _this2._extendedClasses = {};
          _this2._alias = {};
          _this2._registered = new Set();

          if (document) {
            if (document.body) {
              _this2.triggered.push('onDocumentReady');
            } else {
              document.addEventListener('DOMContentLoaded', function () {
                _this2._registerEvent('onDocumentReady');
              });
            }
          }
          return _this2;
        }

        /**
         * @memberof jsLights
         * @method assign
         * @desc Assigning reference in passed path
         *
         * @param {String} path (for example app.my.function)
         * @param {*} reference to be assigned (usually a function or class)
         * @param {String/Array} dependency (optional) if given, reference will be assigned after passed dependencies
         * @return {register_instance}
         * @example
         * var hello = function() {
         *   console.log("hello") 
         * }
         * jsLights.assign('My.Namespce.HelloFunction', hello);
         * 
         * // jsLights.assign is shorthand for:
         * jsLights.register(path, reference).after(dependencies).assign()
         */

        _createClass(JsLights, [{
          key: 'assign',
          value: function assign(path, reference, dependency) {
            var register = this.register(path, reference);
            register.after(dependency);
            register.assign();
            return register;
          }

          /**
           * @memberof jsLights
           * @method after
           * @desc Execute after passed dependencies
           * If all dependencies are already triggered, callback is executed immediately
           * otherwise, callback is executed when all dependencies have been triggered
           *
           * @param {String/Array} dependencies
           * @param {Function} callback
           * @example
           * jsLights.after(['My.Namespace1', 'My.Namespace2'], function() {
           *   // My.Namespace1 and My.Namespace2 have been created
           * });
           */

        }, {
          key: 'after',
          value: function after(_after, cb) {
            var _this3 = this;

            if (typeof cb != 'function') {
              throw new Error('invalid callback function');
            }

            if (!Array.isArray(_after)) {
              _after = [_after];
            }

            var passed = 0;
            _after.forEach(function (dependency) {
              if (_this3.triggered.indexOf(dependency) != -1) passed++;
            });

            if (passed == _after.length) {
              cb();
              delete cb.jsLights;
              return;
            }

            if (!cb.jsLights) cb.jsLights = {};

            if (!cb.jsLights._listeningFor) cb.jsLights._listeningFor = new Set();

            _after.forEach(function (dependency) {
              if (!cb.jsLights._startedDepCheck && dependency.indexOf('->') != -1) {
                var eventsArr = dependency.split('->');
                var baseClass = eventsArr[0];
                var onBaseClass = eventsArr[1];

                jsLights.after(baseClass, function () {
                  var baseClassObj = jsLights.getByPath(baseClass);
                  if (!baseClassObj) {
                    throw new Error(baseClass + ' not found');
                  } else if (!baseClassObj.on) {
                    throw new Error(baseClass + ' has no .on function');
                  } else {
                    if (baseClassObj.jsLights && baseClassObj.jsLights.triggered && baseClassObj.jsLights.triggered[onBaseClass]) {
                      jsLights._registerEvent(dependency);
                    } else {
                      baseClassObj.once(onBaseClass, function () {
                        jsLights._registerEvent(dependency);
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

                  jsLights.once(dependency, function () {
                    jsLights.after(_after, cb);

                    if (cb.jsLights && cb.jsLights._listeningFor) cb.jsLights._listeningFor.delete(dependency);
                  });
                }
              }
            });
            cb.jsLights._startedDepCheck = true;
          }

          /**
           * @memberof jsLights
           * @method createInstances
           * @desc Creating singleton instances using config structure
           *
           * @param {Object} config
           * @example 
           * jsLights.createInstances({ 
           *   'app.mySingleton': 'app.MyClass',
           *   'app.somethingElse': 'app.AnotherClass'
           * });
           */

        }, {
          key: 'createInstances',
          value: function createInstances(config) {
            var _this4 = this;

            // making sure that dependencies are checked on the "next tick"
            // since there could be class extending the one which current one is dependent upon
            setTimeout(function () {

              for (var path in config) {
                var classPath = config[path];
                var extended = jsLights._extendedClasses[classPath];
                if (extended) {
                  classPath = extended[extended.length - 1];
                }

                _this4.after(classPath, function (registerPath, classPath) {
                  this.register(registerPath, this.getByPath(classPath)).instantiate();
                }.bind(_this4, path, classPath));
              }
            }, 1); // 1ms timeout is becaouse 0ms timeout is used for default ending method chain on register()
          }

          /**
           * @memberof jsLights
           * @method register
           * @desc Registering reference at given path
           * returned instance
           * @param {String} path (for example app.my.function)
           * @param {*} reference to be assigned (usually a function or class)
           * @return {register_instance}
           * @example
           * jsLights.register('My.Namespace.Child').extends('My.Namespace.Parent', Parent => class extends Parent {
           *   // child extends parent
           * }).after("My.Namespace1").execute();
           *
           * // without arrow function
           * jsLights.register('My.Namespace.Child').extends('My.Namespace.Parent', function(Parent) {
           *   return class extends Parent {
           *      // child extends parent
           *   }
           * }).after("My.Namespace1").execute();
           */

        }, {
          key: 'register',
          value: function register(path, reference) {
            var jsLights = this;

            if (typeof path != "string") {
              reference = path;
              path = false;
            }

            /**
             * 
             * @class register_instance
             * todo: explain setTimeout execute()
             */
            return new (function () {
              function _class() {
                var _this5 = this;

                _classCallCheck(this, _class);

                this._after = [];
                this.path = jsLights._getOriginPath(path);
                this.reference = reference;
                this._listeningFor = new Set();

                jsLights._registered.add(this);

                this._defaultChainEnd = setTimeout(function () {
                  _this5.execute();
                }, 0);
              }

              /**
               * @memberof register_instance
               * @method after
               * @desc registration will be executed after passed dependencies have been triggered
               * @param {String/Array} path (for example app.my.function)
               * @return {register_instance}
               * @example
               * jsLights.register('My.Namespace.Child').extends('My.Namespace.Parent', function(Parent) {
               *   return class extends Parent {
               *      // child extends parent
               *      // after triggered dependencies My.Namespace1 and My.Namespace1
               *   }
               * }).after(["My.Namespace1", "My.Namespace2"]).execute();
               */

              _createClass(_class, [{
                key: 'after',
                value: function after(path) {
                  var _this6 = this;

                  if (typeof path == 'string') {
                    if (this._after.indexOf(path) == -1) this._after.push(path);
                  } else if (Array.isArray(path)) {
                    path.forEach(function (p) {
                      if (_this6._after.indexOf(p) == -1) _this6._after.push(p);
                    });
                  }

                  return this;
                }

                /**
                 * @memberof register_instance
                 * @method assign
                 * @desc 
                 * Assigning reference (end of chain)
                 * @example
                 * jsLights.register('My.Namespace1', myFunction).after('My.Namespace2').assign()
                 */

              }, {
                key: 'assign',
                value: function assign() {
                  var _this7 = this;

                  this.onPassedDependencies = function () {
                    _this7._assign(_this7.reference);
                  };
                  this._checkDependencies();
                }

                /**
                 * @memberof register_instance
                 * @method before
                 * @desc registration will be executed before passed dependencies have been triggered
                 * @param {String/Array} path (for example app.my.function)
                 * @return {register_instance}
                 * @example
                 * jsLights.register('My.Namespace.Child').extends('My.Namespace.Parent', function(Parent) {
                 *   return class extends Parent {
                 *      // child extends parent
                 *      // after triggered dependencies My.Namespace1 and My.Namespace1
                 *   }
                 * }).after("My.Namespace1").before("My.Namespace2").execute();
                 */

              }, {
                key: 'before',
                value: function before(path) {
                  if (!this.path) throw Error('can not set before() without namespacing function');

                  var paths = [];
                  if (typeof path == 'string') paths.push(path);else if (Array.isArray(path)) paths = paths.concat(path);

                  for (var i = 0; i < paths.length; i++) {
                    var path = paths[i];
                    if (jsLights.triggered.indexOf(path) != -1) throw new Error(path + ' is already trigger');

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

                /**
                 * @memberof register_instance
                 * @method dependency
                 * @alias after
                 * @desc (alias of after) 
                 * registration will be executed after passed dependencies have been triggered
                 * @param {String/Array} path (for example app.my.function)
                 * @return {register_instance}
                 * @example
                 * jsLights.register('My.Namespace.Child').extends('My.Namespace.Parent', function(Parent) {
                 *   return class extends Parent {
                 *      // child extends parent
                 *      // after triggered dependencies My.Namespace1 and My.Namespace1
                 *   }
                 * }).after(["My.Namespace1", "My.Namespace2"]).execute();
                 */

              }, {
                key: 'dependency',
                value: function dependency(path) {
                  return this.after(path);
                }

                /**
                 * @memberof register_instance
                 * @method instantiate
                 * @desc 
                 * On passed dependencies, reference will be assigned (end of chain)
                 * @example
                 * jsLights.register('My.Namespace', SampleFunction).after(dependencies).execute()
                 */

              }, {
                key: 'execute',
                value: function execute() {
                  var _this8 = this;

                  if (!this.onPassedDependencies) {
                    this.onPassedDependencies = function () {
                      var reference = _this8.reference(_this8._getDeps());
                      if (_this8.path) {
                        _this8._assign(reference);
                      }
                    };
                  }

                  this._checkDependencies();
                }

                /**
                 * @memberof register_instance
                 * @method executeAs
                 * @desc 
                 * On passed dependencies, reference will be assigned with passed id (end of chain)
                 * @param {String} id
                 * @example
                 * jsLights.register('My.Namespace', SampleClass).after(dependencies).executeAs('My:Class')
                 */

              }, {
                key: 'executeAs',
                value: function executeAs(id) {
                  this.id(id);
                  this.execute();
                }

                /**
                 * @memberof register_instance
                 * @method extends
                 * @desc 
                 * Extending class using namespace path
                 * @param {String} id
                 * @param {Function} callback that should return new class
                 * @return {register_instance}
                 * @example
                 * jsLights.register('My.Namespace.Child').extends('My.Namespace.Parent', function(Parent) {
                 *   return class extends Parent {
                 *      // child extends parent
                 *   }
                 * }).execute();
                 */

              }, {
                key: 'extends',
                value: function _extends(path, reference) {
                  var _this9 = this;

                  path = jsLights._getOriginPath(path);

                  if (!this.reference && reference) {
                    // if there is no registered reference, assign it inside extends()
                    this.reference = reference;
                  }
                  if (!this.path && path) {
                    // if there is no registered path, assign it inside extends()
                    this.path = path;
                    if (this._id) jsLights._alias[this._id] = this.path;
                  }

                  this._classCreator = this.reference;
                  // add path as dependency for this class
                  this.after(path);

                  this.onPassedDependencies = function () {

                    var superReference = jsLights.getByPath(path);
                    var superjsLightsInstance = superReference._jsLightsInstance;
                    _this9.parent = superjsLightsInstance;
                    _this9.reference = _this9._classCreator(superReference);
                    _this9.reference._jsLightsInstance = _this9;

                    if (superjsLightsInstance) {
                      superjsLightsInstance._addChild(_this9);
                    }

                    if (_this9.path == path) {
                      superjsLightsInstance._recompileChildren(_this9);
                    }

                    _this9.assign();
                  };

                  return this;
                }

                /**
                 * @memberof register_instance
                 * @method id
                 * @desc 
                 * Assigning id on registered reference
                 * @param {String} id
                 * @return {register_instance}
                 * @example
                 * jsLights.register('My.Namespace', SampleClass).after(dependencies).id('My:Class').execute()
                 */

              }, {
                key: 'id',
                value: function id(_id) {
                  this._id = _id;
                  this.path = jsLights._getOriginPath(this.path);
                  jsLights._alias[_id] = this.path;

                  if (this._assigned) {
                    jsLights._registerEvent(_id);
                  }

                  return this;
                }

                /**
                 * @memberof register_instance
                 * @method instantiate
                 * @desc 
                 * On passed dependencies, instance of registered function will be created (end of chain)
                 * @param {*} params params passed in registered function
                 * @example
                 * jsLights.register('My.Namespace', SampleClass).after(dependencies).instantiate()
                 */

              }, {
                key: 'instantiate',
                value: function instantiate(params) {
                  var _this10 = this;

                  this.onPassedDependencies = function () {
                    var reference = new _this10.reference(params);
                    if (_this10.path) _this10._assign(reference);
                  };

                  this._checkDependencies();
                }
              }, {
                key: '_getDeps',
                value: function _getDeps() {
                  var deps = {};
                  this._after.forEach(function (dependency) {
                    deps[dependency] = jsLights.getRegisteredByPath(dependency);
                  });

                  return deps;
                }
              }, {
                key: '_assign',
                value: function _assign(reference) {
                  if (!this.path) throw new Error('can not assign without namespace');

                  if (!reference === undefined) throw new Error('can not assign "undefined" for ' + this.path);

                  if (reference) {
                    reference.jsLights = {
                      path: this.path
                    };
                  }

                  var components = this.path.split('.');
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
                        pointer[component] = reference;
                      }

                      pointer = pointer[component];
                    }
                  } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                  } finally {
                    try {
                      if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                      }
                    } finally {
                      if (_didIteratorError) {
                        throw _iteratorError;
                      }
                    }
                  }

                  jsLights._registerEvent(this.path);

                  if (this._id) {
                    jsLights._registerEvent(this._id);
                  }
                  this._assigned = true;
                }
              }, {
                key: '_checkDependencies',
                value: function _checkDependencies() {
                  var _this11 = this;

                  clearTimeout(this._defaultChainEnd);

                  if (!this._extendedChecked && this.path) {
                    this._extendedChecked = true;

                    var _iteratorNormalCompletion2 = true;
                    var _didIteratorError2 = false;
                    var _iteratorError2 = undefined;

                    try {
                      for (var _iterator2 = jsLights._registered[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                        var item = _step2.value;

                        if (item.path == this.path && item != this) {
                          if (!jsLights._extendedClasses[this.path]) {
                            jsLights._extendedClasses[this.path] = [];
                          }

                          if (!this._id) {
                            this.id(this.path + '-' + jsLights._extendedClasses[this.path].length);
                          }

                          jsLights._extendedClasses[this.path].push(this._id);
                        }
                      }
                    } catch (err) {
                      _didIteratorError2 = true;
                      _iteratorError2 = err;
                    } finally {
                      try {
                        if (!_iteratorNormalCompletion2 && _iterator2.return) {
                          _iterator2.return();
                        }
                      } finally {
                        if (_didIteratorError2) {
                          throw _iteratorError2;
                        }
                      }
                    }
                  }

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
                        _this11._checkDependencies();
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
                    if (!_this11._startedDepCheck && dependency.indexOf('->') != -1) {
                      var eventsArr = dependency.split('->');
                      var baseClass = eventsArr[0];
                      var onBaseClass = eventsArr[1];

                      jsLights.after(baseClass, function () {
                        var baseClassObj = jsLights.getByPath(baseClass);
                        if (!baseClassObj) {
                          throw new Error(baseClass + ' not found');
                        } else if (!baseClassObj.on) {
                          throw new Error(baseClass + ' has no .on function');
                        } else {
                          if (baseClassObj.jsLights && baseClassObj.jsLights.triggered && baseClassObj.jsLights.triggered[onBaseClass]) {
                            jsLights._registerEvent(dependency);
                          } else {
                            baseClassObj.once(onBaseClass, function () {
                              jsLights._registerEvent(dependency);
                            });
                          }
                        }
                      });
                    }

                    if (jsLights.triggered.indexOf(dependency) == -1) {
                      // dependency is not yet triggered
                      // when registered, start again
                      if (!_this11._listeningFor.has(dependency)) {
                        _this11._listeningFor.add(dependency);

                        jsLights.once(dependency, function () {
                          _this11._checkDependencies();
                          _this11._listeningFor.delete(dependency);
                        });
                      }
                    }
                  });
                  this._startedDepCheck = true;
                }
              }, {
                key: '_recompileChildren',
                value: function _recompileChildren(parent) {
                  if (!this.children) return;

                  this.children.forEach(function (child) {
                    if (child != parent) {
                      child.reference = child._classCreator(parent.reference);
                      child.assign();

                      child._recompileChildren(child);
                    }
                  });
                }
              }, {
                key: '_addChild',
                value: function _addChild(child) {
                  if (!this.children) this.children = [];

                  this.children.push(child);
                }
              }]);

              return _class;
            }())();
          }

          /**
           * @memberof jsLights
           * @method extend
           * @desc Extending class assigned in path with passed reference
           * Shorthand for jsLights.register(path, reference).extends(path)
           * @param {String} path (for example app.my.function)
           * @param {Function} reference to be assigned (must be a function returning class)
           * @return {register_instance}
           */

        }, {
          key: 'extend',
          value: function extend(path, reference) {
            var register = this.register(path, reference);
            register.extends(path);
            return register;
          }

          /**
           * @memberof jsLights
           * @method inspect
           * @desc Checking status for passed path
           * is it triggered or pending, showing status for all dependencies 
           * @param {String} path (for example app.my.function)
           * @example
           * jsLights.inspect('My.Namespace1')
           */

        }, {
          key: 'inspect',
          value: function inspect(path) {
            var _this12 = this;

            if (!path) {
              throw new Error('Invalid path');
            }

            var found = false;
            var _iteratorNormalCompletion3 = true;
            var _didIteratorError3 = false;
            var _iteratorError3 = undefined;

            try {
              for (var _iterator3 = this._registered[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                var item = _step3.value;

                if (item.path == path) {
                  found = true;
                  if (item.onPassedDependencies == false) {
                    console.log('Status: %cTriggered', 'color: green;');
                  } else {
                    console.log('Status: %cPending', 'color: red;');
                  }

                  if (item._after.length) {
                    console.log('Dependencies:');
                    item._after.forEach(function (dep) {
                      if (_this12.triggered.indexOf(dep) == -1) {
                        console.log(dep + ' %c (pending)', 'color: red');
                      } else {
                        console.log(dep + ' %c (triggered)', 'color: green');
                      }
                    });
                  }
                }
              }
            } catch (err) {
              _didIteratorError3 = true;
              _iteratorError3 = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion3 && _iterator3.return) {
                  _iterator3.return();
                }
              } finally {
                if (_didIteratorError3) {
                  throw _iteratorError3;
                }
              }
            }

            if (!found) {
              console.log(path + ' is not registered');
            }
          }

          /**
           * @memberof jsLights
           * @method instantiate
           * @desc 
           * Creating instance from passed reference and assigning it in path
           * Shorthand for jsLights.register(path, reference).after(dependencies).instantiate()
           * @param {String} path (for example app.my.function)
           * @param {Function} reference from which instance is created
           * @return {register_instance}
           */

        }, {
          key: 'instantiate',
          value: function instantiate(path, reference, dependency) {
            var register = this.register(path, reference);
            register.after(dependency);
            register.instantiate();
            return register;
          }

          // deprecated

        }, {
          key: 'onPathInstantiated',
          value: function onPathInstantiated(path, cb) {
            console.warn("jsLights.onPathInstantiated is deprecated. Please use after()");
            console.trace();
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
          key: '_registerEvent',
          value: function _registerEvent(event) {

            if (this.triggered.indexOf(event) == -1) {
              this.triggered.push(event);
            }
            this.trigger(event);
          }
        }, {
          key: '_getOriginPath',
          value: function _getOriginPath(path) {
            while (this._alias[path]) {
              path = this._alias[path];
            }
            return path;
          }
        }, {
          key: 'getRegisteredByPath',
          value: function getRegisteredByPath(path) {
            var _iteratorNormalCompletion4 = true;
            var _didIteratorError4 = false;
            var _iteratorError4 = undefined;

            try {
              for (var _iterator4 = this._registered[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                var item = _step4.value;

                if (item.path == path) {
                  return item.reference;
                }
              }
            } catch (err) {
              _didIteratorError4 = true;
              _iteratorError4 = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion4 && _iterator4.return) {
                  _iterator4.return();
                }
              } finally {
                if (_didIteratorError4) {
                  throw _iteratorError4;
                }
              }
            }
          }
        }, {
          key: 'getByPath',
          value: function getByPath(path) {

            path = this._alias[path] || path;

            if (path == 'EventEmitter' || path == 'Base') {
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

        return JsLights;
      }(EventEmitter);

      jsl = new JsLights();

      jsl.eventEmitter = jsl.base = EventEmitter;

      window.jsLights = jsl;
    }
  };
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define([], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory();
  else
    factory();
});
//# sourceMappingURL=jslights.js.map