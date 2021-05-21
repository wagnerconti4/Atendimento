const { Model, DataTypes } = require('sequelize')


class Funcionario extends Model{
    static init(connection){
        super.init
        (
            {
                nome_funcionario: DataTypes.STRING,
                telefone_funcionario: DataTypes.STRING,
                email_funcionario: DataTypes.STRING
            },

            {
             sequelize: connection
            }
        )
    }
    static relacionamento(models){
        Funcionario.belongsToMany(models.Atendimento,{through:'atendimentos_funcionarios', foreignKey:'funcionario_id', as: 'atendimentos'})
    }
}

module.exports = Funcionario