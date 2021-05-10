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
        type: Tabela.Sequelize.INTEGER,
        references: {model: 'funcionarios', key: 'id'},
        allowNull: false,
        onUpdate: 'CASCADE'
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

    const AtendimentoFuncionario = Tabela.sequelize.define('atendimentofuncionarios',{
        IdAtendimento:{
            type: Tabela.Sequelize.INTEGER,
            references:{
                model: Atendimento,
                key: 'id'
            }
        },
        IdFuncionario:{
            type: Tabela.Sequelize.INTEGER,
            references:{
                model:Funcionario,
                key:'key'
            }
        }
    })

    AtendimentoFuncionario.sync({force:true})

    Atendimento.belongsToMany(Funcionario,{through: "atendimentoFuncionarios", as: "funcionario", foreignKey: 'id'})
    Funcionario.belongsToMany(Atendimento,{through: "atendimentoFuncionarios", as: "atendimento", foreignKey: 'id'})


module.exports = {
    Atendimento: Atendimento,
    Empresa: Empresa,
    Funcionario: Funcionario
}