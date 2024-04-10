'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Messages', {
      message_id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      conversation_id: {
        allowNull: true,
        type: Sequelize.STRING,
        references: {
          model: 'Conversations',
          key: 'conversation_id'
        }
      },
      sender_id: {
        allowNull: true,
        type: Sequelize.STRING,
        references: {
          model: 'Users',
          key: 'user_id'
        }
      },
      receiver_id: {
        allowNull: true,
        type: Sequelize.STRING,
        references: {
          model: 'Users',
          key: 'user_id'
        }
      },
      content: {
        allowNull: true,
        type: Sequelize.TEXT
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
    await queryInterface.dropTable('Messages')
  }
}
