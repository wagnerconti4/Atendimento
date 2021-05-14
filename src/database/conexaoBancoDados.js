const Sequelize = require('sequelize')
const dbConfiguracao = require('../config/configuracaoBanco')

const Atendimento = require('../models/Atendimento')

const connection = new Sequelize(dbConfiguracao)

Atendimento.init(connection)

module.exports = connection