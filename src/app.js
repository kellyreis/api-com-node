'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config');
//Cria o expess
const app = express();
const router = express.Router();


//CONECTA BANCO

mongoose.connect(config.connectionString);


//carrega os models
const Product = require('./models/product');
const Customer = require('./models/customer');
const Order = require('./models/order');

//carrega rotas
const indexRoutes = require('./routes/index');
const routeProducts = require('./routes/product');
const routeCustomer = require('./routes/customer');
const routeOrder = require('./routes/order');
app.use(bodyParser.json({
    limit: '5mb'
}));
app.use(bodyParser.urlencoded({ extended: false }));

// Habilita o CORS
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});
//cria rota
app.use('/', indexRoutes);
app.use('/products', routeProducts);
app.use('/customer', routeCustomer);
app.use('/customer', routeOrder);
module.exports = app;