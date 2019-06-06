"use strict"
const express = require("express");
const cartitems = express.Router();
const pool = require("./pg-connection-pool");

function selectAll(res) {
  pool
  .query("select * from ShoppingCart order by id")
  .then(result => { console.log(result.rows); res.json(result.rows) });
}

cartitems.get("/cart-items", (req, res) => {
  selectAll(res);
});

cartitems.post("/cart-items", (req, res) => {
  pool
  .query("insert into ShoppingCart(product, price, quantity) values($1::text, $2::int, $3::int)",
  [
    req.body.product,
    req.body.price,
    req.body.quantity
  ]).then(() => {
    selectAll(res);
  })
});

cartitems.delete("/cart-items/:id", (req, res) => {
  pool.query("delete from ShoppingCart where id=$1::int",
  [Number(req.params.id)])
  .then(() => {
    selectAll(res);
  })
});

cartitems.put("/cart-items/:id", (req, res) => {
  pool.query("update ShoppingCart set product=$1::text, price=$2::int, quantity=$3::int",
  [
    req.body.product,
    req.body.price,
    req.body.quantity
  ]).then(() => {
    selectAll(res);
  });
});



module.exports = cartitems;