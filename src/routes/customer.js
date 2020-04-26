'use strict'

const express = require('express');
const router = express.Router();
const controller = require('../controllers/customer-controller');
const token = require('../services/auth-services');
//Lista todos produtos
router.get('/', controller.get);
router.post('/authenticate', controller.authenticate);
router.post('/refresh-token', token.authorize, controller.refreshToken);
//Executa o cadastro
router.post('/', controller.post);



module.exports = router;