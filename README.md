[![NPM version][npm-image]][npm-url] [![Downloads][downloads-image]][npm-url]

# jsLights
JavaScript module manager

* Can be used for assigning functions in "namespaces" (global window object) with dependecies
* Has built-in [event emmiter](https://github.com/Olical/EventEmitter)

## Why use it?
If for some reason you need your app API to be avaiable in the window object (maybe for like dynamically changing it after initial scripts are loaded) this can be really usefull. Otherwise, I'dont suggest you organize you app this way.

## Documentation

* [API](docs/api.md)


[downloads-image]: http://img.shields.io/npm/dm/jslights.svg
[npm-url]: https://npmjs.org/package/jslights
[npm-image]: http://img.shields.io/npm/v/jslights.svg
