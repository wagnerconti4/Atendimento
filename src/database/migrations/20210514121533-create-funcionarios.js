'use strict';

module.exports = 
{
    up: async (queryInterface, Sequelize) => 
    {
      await queryInterface.createTable('funcionarios', {
          id: 
          {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
          },
          nome_funcionario:
          {
            type: Sequelize.STRING,
            allowNull: false
          },

          telefone_funcionario:
          {
            type: Sequelize.STRING,
            allowNull: false
          },

          email_funcionario:
          {
            type: Sequelize.STRING
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
       await queryInterface.dropTable('funcionarios');
      }
}
