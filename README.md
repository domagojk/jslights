# jsLights
JavaScript module namespacer and event emitter

## Usage
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