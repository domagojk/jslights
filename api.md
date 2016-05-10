## Classes

<dl>
<dt><a href="#jsLights">jsLights</a></dt>
<dd></dd>
<dt><a href="#ReturnedInstace">ReturnedInstace</a></dt>
<dd></dd>
</dl>

<a name="jsLights"></a>

## jsLights
**Kind**: global class  

* [jsLights](#jsLights)
    * [.addHook(name, cb, options)](#jsLights.addHook)
    * [.callHooks(name, ...ref)](#jsLights.callHooks) ⇒ <code>\*</code>
    * [.on(evt, listener)](#jsLights.on) ⇒ <code>Object</code>
    * [.trigger(evt, ...args)](#jsLights.trigger) ⇒ <code>\*</code>
    * [.unbind(eventObj)](#jsLights.unbind)
    * [.assign(path, ...reference, dependency)](#jsLights.assign) ⇒ <code>[ReturnedInstace](#ReturnedInstace)</code>
    * [.after(dependencies, callback)](#jsLights.after)
    * [.createInstances(config)](#jsLights.createInstances)
    * [.register(path, ...reference)](#jsLights.register) ⇒ <code>[ReturnedInstace](#ReturnedInstace)</code>
    * [.extend(path, reference)](#jsLights.extend) ⇒ <code>[ReturnedInstace](#ReturnedInstace)</code>
    * [.inspect(path)](#jsLights.inspect)
    * [.instantiate(path, reference)](#jsLights.instantiate) ⇒ <code>[ReturnedInstace](#ReturnedInstace)</code>

<a name="jsLights.addHook"></a>

### jsLights.addHook(name, cb, options)
Registering hook by name

**Kind**: static method of <code>[jsLights](#jsLights)</code>  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | Hook name |
| cb | <code>function</code> | callback function |
| options | <code>Object</code> | aditional options |
| options.priority | <code>Object</code> | hooks with greater priority will be called first (default is 0) |

**Example**  
```js
My.singleton.addHook('onFetchingResults', this.myFunction, { priority: 10 });
```
<a name="jsLights.callHooks"></a>

### jsLights.callHooks(name, ...ref) ⇒ <code>\*</code>
Calling hooks for given name ordered by priority
If hook is not returning false, execution stops

**Kind**: static method of <code>[jsLights](#jsLights)</code>  
**Returns**: <code>\*</code> - return value from hook  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | calling hooks registerd with given name |
| ...ref | <code>\*</code> | argument passed in hook |

**Example**  
```js
this.callHooks('onFetchingResults', {myParameter: 5});
```
<a name="jsLights.on"></a>

### jsLights.on(evt, listener) ⇒ <code>Object</code>
Adds a listener function to the specified event

**Kind**: static method of <code>[jsLights](#jsLights)</code>  
**Returns**: <code>Object</code> - object with callback reference which can be used for unbinding  

| Param | Type | Description |
| --- | --- | --- |
| evt | <code>String</code> | name of the event to attach the listener to |
| listener | <code>function</code> | Method to be called when the event is emitted |

**Example**  
```js
My.singleton.on('notification', function(data) {
 // callback when notification event is triggered
});
```
<a name="jsLights.trigger"></a>

### jsLights.trigger(evt, ...args) ⇒ <code>\*</code>
Emits an event of your choice
when emitted, every listener attached to that event will be executed.

**Kind**: static method of <code>[jsLights](#jsLights)</code>  
**Returns**: <code>\*</code> - current instance of EventEmitter for chaining  

| Param | Type | Description |
| --- | --- | --- |
| evt | <code>String</code> | name of the event to emit and execute listeners |
| ...args | <code>\*</code> | optional argument to be passed to each listener |

**Example**  
```js
this.trigger('notification', { title: "Hello, its me." });
```
<a name="jsLights.unbind"></a>

### jsLights.unbind(eventObj)
Removes a listener function based on eventObject returned from method .on()

**Kind**: static method of <code>[jsLights](#jsLights)</code>  

| Param | Type |
| --- | --- |
| eventObj | <code>Object</code> | 

**Example**  
```js
this._onNotifyReference = this.on("notification", function() {});
this.unbind(this._onNotifyReference);
```
<a name="jsLights.assign"></a>

### jsLights.assign(path, ...reference, dependency) ⇒ <code>[ReturnedInstace](#ReturnedInstace)</code>
Assigning reference at given path

**Kind**: static method of <code>[jsLights](#jsLights)</code>  

| Param | Type | Description |
| --- | --- | --- |
| path | <code>String</code> | (for example app.my.function) |
| ...reference | <code>\*</code> | to be assigned (usually a function or class) |
| dependency | <code>String/Array</code> | (optional) if given, reference will be assigned after passed dependencies |

**Example**  
```js
var hello = function() {
  console.log("hello") 
}
jsLights.assign('My.Namespce.HelloFunction', hello);

// jsLights.assign is shorthand for:
jsLights.register(path, reference).after(dependencies).assign()
```
<a name="jsLights.after"></a>

### jsLights.after(dependencies, callback)
Execute after passed dependencies
If all dependencies are already triggered, callback is executed immediately
otherwise, callback is executed when all dependencies have been triggered

**Kind**: static method of <code>[jsLights](#jsLights)</code>  

| Param | Type |
| --- | --- |
| dependencies | <code>String/Array</code> | 
| callback | <code>function</code> | 

**Example**  
```js
jsLights.after(['My.Namespace1', 'My.Namespace2'], function() {
  // My.Namespace1 and My.Namespace2 have been created
});
```
<a name="jsLights.createInstances"></a>

### jsLights.createInstances(config)
Creating singleton instances using config structure

**Kind**: static method of <code>[jsLights](#jsLights)</code>  

| Param | Type |
| --- | --- |
| config | <code>Object</code> | 

**Example**  
```js
jsLights.createInstances({ 
  'app.mySingleton': 'app.MyClass',
  'app.somethingElse': 'app.AnotherClass'
});
```
<a name="jsLights.register"></a>

### jsLights.register(path, ...reference) ⇒ <code>[ReturnedInstace](#ReturnedInstace)</code>
Registering reference at given path

**Kind**: static method of <code>[jsLights](#jsLights)</code>  

| Param | Type | Description |
| --- | --- | --- |
| path | <code>String</code> | (for example app.my.function) |
| ...reference | <code>\*</code> | to be assigned (usually a function or class) |

**Example**  
```js
jsLights.register('My.Namespace.Child').extends('My.Namespace.Parent', Parent => class extends Parent {
  // child extends parent
}).after("My.Namespace1").execute();

// without arrow function
jsLights.register('My.Namespace.Child').extends('My.Namespace.Parent', function(Parent) {
  return class extends Parent {
     // child extends parent
  }
}).after("My.Namespace1").execute();
```
<a name="jsLights.extend"></a>

### jsLights.extend(path, reference) ⇒ <code>[ReturnedInstace](#ReturnedInstace)</code>
Extending class assigned in path with passed reference
Shorthand for jsLights.register(path, reference).extends(path)

**Kind**: static method of <code>[jsLights](#jsLights)</code>  

| Param | Type | Description |
| --- | --- | --- |
| path | <code>String</code> | (for example app.my.function) |
| reference | <code>function</code> | to be assigned (must be a function returning class) |

<a name="jsLights.inspect"></a>

### jsLights.inspect(path)
ss

**Kind**: static method of <code>[jsLights](#jsLights)</code>  

| Param | Type | Description |
| --- | --- | --- |
| path | <code>String</code> | (for example app.my.function) |

<a name="jsLights.instantiate"></a>

### jsLights.instantiate(path, reference) ⇒ <code>[ReturnedInstace](#ReturnedInstace)</code>
Creating instance from passed reference and assigning it in path
Shorthand for jsLights.register(path, reference).after(dependencies).instantiate()

**Kind**: static method of <code>[jsLights](#jsLights)</code>  

| Param | Type | Description |
| --- | --- | --- |
| path | <code>String</code> | (for example app.my.function) |
| reference | <code>function</code> | from which instance is created |

<a name="ReturnedInstace"></a>

## ReturnedInstace
**Kind**: global class  
<a name="ReturnedInstace.after"></a>

### ReturnedInstace.after(path, ...reference) ⇒ <code>[ReturnedInstace](#ReturnedInstace)</code>
Registering reference at given path

**Kind**: static method of <code>[ReturnedInstace](#ReturnedInstace)</code>  

| Param | Type | Description |
| --- | --- | --- |
| path | <code>String</code> | (for example app.my.function) |
| ...reference | <code>\*</code> | to be assigned (usually a function or class) |

