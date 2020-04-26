'use strict'
const mongoose = require('mongoose');
const Product = mongoose.model('Product');
const repository = require('../repositories/product-repositorio');
const ValidatorContract = require('../validators/fluente-validator');
const azure = require('azure-store');
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

//Lista slug
exports.getBySlug = async(req, res, next) => {
    try {
        const data = await repository.getBySlug(req.params.slug)
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            messagem: 'Falha ao processar sua requisição'
        });
    }


}

//Lista id
exports.getById = async(req, res, next) => {
    try {
        const data = await repository.getById(req.params.id)
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            messagem: 'Falha ao processar sua requisição'
        });
    }

}


//Filtro por tag
exports.getByTag = async(req, res, next) => {
    try {
        const data = await repository.getById(req.params.tag)
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            messagem: 'Falha ao processar sua requisição'
        });
    }
}

exports.post = async(req, res, next) => {
    // Cria o Blob Service
    // const blobSvc = azure.createBlobService(config.containerConnectionString);

    let filename = guid.raw().toString() + '.jpg';
    let rawdata = req.body.image;
    let matches = rawdata.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    let type = matches[1];
    let buffer = new Buffer(matches[2], 'base64');

    // Salva a imagem
    await blobSvc.createBlockBlobFromText('product-images', filename, buffer, {
        contentType: type
    }, function(error, result, response) {
        if (error) {
            filename = 'default-product.png'
        }
    });


    let contract = new ValidatorContract();
    contract.hasMinLen(req.body.title, 3, 'o titulo deve conter pelo menos 3 caracteres');
    contract.hasMinLen(req.body.slug, 3, 'o titulo deve conter pelo menos 3 caracteres');
    contract.hasMinLen(req.body.description, 3, 'o titulo deve conter pelo menos 3 caracteres');


    //Se os dados forem invalidos
    if (!constract.isValid()) {
        res.status(400).send(contract.errors()).end();
        return;
    }
    try {
        await repository.create({
            title: req.body.title,
            slug: req.body.slug,
            description: req.body.description,
            price: req.body.price,
            active: true,
            tags: req.body.tags,
            image: 'https://nodestr.blob.core.windows.net/product-images/' + filename
        });
        res.status(200).send({
            messagem: 'produto cadastrado com sucesso'
        });
    } catch (e) {
        res.status(500).send({
            messagem: 'Falha ao processar sua requisição'
        });
    }
}

//Executa Update
exports.put = async(req, res, next) => {

    try {
        await repository.update(req.params.id, req.body)
        res.status(200).send({
            messagem: 'produto atualizado com sucesso'
        });
    } catch (e) {
        res.status(500).send({
            messagem: 'Falha ao processar sua requisição'
        });
    }
}

exports.delete = async(req, res, next) => {
    try {
        await repository.delete(req.params.id)
        res.status(200).send({
            messagem: 'produto removido com sucesso'
        });
    } catch (e) {
        res.status(500).send({
            messagem: 'Falha ao processar sua requisição'
        });
    }

}