'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Todos', {
      todo_id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      todo_name: {
        allowNull: true,
        type: Sequelize.STRING
      },
      description: {
        allowNull: true,
        type: Sequelize.STRING
      },
      completed: {
        allowNull: true,
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      user_id: {
        allowNull: false,
        type: Sequelize.STRING,
        references: {
          model: 'Users',
          key: 'user_id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Todos')
  }
}
