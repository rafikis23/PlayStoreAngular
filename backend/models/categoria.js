const { Mixed } = require('mongoose');
var mongoose = require('mongoose');

var esquema = new mongoose.Schema({
    nombreCategoria: String,
    descripcion: String,
    aplicaciones: Mixed
});

module.exports = mongoose.model('categorias', esquema);