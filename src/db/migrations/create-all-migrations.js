'use strict'
/** @type {import('sequelize-cli').Migration} */

const RoleMigration = require('./create-table-role')
const UserMigration = require('./create-table-user')
const MessageMigration = require('./create-table-message')
const ConversationMigration = require('./create-table-conversation')
const TodoMigration = require('./create-table-todo')

module.exports = {
  async up(queryInterface, Sequelize) {
    // Role
    await RoleMigration.up(queryInterface, Sequelize)
    // User
    await UserMigration.up(queryInterface, Sequelize)
    // Conversation
    await ConversationMigration.up(queryInterface, Sequelize)
    // Message
    await MessageMigration.up(queryInterface, Sequelize)
    // Todo
    await TodoMigration.up(queryInterface, Sequelize)
  },

  async down(queryInterface, Sequelize) {
    // Todo
    await queryInterface.dropTable('Todos')
    // Message
    await queryInterface.dropTable('Messages')
    // Conversation
    await queryInterface.dropTable('Conversations')
    // User
    await queryInterface.dropTable('Users')
    // Role
    await queryInterface.dropTable('Roles')
  }
}
