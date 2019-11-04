'use strict';

const Proyecto = require('../models/project.model');

function createProyecto(req, res) {
    var proyecto = new Proyecto();
    const params = req.body;

    proyecto.nombre = params.nombre;
    proyecto.descripcion = params.descripcion;
    proyecto.encargado = params.encargado;

    proyecto.save((err, proyectoStored) => {
        if (err) {
          return res.status(500).send({
            message: err
          });
        } else {
          if (!proyectoStored) {
            return res.status(404).send({
              message: 'No se guardo el proyecto'
            });
          }
          res.status(200).send({
            proyecto: proyectoStored
          });
        }
      });
}

function getProyecto(req, res) {
    const id = req.params.id;

    if(id) {

        Proyecto.findById(id, (err, proyecto) => {
            if(err) {
                return res.status(500).send({
                    message: 'Ha ocurrido un error', err
                });
            } else {
                if(!proyecto) {
                    return res.status(404).send({ message: 'No se ha podido encontrar el proyecto' });
                } else {
                    return res.status(200).send({ proyecto });
                }
            }
        });

    } else {

        Proyecto.find({}, (err, proyectos) => {
            if(err) {
                return res.status(500).send({ message: 'Ha ocurrido un error', err });
            } else {
                if(!proyectos) {
                    return res.status(404).send({ message: 'No se han encontrado proyectos' });
                } else {
                    return res.status(200).send({ proyectos });
                }
            }
        });

    }
}

function updateProyecto(req, res) {
    const id = req.params.id;
    const update = req.body;

    Proyecto.findByIdAndUpdate(id, update, (err, proyectoUpdated) => {
        if(err) {
            return res.status(500).send({ message: 'Ha ocurrido un error', err });
        } else {
            if(!proyectoUpdated) {
                return res.status(400).send({ message: 'No se ha podido actualizar el proyecto' });
            } else {
                return res.status(200).send({ proyecto: proyectoUpdated });
            }
        }
    });
}

function deleteProyecto(req, res) {
    const id = req.params.id;

    Proyecto.findByIdAndRemove(id, (err, proyectoDeleted) => {
        if(err) {
            return res.status(500).send({ message: 'Ha ocurrido un error', err });
        } else {
            if(!proyectoDeleted) {
                return res.status(400).send({ message: 'No se ha podido eliminar el proyecto' });
            } else {
                return res.status(200).send({ proyecto: proyectoDeleted });
            }
        }
    });
}

module.exports = {
    getProyecto,
    createProyecto,
    updateProyecto,
    deleteProyecto
};