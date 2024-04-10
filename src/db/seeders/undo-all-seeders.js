'use strict'
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {},
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {})
    await queryInterface.bulkDelete('Messages', null, {})
    await queryInterface.bulkDelete('Roles', null, {})
    await queryInterface.bulkDelete('Conversations', null, {})
    await queryInterface.bulkDelete('Todos', null, {})
  }
}
