const express = require('express');
const bodyParser = require('body-parser');
const serverless = require('serverless-http');

const { addProduct } = require('../routers/addProduct');
const { getProduct } = require('../routers/getProduct');

const app = express();
app.use(bodyParser.json({ strict: false, limit: '10mb' }));
app.get('/product', getProduct);
app.post('/product', addProduct);

module.exports.handler = serverless(app);
