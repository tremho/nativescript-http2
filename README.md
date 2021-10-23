# nativescript-http2
HTTP/2 client support for nativescript android and iOS 

[![Build Status][build-status]][build-url]
[![NPM version][npm-image]][npm-url]
[![Downloads][downloads-image]][npm-url]
[![TotalDownloads][total-downloads-image]][npm-url]
[![Twitter Follow][twitter-image]][twitter-url]

[build-status]: https://travis-ci.com/tremho/nativescript-http2.svg?branch=master

[build-url]: https://travis-ci.com/tremho/nativescript-http2

[npm-image]: http://img.shields.io/npm/v/@tremho/nativescript-http2.svg

[npm-url]: https://npmjs.org/package/@tremho/nativescript-http2

[downloads-image]: http://img.shields.io/npm/dm/@tremho/nativescript-http2.svg

[total-downloads-image]: http://img.shields.io/npm/dt/@tremho/nativescript-http2.svg?label=total%20downloads

[twitter-image]: https://img.shields.io/twitter/follow/Tremho1.svg?style=social&label=Follow%20me

[twitter-url]: https://twitter.com/Tremho1

----
Provides http2 support for android via `okHttp`  
Provides http2 support for iOS via `NSURLSession`  
iOS support available for iOS 9 and higher.

version 1.0.0 http2 feature support is currently limited to
simple session creation and data exchange as required for my initial
needs. However, this should be enough for most general http2 purposes.
I believe one could create an Alexa client with this, for example.

API syntax is inspired (but not guaranteed to be 100% spec-compliant to)
the http2 module of Node. I am open to implementing additional Node-style 
http2 features, if I count enough request interest on the issues page.  Or,
feel free to fork and contribute your own modifications and submit a pull request!


-------
#### To install and use
`ns plugin add @tremho/nativescript-http2`

in your code:
```
import * as http2 from "@tremho/nativescript-http2"

// get and display the pluginId string
console.log(http2.pluginId())

// make a session connection
const url = <your h2 server address>
const session = http2.connect(url)
const request = this.session.request({":path": path})
request.setEncoding('utf8')
request.on('response', (headers:any)=> {this.handleResponse(headers)})
request.on('data', (chunk:string)=> {this.handleChunkData(chunk)})

// send data
request.write('hello server')

// see the API docs for more information / examples

```

-------

#### To build and test from source:
1. __clone the repository__  
`git clone git@github.com:tremho/nativescript-http2.git`
2. __have Nativescript installed and working on your system__  
   https://docs.nativescript.org/environment-setup.html
3. from the nativescript-http2 directory (the repository clone)  
`npm run start-android`  or `npm run start-ios` (depending on which mobile platform you wish to run for)
   this assumes you have emulators configured and ready or have a device connected.

#### Repository folder structure
_Not created using nativescript-plugin-seed, which appears outdated and broken 
at the point of time this development started (October 2021).
Using my own plugin folder structure instead._

- `demo`  
contains the demonstration app to test the plugin apis  
`app/main-view-model.ts` is the source file where the plugin is used here.  


- `plugin/dist`
contains the packaged tar.gz (.tgz) file of the built plugin module


- `plugin/src`
contains the source code of the plugin.  JS-level APIs are maintained
in `index.ts`  


- `platforms` contains the specific code for android or ios.  


- `plugin-package.json` is the `package.json` that is published with the plugin.  
 
#### using the development scripts


#### Using the locally built plugin


#### Publishing the plugin


-----------
In case you develop UI plugin, this is where you can add some screenshots.

## API

Describe your plugin methods and properties here. See [nativescript-feedback](https://github.com/EddyVerbruggen/nativescript-feedback) for example.
    
| Property | Default | Description |
| --- | --- | --- |
| some property | property default value | property description, default values, etc.. |
| another property | property default value | property description, default values, etc.. |
    

## License

Apache License Version 2.0, January 2004

