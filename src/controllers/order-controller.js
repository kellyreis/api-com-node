'use strict'

const repository = require('../repositories/order-repositories');
const guide = require('guide');


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
    try {
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        const data = await authService.decodeToken(token);
        await repository.create({
            customer: data.id,
            number: guide.raw().substring(0, 6),
            items: req.body.items
        })
        res.status(200).send({
            messagem: 'Pedido cadastrado com sucesso'
        });
    } catch (e) {
        res.status(500).send({
            messagem: 'Falha ao processar sua requisição'
        });
    }
}