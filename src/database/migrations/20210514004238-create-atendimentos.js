'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
     await queryInterface.createTable('atendimentos', {
          id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
          },
          status: {
            type: Sequelize.STRING
          },
          nome_cliente: {
            type: Sequelize.STRING,
            allowNull: false
          },
          nome_empresa: {
            type: Sequelize.STRING,
            allowNull: false
          },
          telefone_cliente: {
            type: Sequelize.STRING,
            allowNull: false
          },
          problema_cliente: {
            type: Sequelize.TEXT,
            allowNull: false
          },
          endereco_cliente_rua: {
            type: Sequelize.TEXT
          },
          endereco_cliente_numero: {
            type: Sequelize.INTEGER
          },
          endereco_cliente_complemento: {
            type: Sequelize.TEXT
          },
          created_at: {
            type: Sequelize.DATE,
            allowNull: false
          },
          updated_at: {
            type: Sequelize.DATE,
            allowNull: false
          }
        }
      )
     },

    down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('atendimentos');
     
  }
};
