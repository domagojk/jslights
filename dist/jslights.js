!function(a){function b(a,b,e){return 4===arguments.length?c.apply(this,arguments):void d(a,{declarative:!0,deps:b,declare:e})}function c(a,b,c,e){d(a,{declarative:!1,deps:b,executingRequire:c,execute:e})}function d(a,b){b.name=a,a in o||(o[a]=b),b.normalizedDeps=b.deps}function e(a,b){if(b[a.groupIndex]=b[a.groupIndex]||[],-1==p.call(b[a.groupIndex],a)){b[a.groupIndex].push(a);for(var c=0,d=a.normalizedDeps.length;d>c;c++){var f=a.normalizedDeps[c],g=o[f];if(g&&!g.evaluated){var h=a.groupIndex+(g.declarative!=a.declarative);if(void 0===g.groupIndex||g.groupIndex<h){if(void 0!==g.groupIndex&&(b[g.groupIndex].splice(p.call(b[g.groupIndex],g),1),0==b[g.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");g.groupIndex=h}e(g,b)}}}}function f(a){var b=o[a];b.groupIndex=0;var c=[];e(b,c);for(var d=!!b.declarative==c.length%2,f=c.length-1;f>=0;f--){for(var g=c[f],i=0;i<g.length;i++){var k=g[i];d?h(k):j(k)}d=!d}}function g(a){return s[a]||(s[a]={name:a,dependencies:[],exports:{},importers:[]})}function h(b){if(!b.module){var c=b.module=g(b.name),d=b.module.exports,e=b.declare.call(a,function(a,b){if(c.locked=!0,"object"==typeof a)for(var e in a)d[e]=a[e];else d[a]=b;for(var f=0,g=c.importers.length;g>f;f++){var h=c.importers[f];if(!h.locked)for(var i=0;i<h.dependencies.length;++i)h.dependencies[i]===c&&h.setters[i](d)}return c.locked=!1,b},b.name);c.setters=e.setters,c.execute=e.execute;for(var f=0,i=b.normalizedDeps.length;i>f;f++){var j,k=b.normalizedDeps[f],l=o[k],m=s[k];m?j=m.exports:l&&!l.declarative?j=l.esModule:l?(h(l),m=l.module,j=m.exports):j=n(k),m&&m.importers?(m.importers.push(c),c.dependencies.push(m)):c.dependencies.push(null),c.setters[f]&&c.setters[f](j)}}}function i(a){var b,c=o[a];if(c)c.declarative?m(a,[]):c.evaluated||j(c),b=c.module.exports;else if(b=n(a),!b)throw new Error("Unable to load dependency "+a+".");return(!c||c.declarative)&&b&&b.__useDefault?b.default:b}function j(b){if(!b.module){var c={},d=b.module={exports:c,id:b.name};if(!b.executingRequire)for(var e=0,f=b.normalizedDeps.length;f>e;e++){var g=b.normalizedDeps[e],h=o[g];h&&j(h)}b.evaluated=!0;var l=b.execute.call(a,function(a){for(var c=0,d=b.deps.length;d>c;c++)if(b.deps[c]==a)return i(b.normalizedDeps[c]);throw new TypeError("Module "+a+" not declared as a dependency.")},c,d);l&&(d.exports=l),c=d.exports,c&&c.__esModule?b.esModule=c:b.esModule=k(c)}}function k(b){var c={};if(("object"==typeof b||"function"==typeof b)&&b!==a)if(q)for(var d in b)"default"!==d&&l(c,b,d);else{var e=b&&b.hasOwnProperty;for(var d in b)"default"===d||e&&!b.hasOwnProperty(d)||(c[d]=b[d])}return c.default=b,r(c,"__useDefault",{value:!0}),c}function l(a,b,c){try{var d;(d=Object.getOwnPropertyDescriptor(b,c))&&r(a,c,d)}catch(d){return a[c]=b[c],!1}}function m(b,c){var d=o[b];if(d&&!d.evaluated&&d.declarative){c.push(b);for(var e=0,f=d.normalizedDeps.length;f>e;e++){var g=d.normalizedDeps[e];-1==p.call(c,g)&&(o[g]?m(g,c):n(g))}d.evaluated||(d.evaluated=!0,d.module.execute.call(a))}}function n(a){if(u[a])return u[a];if("@node/"==a.substr(0,6))return t(a.substr(6));var b=o[a];if(!b)throw"Module "+a+" not present.";return f(a),m(a,[]),o[a]=void 0,b.declarative&&r(b.module.exports,"__esModule",{value:!0}),u[a]=b.declarative?b.module.exports:b.esModule}var o={},p=Array.prototype.indexOf||function(a){for(var b=0,c=this.length;c>b;b++)if(this[b]===a)return b;return-1},q=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(a){q=!1}var r;!function(){try{Object.defineProperty({},"a",{})&&(r=Object.defineProperty)}catch(a){r=function(a,b,c){try{a[b]=c.value||c.get.call(a)}catch(a){}}}}();var s={},t="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,u={"@empty":{}};return function(a,d,e,f){return function(g){g(function(g){for(var h={_nodeRequire:t,register:b,registerDynamic:c,get:n,set:function(a,b){u[a]=b},newModule:function(a){return a}},i=0;i<d.length;i++)(function(a,b){b&&b.__esModule?u[a]=b:u[a]=k(b)})(d[i],arguments[i]);f(h);var j=n(a[0]);if(a.length>1)for(var i=1;i<a.length;i++)n(a[i]);return e?j.default:j})}}}("undefined"!=typeof self?self:global)(["1"],[],!1,function(a){this.require,this.exports,this.module;a.registerDynamic("2",[],!0,function(a,b,c){var d;return function(a){"use strict";function b(){}function e(a,b){for(var c=a.length;c--;)if(a[c].listener===b)return c;return-1}function f(a){return function(){return this[a].apply(this,arguments)}}function g(a){return"function"==typeof a||a instanceof RegExp||!(!a||"object"!=typeof a)&&g(a.listener)}var h=b.prototype,i=a.EventEmitter;h.getListeners=function(a){var b,c,d=this._getEvents();if(a instanceof RegExp){b={};for(c in d)d.hasOwnProperty(c)&&a.test(c)&&(b[c]=d[c])}else b=d[a]||(d[a]=[]);return b},h.flattenListeners=function(a){var b,c=[];for(b=0;b<a.length;b+=1)c.push(a[b].listener);return c},h.getListenersAsObject=function(a){var b,c=this.getListeners(a);return c instanceof Array&&(b={},b[a]=c),b||c},h.addListener=function(a,b){if(!g(b))throw new TypeError("listener must be a function");var c,d=this.getListenersAsObject(a),f="object"==typeof b;for(c in d)d.hasOwnProperty(c)&&e(d[c],b)===-1&&d[c].push(f?b:{listener:b,once:!1});return this},h.on=f("addListener"),h.addOnceListener=function(a,b){return this.addListener(a,{listener:b,once:!0})},h.once=f("addOnceListener"),h.defineEvent=function(a){return this.getListeners(a),this},h.defineEvents=function(a){for(var b=0;b<a.length;b+=1)this.defineEvent(a[b]);return this},h.removeListener=function(a,b){var c,d,f=this.getListenersAsObject(a);for(d in f)f.hasOwnProperty(d)&&(c=e(f[d],b),c!==-1&&f[d].splice(c,1));return this},h.off=f("removeListener"),h.addListeners=function(a,b){return this.manipulateListeners(!1,a,b)},h.removeListeners=function(a,b){return this.manipulateListeners(!0,a,b)},h.manipulateListeners=function(a,b,c){var d,e,f=a?this.removeListener:this.addListener,g=a?this.removeListeners:this.addListeners;if("object"!=typeof b||b instanceof RegExp)for(d=c.length;d--;)f.call(this,b,c[d]);else for(d in b)b.hasOwnProperty(d)&&(e=b[d])&&("function"==typeof e?f.call(this,d,e):g.call(this,d,e));return this},h.removeEvent=function(a){var b,c=typeof a,d=this._getEvents();if("string"===c)delete d[a];else if(a instanceof RegExp)for(b in d)d.hasOwnProperty(b)&&a.test(b)&&delete d[b];else delete this._events;return this},h.removeAllListeners=f("removeEvent"),h.emitEvent=function(a,b){var c,d,e,f,g,h=this.getListenersAsObject(a);for(f in h)if(h.hasOwnProperty(f))for(c=h[f].slice(0),e=0;e<c.length;e++)d=c[e],d.once===!0&&this.removeListener(a,d.listener),g=d.listener.apply(this,b||[]),g===this._getOnceReturnValue()&&this.removeListener(a,d.listener);return this},h.trigger=f("emitEvent"),h.emit=function(a){var b=Array.prototype.slice.call(arguments,1);return this.emitEvent(a,b)},h.setOnceReturnValue=function(a){return this._onceReturnValue=a,this},h._getOnceReturnValue=function(){return!this.hasOwnProperty("_onceReturnValue")||this._onceReturnValue},h._getEvents=function(){return this._events||(this._events={})},b.noConflict=function(){return a.EventEmitter=i,b},"function"==typeof d&&d.amd?d(function(){return b}):"object"==typeof c&&c.exports?c.exports=b:a.EventEmitter=b}(this||{}),c.exports}),a.register("1",["2"],function(a,b){"use strict";var c,d,e,f,g,h,i,j,k;return{setters:[function(a){c=a.default}],execute:function(){d=function(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")},e=function(){function a(a,b){for(var c=0;c<b.length;c++){var d=b[c];d.enumerable=d.enumerable||!1,d.configurable=!0,"value"in d&&(d.writable=!0),Object.defineProperty(a,d.key,d)}}return function(b,c,d){return c&&a(b.prototype,c),d&&a(b,d),b}}(),f=function(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b},g=function a(b,c,d){null===b&&(b=Function.prototype);var e=Object.getOwnPropertyDescriptor(b,c);if(void 0===e){var f=Object.getPrototypeOf(b);return null===f?void 0:a(f,c,d)}if("value"in e)return e.value;var g=e.get;if(void 0!==g)return g.call(d)},h=function(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)},i=function(a){function b(){d(this,b);var a=f(this,Object.getPrototypeOf(b).call(this));return a._hooks={},a}return h(b,a),e(b,[{key:"addHook",value:function(a,b,c){this._hooks[a]||(this._hooks[a]=[]);var d=c&&c.priority?c.priority:0;this._hooks[a].push({cb:b,priority:d}),this._hooks[a]=this._hooks[a].sort(function(a,b){return b.priority-a.priority})}},{key:"callHooks",value:function(a,b){if(this._hooks[a])for(var c=0;c<this._hooks[a].length;c++){var d=this._hooks[a][c],e=d.cb(b);if(e)return e}}},{key:"on",value:function(a,c){return g(Object.getPrototypeOf(b.prototype),"on",this).call(this,a,c),{evt:a,listener:c}}},{key:"trigger",value:function(a,c){var d=[];d.push(c),c=d;var e=g(Object.getPrototypeOf(b.prototype),"trigger",this).call(this,a,c);return this._registerTrigger(a),e}},{key:"unbind",value:function(a){a&&g(Object.getPrototypeOf(b.prototype),"off",this).call(this,a.evt,a.listener)}},{key:"_registerTrigger",value:function(a){this.jsLights||(this.jsLights={}),this.jsLights.triggered||(this.jsLights.triggered={}),void 0!==this.jsLights.triggered[a]?this.jsLights.triggered[a]++:this.jsLights.triggered[a]=1}}]),b}(c),j=function(a){function b(){d(this,b);var a=f(this,Object.getPrototypeOf(b).call(this));return a.triggered=["EventEmitter","Base"],a._beforeDependency={},a._extendedClasses={},a._alias={},a._registered=new Set,document&&(document.body?a.triggered.push("onDocumentReady"):document.addEventListener("DOMContentLoaded",function(){a._registerEvent("onDocumentReady")})),a}return h(b,a),e(b,[{key:"assign",value:function(a,b,c){var d=this.register(a,b);return d.after(c),d.assign(),d}},{key:"after",value:function(a,b){var c=this;if("function"!=typeof b)throw new Error("invalid callback function");Array.isArray(a)||(a=[a]);var d=0;return a.forEach(function(a){c.triggered.indexOf(a)!=-1&&d++}),d==a.length?(b(),void delete b.jsLights):(b.jsLights||(b.jsLights={}),b.jsLights._listeningFor||(b.jsLights._listeningFor=new Set),a.forEach(function(c){if(!b.jsLights._startedDepCheck&&c.indexOf("->")!=-1){var d=c.split("->"),e=d[0],f=d[1];jsLights.after(e,function(){var a=jsLights.getByPath(e);if(!a)throw new Error(e+" not found");if(!a.on)throw new Error(e+" has no .on function");a.jsLights&&a.jsLights.triggered&&a.jsLights.triggered[f]?jsLights._registerEvent(c):a.once(f,function(){jsLights._registerEvent(c)})})}jsLights.triggered.indexOf(c)==-1&&(b.jsLights._listeningFor.has(c)||(b.jsLights._listeningFor.add(c),jsLights.once(c,function(){jsLights.after(a,b),b.jsLights&&b.jsLights._listeningFor&&b.jsLights._listeningFor.delete(c)})))}),void(b.jsLights._startedDepCheck=!0))}},{key:"createInstances",value:function(a){var b=this;setTimeout(function(){for(var c in a){var d=a[c],e=jsLights._extendedClasses[d];e&&(d=e[e.length-1]),b.after(d,function(a,b){this.register(a,this.getByPath(b)).instantiate()}.bind(b,c,d))}},1)}},{key:"register",value:function(a,b){var c=this;return"string"!=typeof a&&(b=a,a=!1),new(function(){function f(){var e=this;d(this,f),this._after=[],this.path=c._getOriginPath(a),this.reference=b,this._listeningFor=new Set,c._registered.add(this),this._defaultChainEnd=setTimeout(function(){e.execute()},0)}return e(f,[{key:"after",value:function(a){var b=this;return"string"==typeof a?this._after.indexOf(a)==-1&&this._after.push(a):Array.isArray(a)&&a.forEach(function(a){b._after.indexOf(a)==-1&&b._after.push(a)}),this}},{key:"assign",value:function(){var a=this;this.onPassedDependencies=function(){a._assign(a.reference)},this._checkDependencies()}},{key:"before",value:function(a){if(!this.path)throw Error("can not set before() without namespacing function");var b=[];"string"==typeof a?b.push(a):Array.isArray(a)&&(b=b.concat(a));for(var d=0;d<b.length;d++){var a=b[d];if(c.triggered.indexOf(a)!=-1)throw new Error(a+" is already trigger");c._beforeDependency[a]?c._beforeDependency[a].indexOf(this.path)==-1&&c._beforeDependency[a].push(this.path):c._beforeDependency[a]=[this.path]}return this}},{key:"dependency",value:function(a){return this.after(a)}},{key:"execute",value:function(){var a=this;this.onPassedDependencies||(this.onPassedDependencies=function(){var b=a.reference();a.path&&a._assign(b)}),this._checkDependencies()}},{key:"executeAs",value:function(a){this.id(a),this.execute()}},{key:"extends",value:function(a,b){var d=this;return a=c._getOriginPath(a),!this.reference&&b&&(this.reference=b),!this.path&&a&&(this.path=a,this._id&&(c._alias[this._id]=this.path)),this._classCreator=this.reference,this.after(a),this.onPassedDependencies=function(){var b=c.getByPath(a),e=b._jsLightsInstance;d.parent=e,d.reference=d._classCreator(b),d.reference._jsLightsInstance=d,e&&e._addChild(d),d.path==a&&e._recompileChildren(d),d.assign()},this}},{key:"id",value:function(a){return this._id=a,this.path=c._getOriginPath(this.path),c._alias[a]=this.path,this._assigned&&c._registerEvent(a),this}},{key:"instantiate",value:function(a){var b=this;this.onPassedDependencies=function(){var c=new b.reference(a);b.path&&b._assign(c)},this._checkDependencies()}},{key:"_assign",value:function(a){if(!this.path)throw new Error("can not assign without namespace");if(void 0===!a)throw new Error('can not assign "undefined" for '+this.path);a&&(a.jsLights={path:this.path});var b=this.path.split("."),d=window,e=0,f=!0,g=!1,h=void 0;try{for(var i,j=b[Symbol.iterator]();!(f=(i=j.next()).done);f=!0){var k=i.value;e++,d[k]||(d[k]={}),e==b.length&&(d[k]=a),d=d[k]}}catch(a){g=!0,h=a}finally{try{!f&&j.return&&j.return()}finally{if(g)throw h}}c._registerEvent(this.path),this._id&&c._registerEvent(this._id),this._assigned=!0}},{key:"_checkDependencies",value:function(){var a=this;if(clearTimeout(this._defaultChainEnd),!this._extendedChecked&&this.path){this._extendedChecked=!0;var b=!0,d=!1,e=void 0;try{for(var f,g=c._registered[Symbol.iterator]();!(b=(f=g.next()).done);b=!0){var h=f.value;h.path==this.path&&h!=this&&(c._extendedClasses[this.path]||(c._extendedClasses[this.path]=[]),this._id||this.id(this.path+"-"+c._extendedClasses[this.path].length),c._extendedClasses[this.path].push(this._id))}}catch(a){d=!0,e=a}finally{try{!b&&g.return&&g.return()}finally{if(d)throw e}}}if(this._before)for(var i=0;i<this._before.length;i++){var j=this._before[i];if(c.triggered.indexOf(j)!=-1){if(this._startedDepCheck)continue;throw new Error(j+" is already assigned. Can not set before() for "+this.path)}return void c.once(j,function(){a._checkDependencies()})}var k=0;return this._after.forEach(function(a){c.triggered.indexOf(a)!=-1&&k++}),k==this._after.length?(this.onPassedDependencies&&this.onPassedDependencies(),void(this.onPassedDependencies=!1)):(this._after.forEach(function(b){if(!a._startedDepCheck&&b.indexOf("->")!=-1){var d=b.split("->"),e=d[0],f=d[1];c.after(e,function(){var a=c.getByPath(e);if(!a)throw new Error(e+" not found");if(!a.on)throw new Error(e+" has no .on function");a.jsLights&&a.jsLights.triggered&&a.jsLights.triggered[f]?c._registerEvent(b):a.once(f,function(){c._registerEvent(b)})})}c.triggered.indexOf(b)==-1&&(a._listeningFor.has(b)||(a._listeningFor.add(b),c.once(b,function(){a._checkDependencies(),a._listeningFor.delete(b)})))}),void(this._startedDepCheck=!0))}},{key:"_recompileChildren",value:function(a){this.children&&this.children.forEach(function(b){b!=a&&(b.reference=b._classCreator(a.reference),b.assign(),b._recompileChildren(b))})}},{key:"_addChild",value:function(a){this.children||(this.children=[]),this.children.push(a)}}]),f}())}},{key:"extend",value:function(a,b){var c=this.register(a,b);return c.extends(a),c}},{key:"getByPath",value:function(a){if(a=this._alias[a]||a,"EventEmitter"==a||"Base"==a)return window.jsLights.eventEmitter;for(var b=a.split("."),c=window,d=0;d<b.length;d++)if(c=c[b[d]],void 0===c)return;return 0!=d?c:void 0}},{key:"inspect",value:function(a){var b=this;if(!a)throw new Error("Invalid path");var c=!1,d=!0,e=!1,f=void 0;try{for(var g,h=this._registered[Symbol.iterator]();!(d=(g=h.next()).done);d=!0){var i=g.value;i.path==a&&(c=!0,0==i.onPassedDependencies?console.log("Status: %cTriggered","color: green;"):console.log("Status: %cPending","color: red;"),i._after.length&&(console.log("Dependencies:"),i._after.forEach(function(a){b.triggered.indexOf(a)==-1?console.log(a+" %c (pending)","color: red"):console.log(a+" %c (triggered)","color: green")})))}}catch(a){e=!0,f=a}finally{try{!d&&h.return&&h.return()}finally{if(e)throw f}}c||console.log(a+" is not registered")}},{key:"instantiate",value:function(a,b,c){var d=this.register(a,b);return d.after(c),d.instantiate(),d}},{key:"onPathInstantiated",value:function(a,b){if(console.warn("jsLights.onPathInstantiated is deprecated. Please use after()"),console.trace(),this.triggered.indexOf(a)!=-1)b();else{this.once(a,function(){b()})}}},{key:"_registerEvent",value:function(a){this.triggered.indexOf(a)==-1&&this.triggered.push(a),this.trigger(a)}},{key:"_getOriginPath",value:function(a){for(;this._alias[a];)a=this._alias[a];return a}}]),b}(i),k=new j,k.eventEmitter=k.base=i,window.jsLights=k}}})})(function(a){"function"==typeof define&&define.amd?define([],a):"object"==typeof module&&module.exports&&"function"==typeof require?module.exports=a():a()});
//# sourceMappingURL=jslights.js.map