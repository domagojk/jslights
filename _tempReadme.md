# jsLights
Javascript module manager

If used in browser, jsLights is global object assigned in window


## API


## jsLights.base
jsLights has built-in [EventEmitter](https://github.com/Olical/EventEmitter) with small difference to its original [API](https://github.com/Olical/EventEmitter/blob/master/docs/api.md) which can be used as standalone

```javascript

// class exending jsLights.base
class MyClass extends jsLights.base {
  constructor() {
    super();
    this.trigger("I can now trigger stuff");
  }
}

// registering class using jsLights.register
jsLights.register('App.MyClass').extends('Base', Base => class extends Base {
  constructor() {
    super();
    this.trigger("I can now trigger stuff");
  }
});
```

### addHook
Registering hook by name

* **param** (`String`) _name_ - Hook name
* **param** (`Function`) _cb_ - callback function
* **param** (`Object`) - _options_ (optional); _options.priority_ -> hooks with greater priority will be called first (default is 0)

### callHooks
Calling hooks for given name ordered by priority. If hook is not returning false, execution stops

* **param** (`String`) _name_ - calling hooks registerd with given name
* **param** (`...*`) _ref_ - argument passed in hook
* **return** (`...*`) - return value from hook
### on
Adds a listener function to the specified event. It differs from original in return parameter

* **param** (`String``RegExp`) _evt_ - Name of the event to attach the listener to.
* **param** (`Function`) _listener_ - Method to be called when the event is emitted. If the function returns true then it will be removed after calling.
* **return** (`Object`) - object with callback reference which can be used for unbinding

### trigger

Emits an event of your choice. When emitted, every listener attached to that event will be executed. It differs from original in second parameter which is not required to be an Array

 * **param** (`String``RegExp`) _evt_ - Name of the event to emit and execute listeners for.
 * **param** (`...*`) - Optional argument to be passed to each listener.
 * **return** (`Object`) - Current instance of EventEmitter for chaining.


### unbind

Removes a listener function based on eventObject returned from method .on()

* **param** (`Object`) _evntObj_
 


.......


For apps using singletons which needs to be globally available but depending on other singletons inside application

For example displaying username after user had logged in:

```javascript
// simple function saying hello to given user
function SayHello(username) {
    console.log("Hello ", username);
}

// class (defined using ES6 syntax) which needs to be instantiated after user had logged in
class Welcome {
    constructor() {
        app.sayHello(app.user.username);   
    }
}

// class extending jsLightss built in event emitter
class User extends jsLights.EventEmitter {
    constructor() {
        this.login();
    }
    
    login() {
        this.username = "johnDoe";
        this.trigger("login");
    }
}


```
### Instantiate singleton
```javascript
// create "new SayHello()" and bind it in "app.sayHello"
jsLights.instantiate('app.sayHello', SayHello); 

// create "new User()" and bind it in "app.user" 
// after app.sayHello is initialized
jsLights.instantiate('app.user', User, 'app.sayHello'); 

// create "new Welcome()" and bind it in app.welcome
// after DOM is ready
// after app.sayHello is initialized
// after app.user is initialized and triggered "login" event
jsLights.instantiate('app.welcome', Welcome, [
    'onDocumentReady',
    'app.sayHello',
    'app.user->login'
]);
```

## Building

For now, to be able to build minified file, you need to have "babel", "browserify" and "uglifyjs" installed globaly
(this should be changed in the near future)
