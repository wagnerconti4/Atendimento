const Tabela = require('./conexaoBancoDados')

const Atendimento = Tabela.sequelize.define('atendimentos',{
    Status: {
        type: Tabela.Sequelize.BOOLEAN
    },
    NomeCliente: {
        type: Tabela.Sequelize.STRING,
        allowNull: false
    },
    NomeEmpresa: {
        type: Tabela.Sequelize.STRING,
        allowNull: false
    },
    TelefoneCliente: {
        type: Tabela.Sequelize.STRING,
        allowNull: false
    },
    ProblemaCliente: {
        type: Tabela.Sequelize.TEXT,
        allowNull: false
    },
    EnderecoClienteRua: {
        type: Tabela.Sequelize.TEXT
    },
    EnderecoClienteNumero: {
        type: Tabela.Sequelize.INTEGER
    },
    EnderecoClienteComplemento:{
        type: Tabela.Sequelize.TEXT
    },
    Funcionario: {
        type: Tabela.Sequelize.STRING,
        allowNull: false
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