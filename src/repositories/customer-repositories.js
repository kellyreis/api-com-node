'use strict'
const mongoose = require('mongoose');
const Customer = mongoose.model('Customer');

exports.get = async() => {

    const res = await Customer.find({
        active: true
    }, 'title price slug ');

    return res;
}


exports.create = async(data) => {
    const customer = new Customer(data);
    await customer.save();

}



exports.authenticate = async() => {

    const res = await Customer.find({
        email: data.email,
        password: data.password
    });

    return res;
}


exports.getById = async(id) => {

    const res = await Customer.findById(id);

    return res;
}