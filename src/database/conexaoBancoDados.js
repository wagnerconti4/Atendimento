const Sequelize = require('sequelize')
const dbConfiguracao = require('../config/configuracaoBanco')

const Atendimento = require('../models/Atendimento')
const Atendimento_Funcionario = require('../models/Atendimento_Funcionario')
const Funcionario = require('../models/Funcionario')

const connection = new Sequelize(dbConfiguracao)

Atendimento.init(connection)
Funcionario.init(connection)
Atendimento_Funcionario.init(connection)

Atendimento.relacionamento(connection.models)
Funcionario.relacionamento(connection.models)

module.exports = connection