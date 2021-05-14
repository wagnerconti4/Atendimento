const express  = require('express')
const ControleAtendimento = require('./controllers/ControleAtendimento')
const ControleFuncionario = require('./controllers/ControleFuncionario')
const routes = express.Router()

routes.post('/cadastro/Atendimentos', ControleAtendimento.cadastroAtendimento)
routes.get('/lista/Atendimentos', ControleAtendimento.listaAtendimento)

routes.post('/cadastroFuncionarios', ControleFuncionario.cadastroFuncionario)
routes.get('/listaFuncionarios', ControleFuncionario.listaFuncionario)

routes.post('/cadastroFuncionarios', ControleFuncionario.cadastroFuncionario)
routes.get('/listaFuncionarios', ControleFuncionario.listaFuncionario)


module.exports = routes