'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Conversations', {
      conversation_id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      participant_one: {
        allowNull: true,
        type: Sequelize.STRING,
        references: {
          model: 'Users',
          key: 'user_id'
        }
      },
      participant_two: {
        allowNull: true,
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
    await queryInterface.dropTable('Conversations')
  }
}
