const { Model, DataTypes } = require('sequelize')

class Atendimento extends Model {
    static init(connection){
        super.init({
            status: DataTypes.STRING,
            nome_cliente: DataTypes.STRING,
            nome_empresa: DataTypes.STRING,
            telefone_cliente: DataTypes.STRING,
            problema_cliente: DataTypes.TEXT,
            endereco_cliente_rua: DataTypes.TEXT,
            endereco_cliente_numero: DataTypes.INTEGER,
            endereco_cliente_complemento: DataTypes.TEXT
        },{
            sequelize: connection
        })
    }
    static relacionamento(models){
        Atendimento.belongsToMany(models.Funcionario,{through: 'atendimentos_funcionarios', foreignKey:'atendimento_id',  as: 'funcionarios'})
    }
}

module.exports = Atendimento