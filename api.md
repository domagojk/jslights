## jsLights

* [jsLights](#jsLights)
    * [.addHook(name, cb, options)](#jsLights.addHook)
    * [.callHooks(name, ...ref)](#jsLights.callHooks) ⇒ <code>\*</code>
    * [.on(evt, listener)](#jsLights.on) ⇒ <code>Object</code>
    * [.trigger(evt, ...args)](#jsLights.trigger) ⇒ <code>\*</code>
    * [.unbind(eventObj)](#jsLights.unbind)
    * [.assign(path, ...reference, dependency)](#jsLights.assign) ⇒ <code>[register_instance](#register_instance)</code>
    * [.after(dependencies, callback)](#jsLights.after)
    * [.createInstances(config)](#jsLights.createInstances)
    * [.register(path, ...reference)](#jsLights.register) ⇒ <code>[register_instance](#register_instance)</code>
    * [.extend(path, reference)](#jsLights.extend) ⇒ <code>[register_instance](#register_instance)</code>
    * [.inspect(path)](#jsLights.inspect)
    * [.instantiate(path, reference)](#jsLights.instantiate) ⇒ <code>[register_instance](#register_instance)</code>

<a name="jsLights.addHook"></a>

### jsLights.addHook(name, cb, options)
Registering hook by name


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


| Param | Type |
| --- | --- |
| eventObj | <code>Object</code> | 

**Example**  
```js
this._onNotifyReference = this.on("notification", function() {});
this.unbind(this._onNotifyReference);
```
<a name="jsLights.assign"></a>

### jsLights.assign(path, ...reference, dependency) ⇒ <code>[register_instance](#register_instance)</code>
Assigning reference in passed path


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

### jsLights.register(path, ...reference) ⇒ <code>[register_instance](#register_instance)</code>
Registering reference at given path


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

### jsLights.extend(path, reference) ⇒ <code>[register_instance](#register_instance)</code>
Extending class assigned in path with passed reference
Shorthand for jsLights.register(path, reference).extends(path)


| Param | Type | Description |
| --- | --- | --- |
| path | <code>String</code> | (for example app.my.function) |
| reference | <code>function</code> | to be assigned (must be a function returning class) |

<a name="jsLights.inspect"></a>

### jsLights.inspect(path)
Checking status for passed path
is it triggered or pending, showing status for all dependencies


| Param | Type | Description |
| --- | --- | --- |
| path | <code>String</code> | (for example app.my.function) |

<a name="jsLights.instantiate"></a>

### jsLights.instantiate(path, reference) ⇒ <code>[register_instance](#register_instance)</code>
Creating instance from passed reference and assigning it in path
Shorthand for jsLights.register(path, reference).after(dependencies).instantiate()


| Param | Type | Description |
| --- | --- | --- |
| path | <code>String</code> | (for example app.my.function) |
| reference | <code>function</code> | from which instance is created |

<a name="register_instance"></a>

## register_instance

* [register_instance](#register_instance)
    * [.after(path)](#after) ⇒ <code>[register_instance](#register_instance)</code>
    * [.assign()](#assign)
    * [.before(path)](#before) ⇒ <code>[register_instance](#register_instance)</code>
    * [.dependency(path)](#dependency) ⇒ <code>[register_instance](#register_instance)</code>
    * [.instantiate()](#instantiate)
    * [.executeAs(id)](#executeAs)
    * [.extends(id, callback)](#extends) ⇒ <code>[register_instance](#register_instance)</code>
    * [.id(id)](#id) ⇒ <code>[register_instance](#register_instance)</code>
    * [.instantiate(...params)](#instantiate)

<a name="after"></a>

### after(path) ⇒ <code>[register_instance](#register_instance)</code>
registration will be executed after passed dependencies have been triggered


| Param | Type | Description |
| --- | --- | --- |
| path | <code>String/Array</code> | (for example app.my.function) |

**Example**  
```js
jsLights.register('My.Namespace.Child').extends('My.Namespace.Parent', function(Parent) {
  return class extends Parent {
     // child extends parent
     // after triggered dependencies My.Namespace1 and My.Namespace1
  }
}).after(["My.Namespace1", "My.Namespace2"]).execute();
```
<a name="assign"></a>

### assign()
Assigning reference (end of chain)

**Example**  
```js
jsLights.register('My.Namespace1', myFunction).after('My.Namespace2').assign()
```
<a name="before"></a>

### before(path) ⇒ <code>[register_instance](#register_instance)</code>
registration will be executed before passed dependencies have been triggered


| Param | Type | Description |
| --- | --- | --- |
| path | <code>String/Array</code> | (for example app.my.function) |

**Example**  
```js
jsLights.register('My.Namespace.Child').extends('My.Namespace.Parent', function(Parent) {
  return class extends Parent {
     // child extends parent
     // after triggered dependencies My.Namespace1 and My.Namespace1
  }
}).after("My.Namespace1").before("My.Namespace2").execute();
```
<a name="dependency"></a>

### dependency(path) ⇒ <code>[register_instance](#register_instance)</code>
(alias of after) 
registration will be executed after passed dependencies have been triggered


| Param | Type | Description |
| --- | --- | --- |
| path | <code>String/Array</code> | (for example app.my.function) |

**Example**  
```js
jsLights.register('My.Namespace.Child').extends('My.Namespace.Parent', function(Parent) {
  return class extends Parent {
     // child extends parent
     // after triggered dependencies My.Namespace1 and My.Namespace1
  }
}).after(["My.Namespace1", "My.Namespace2"]).execute();
```
<a name="instantiate"></a>

### instantiate()
On passed dependencies, reference will be assigned (end of chain)

**Example**  
```js
jsLights.register('My.Namespace', SampleFunction).after(dependencies).execute()
```
<a name="executeAs"></a>

### executeAs(id)
On passed dependencies, reference will be assigned with passed id (end of chain)


| Param | Type |
| --- | --- |
| id | <code>String</code> | 

**Example**  
```js
jsLights.register('My.Namespace', SampleClass).after(dependencies).executeAs('My:Class')
```
<a name="extends"></a>

### extends(id, callback) ⇒ <code>[register_instance](#register_instance)</code>
Extending class using namespace path


| Param | Type | Description |
| --- | --- | --- |
| id | <code>String</code> |  |
| callback | <code>function</code> | that should return new class |

**Example**  
```js
jsLights.register('My.Namespace.Child').extends('My.Namespace.Parent', function(Parent) {
  return class extends Parent {
     // child extends parent
  }
}).execute();
```
<a name="id"></a>

### id(id) ⇒ <code>[register_instance](#register_instance)</code>
Assigning id on registered reference


| Param | Type |
| --- | --- |
| id | <code>String</code> | 

**Example**  
```js
jsLights.register('My.Namespace', SampleClass).after(dependencies).id('My:Class').execute()
```
<a name="instantiate"></a>

### instantiate(...params)
On passed dependencies, instance of registered function will be created (end of chain)


| Param | Type | Description |
| --- | --- | --- |
| ...params | <code>\*</code> | params passed in registered function |

**Example**  
```js
jsLights.register('My.Namespace', SampleClass).after(dependencies).instantiate()
```
