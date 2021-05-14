/*

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
    
    const AtendimentoFuncionario = Tabela.sequelize.define('AtendimentoFuncionario',{
        AtendimentoId:{
            type: Tabela.Sequelize.INTEGER,
            references: {model: 'atendimentos', key: 'id'},
            onDelete: 'CASCADE',
            allowNull: false
        },
        FuncionarioId:{
            type: Tabela.Sequelize.INTEGER,
            references: {model: 'funcionarios', key: 'id'},
            onDelete: 'CASCADE',
            allowNull: false
        }
    })

    
 Atendimento.belongsToMany(Funcionario,{through: AtendimentoFuncionario})
 Funcionario.belongsToMany(Atendimento,{through: AtendimentoFuncionario})
   
module.exports = {
    Atendimento: Atendimento,
    Empresa: Empresa,
    Funcionario: Funcionario,
} */