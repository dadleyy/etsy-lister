# charcoal [![Build Status](https://travis-ci.org/dadleyy/charcoal.svg?branch=master)](https://travis-ci.org/dadleyy/charcoal)

A playground for [ember](http://emberjs.com).

### Running

A mini [expressjs](http://expressjs.com/) dev server exists in the `api` directory that proxies to the [etsy api](https://www.etsy.com/developers/documentation).

To run the client side code and the api (two terminal sessions required):

```
$ npm run dev:api
$ npm start -- --proxy=http://0.0.0.0:8080
```
