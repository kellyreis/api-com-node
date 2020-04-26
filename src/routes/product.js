'use strict'

const express = require('express');
const router = express.Router();
const controller = require('../controllers/product-controller');
const token = require('../services/auth-services');
//Lista todos produtos
router.get('/', controller.get);

//Lista por slug
router.get('/:slug', controller.getBySlug);

//Lista por id , adiciona admin para não ter conflito com listagem do Slug
router.get('/admin/:id', controller.getById);

//Filtra por tags
router.get('/tags/:tag', controller.getByTag);

//Executa o cadastro
router.post('/', token.isAdmin, controller.post);

//Executa Update
router.put('/:id', token.isAdmin, controller.put);

//Executa o delete
router.delete('/:id', token.isAdmin, controller.delete);

module.exports = router;