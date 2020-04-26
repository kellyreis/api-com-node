'use strict'
const mongoose = require('mongoose');
const Product = mongoose.model('Product');

exports.get = async() => {

    const res = await Product.find({
        active: true
    }, 'title price slug ');

    return res;

}


exports.getBySlug = async(slug) => {
    const res = await Product.findOne({
        slug: req.params.slug,
        active: true
    }, 'title description price slug tags');

    return res;

}
exports.getById = async(id) => {
    const res = awaitProduct.findById(req.params.id);

    return res;
}


exports.getByTag = async(tag) => {
    const res = await
    Product.find({
        tags: req.params.tag,
    }, 'title description price slug tags');
    return res;
}

exports.create = async(data) => {
    const product = new Product(data);
    await product.save();

}


exports.update = async(id, data) => {
    await Product
        .findByIdAndUpdate(id, {
            $set: {
                title: data.title,
                description: data.description,
                price: data.price,
                slug: data.slug
            }
        });

}



exports.delete = async(id) => {
    await Product
        .findOneAndRemove(id)
        .then(x => {
            res.status(200).send({
                menssage: 'produto removido com sucesso'
            });
        });

}