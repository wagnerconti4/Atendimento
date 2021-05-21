'use strict';

module.exports = 
{
    up: async (queryInterface, Sequelize) => 
    {
      await queryInterface.createTable('atendimentos_funcionarios', {
          id: 
          {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
          },

          atendimento_id:
          {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {model: 'atendimentos', key: 'id'},
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
          },
         
          funcionario_id:
          {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {model: 'funcionarios', key: 'id'},
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'

          },

          created_at:
          {
            type: Sequelize.DATE,
            allowNull: false
          },

          updated_at: 
          {
            type: Sequelize.DATE,
            allowNull: false
          }
        }
      )     
    },

      down: async (queryInterface, Sequelize) => 
      {
       await queryInterface.dropTable('atendimentos_funcionarios');
      }
}
