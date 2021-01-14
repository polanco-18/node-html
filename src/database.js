const mongoose = require('mongoose');

const URI = 'mongodb://localhost:27017/bd-person';

mongoose.connect(URI, { useCreateIndex: true, useNewUrlParser: true })
    .then(mongoose => console.log('Conectado'))
    .catch(err => console.log(err));

module.exports = mongoose