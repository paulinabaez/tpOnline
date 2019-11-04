'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProjectSchema = Schema({
    nombre: { type: String, required: [true, 'Es necesario indicar el nombre del proyecto.' ]},
    descripcion: { type: String, required: [true, 'Es necesario indicar la descripcion del proyecto.' ]},
    encargado: { type: String, required: [true, 'Es necesario especificar el encargado del proyecto.' ]},
});

module.exports = mongoose.model('Proyecto', ProjectSchema);