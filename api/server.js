const express = require("express");
const proxy   = require("express-http-proxy");
const dotenv  = require("dotenv");
const url     = require("url");
const qs      = require("querystring");

const API_URL = "https://openapi.etsy.com";

dotenv.load();

function forwardPath(req, res) {
  let {pathname, query} = url.parse(req.url);
  let params = qs.parse(query);
  params.api_key = key;
  let result = [pathname, qs.stringify(params)].join("?");
  return result;
}

const app  = express();
const key  = process.env["ETSY_API_KEY"];
const mw   = proxy(API_URL, {forwardPath});
const port = process.argv.length === 3 ? process.argv[2] : "8080";

console.log(`starting server on port ${port}`);
app.use(mw);
app.listen(port);
