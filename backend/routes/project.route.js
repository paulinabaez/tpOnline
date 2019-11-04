'use strict'

const express = require('express');
const api = express.Router();

const ProjectService = require('../services/project.service');

api.get('/project/:id?', ProjectService.getProyecto);
api.post('/project', ProjectService.createProyecto);
api.put('/project/:id', ProjectService.updateProyecto);
api.delete('/project/:id', ProjectService.deleteProyecto);

module.exports = api;