const { Model, DataTypes } = require('sequelize')


class Atendimento_Funcionario extends Model {
    static init(connection){
        super.init({

            atendimento_id:DataTypes.INTEGER,
            funcionario_id:DataTypes.INTEGER,
            
        },{
            sequelize: connection,
            tableName: 'atendimentos_funcionarios'
        })
    }
    
    }


module.exports = Atendimento_Funcionario