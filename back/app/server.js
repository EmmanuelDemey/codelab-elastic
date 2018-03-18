const _ = require("underscore");
const express = require("express");
const http = require("http");
const uuid = require("node-uuid");
const cors = require("./cors");
const weather = require("weather-js");

const app = express();
const server = http.createServer(app);

const conf = require("./server.json");

const products = require(conf.products);
var basket = [];

var sessions = {};

var context = "/rest";
var authHeader = "Auth-Token";
const port = process.env.PORT || 8080;

app.use(require("morgan")("dev"));

app.use(express.bodyParser());
app.use(cors);

app.get(context + "/products", function(req, res) {
  res.send(products);
});

var createHandler = function(req, res) {
  basket.push(req.body);
  products = products.map(product => {
    if (product.title.toUpperCase() === req.body.title.toUpperCase()) {
      product.stock--;
    }
    return product;
  });
  res.send(201, req.body);
};

app.post(context + "/basket", createHandler);

app.post(context + "/basket/confirm", (req, res) => {
  basket = [];
  res.send(200, {});
});

app.get(context + "/basket", function(req, res) {
  res.send(basket);
});

app.get(context + "/weather", function(req, res) {
  weather.find({ search: "San Francisco, CA", degreeType: "F" }, function(
    err,
    result
  ) {
    if (err) console.log(err);
    res.send(result);
  });
});

app.get(context + "/long/task", function(req, res) {
  setInterval(() => {
    res.send(200, {});
  }, 5000);
});

server.listen(port);
console.log("Express server listening on port", server.address().port);
