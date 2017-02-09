# charcoal [![Build Status](https://travis-ci.org/dadleyy/charcoal.svg?branch=master)](https://travis-ci.org/dadleyy/charcoal)

A playground for [ember](http://emberjs.com). The code in this application is inspired by the *"delegate driven"* component api design approach that [hoctable](https://github.com/dadleyy/hoctable) was build on. Instead of high order components however, this codebase takes advantage of ember's [contextual component](http://emberjs.com/blog/2016/01/15/ember-2-3-released.html#toc_contextual-components) with [deferred content](https://github.com/danmcclain/ember-deferred-content). The pagination dropdown is built using a menu + popup service inspired by [`ember-wormhole`](https://github.com/yapplabs/ember-wormhole).

### Setup + Running

A mini [expressjs](http://expressjs.com/) dev server exists in the `api` directory that proxies to the [etsy api](https://www.etsy.com/developers/documentation). In order for this proxy to communicate with etsy, you will need an [api key](using-the-etsy-api) and create a `.env` file at the root of this repository:

*.env*
```
ETSY_API_KEY="your api key here"
```

To run the client side code and the api (two terminal sessions required):

```
$ npm run dev:api
$ npm start -- --proxy=http://0.0.0.0:8080
```

#### Using the Etsy API

Etsy provides basic access to it's json/rest api, which is used by this application. Every api request requires a key string query parameter, so you will need to register an application [here](https://www.etsy.com/developers/).

The api also limits the amount of requests any given api key can make in a given amount of time, so requests made from the listing table delegate have been [throttled](https://github.com/dadleyy/charcoal/blob/d62133cae8f11f39ace8c53d9e4b97a3c4be00ff/app/delegates/listings.js#L84).
