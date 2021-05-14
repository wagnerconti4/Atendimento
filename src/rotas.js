const express  = require('express')
const ControleAtendimento = require('./controllers/ControleAtendimento')
const routes = express.Router()

routes.post('/atendimentos', ControleAtendimento.cadastro)

module.exports = routes