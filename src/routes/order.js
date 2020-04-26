'use strict'

const express = require('express');
const router = express.Router();
const controller = require('../controllers/order-controller');
const token = require('../services/auth-services');

//Lista todos produtos
router.get('/', token.authorize, controller.get);

//Executa o cadastro
router.post('/', token.authorize, controller.post);

module.exports = router;