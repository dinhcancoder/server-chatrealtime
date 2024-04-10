'use strict'
/** @type {import('sequelize-cli').Migration} */

const RoleSeeder = require('./role-seeder')
const UserSeeder = require('./user-seeder')
const TodoSeeder = require('./todo-seeder')

module.exports = {
  async up(queryInterface, Sequelize) {
    await RoleSeeder.up(queryInterface, Sequelize)
    await UserSeeder.up(queryInterface, Sequelize)
    await TodoSeeder.up(queryInterface, Sequelize)
  },

  async down(queryInterface, Sequelize) {}
}
