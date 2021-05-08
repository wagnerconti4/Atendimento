const Tabela = require('./conexaoBancoDados')

const Atendimento = Tabela.sequelize.define('atendimentos',{
    Status: {
        type: Tabela.Sequelize.BOOLEAN
    },
    NomeCliente: {
        type: Tabela.Sequelize.STRING
    },
    NomeEmpresa: {
        type: Tabela.Sequelize.STRING
    },
    TelefoneCliente: {
        type: Tabela.Sequelize.STRING
    },
    EnderecoClienteRua: {
        type: Tabela.Sequelize.TEXT
    },
    EnderecoClienteNumero: {
        type: Tabela.Sequelize.INTEGER
    },
    EnderecoClienteComplemento:{
        type: Tabela.Sequelize.TEXT
    }
})



const Empresa = Tabela.sequelize.define('empresas',{
        CNPJ: {
            type: Tabela.Sequelize.STRING
        },
        NomeEmpresa: {
            type: Tabela.Sequelize.STRING
        },
        EnderecoEmpresaRua: {
            type: Tabela.Sequelize.STRING
        },
        EnderecoEmpresaNumero: {
            type: Tabela.Sequelize.INTEGER
        },
        EnderecoEmpresaComplemento: {
            type: Tabela.Sequelize.TEXT
        },
        TelefoneEmpresa: {
            type: Tabela.Sequelize.STRING
        }
    })
    



    const Funcionario = Tabela.sequelize.define('funcionarios',{
        NomeFuncionario: {
            type: Tabela.Sequelize.STRING
        }
    })


module.exports = {
    Atendimento: Atendimento,
    Empresa: Empresa,
    Funcionario: Funcionario
}