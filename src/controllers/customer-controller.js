'use strict'
const mongoose = require('mongoose');
const Customer = mongoose.model('Customer');
const repository = require('../repositories/customer-repositories');
const ValidatorContract = require('../validators/fluente-validator');
const md5 = require('md5');
const emailService = require('../services/email-services');
const token = require('../services/auth-services');

exports.get = async(req, res, next) => {
    try {
        const data = await repository.get();
        res.status(200).send(data);
    } catch (e) {

        res.status(500).send({
            messagem: 'Falha ao processar sua requisição'
        });
    }
}

exports.post = async(req, res, next) => {

    let contract = new ValidatorContract();
    contract.hasMinLen(req.body.name, 3, 'o nome deve conter pelo menos 3 caracteres');
    contract.isEmail(req.body.email, 'E-mail inválido');
    contract.hasMinLen(req.body.password, 6, 'a senha deve conter pelo menos 6 caracteres');


    //Se os dados forem invalidos
    if (!constract.isValid()) {
        res.status(400).send(contract.errors()).end();
        return;
    }
    try {
        await repository.create({
            name: req.body.name,
            email: req.body.email,
            password: md5(req.body.password + global.SALT_KEY),
            roles: ['user']
        })

        emailService.send(
            req.body.email,
            'Bem vindo ao Node Store',
            global.EMAIL_TMPL.replace('{0}', req.body.name));

        res.status(200).send({
            messagem: 'Cliente cadastrado com sucesso'
        });
    } catch (e) {
        res.status(500).send({
            messagem: 'Falha ao processar sua requisição'
        });
    }
}




exports.authenticate = async(req, res, next) => {

    try {
        const customer = await repository.authenticate({
            email: req.body.email,
            password: md5(req.body.password + global.SALT_KEY)
        })


        if (!customer) {
            res.status(404).send({
                messagem: 'uusário ou senha inválidos'
            });
        }

        const geraToken = await token.generateToken({
            id: customer._id,
            email: customer.email,
            name: customer.name,
            roles: customer.roles
        })

        res.status(201).send({
            geraToken: geraToken,
            data: {
                email: customer.email,
                name: customer.name
            }
        });
    } catch (e) {
        res.status(500).send({
            messagem: 'Falha ao processar sua requisição'
        });
    }
}


exports.refreshToken = async(req, res, next) => {

    try {
        const token_ = req.body.token || req.query.token || req.headers['x-access-token'];
        const data = await authService.decodeToken(token_);

        const customer = await repository.getById(data.id);


        if (!customer) {
            res.status(404).send({
                messagem: 'cliente não encontrado'
            });
        }

        const geraToken = await token.generateToken({
            id: customer._id,
            email: customer.email,
            name: customer.name,
            roles: customer.roles
        })

        res.status(200).send({
            geraToken: geraToken,
            data: {
                email: customer.email,
                name: customer.name
            }
        });
    } catch (e) {
        res.status(500).send({
            messagem: 'Falha ao processar sua requisição'
        });
    }
}