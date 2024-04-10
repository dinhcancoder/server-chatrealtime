'use strict'
/** @type {import('sequelize-cli').Migration} */
const { hashSync, genSaltSync } = require('bcryptjs')
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Users',
      [
        {
          user_id: 'lp322c73-f703-4b16-847d-f61bae053p9i',
          first_name: 'Dev',
          last_name: 'Member',
          email: 'member@gmail.com',
          phone_number: '0358195311',
          password: hashSync('123456', genSaltSync(10)),
          avatar: 'https://www.vietnamworks.com/hrinsider/wp-content/uploads/2023/12/anh-den-ngau.jpeg',
          role_id: 'bcb8d4a3-1a97-474d-bd1e-1d775e75fjpe'
        },
        {
          user_id: 'afa22c73-f703-4b16-847d-f61bae0534b2',
          first_name: 'Dev',
          last_name: 'Admin',
          email: 'admin@gmail.com',
          phone_number: '0362589022',
          password: hashSync('123456', genSaltSync(10)),
          avatar: 'https://cdn.sforum.vn/sforum/wp-content/uploads/2023/10/anh-avatar-facebook-92.jpg',
          role_id: 'bcb8d4a3-1a97-474d-bd1e-1d775e75fp0a'
        },
        {
          user_id: 'msl22c73-f703-4b16-847d-f61bae053p91',
          first_name: 'Luffy',
          last_name: 'Monkey D',
          email: 'luffy@gmail.com',
          phone_number: '0362589022',
          password: hashSync('123456', genSaltSync(10)),
          avatar: 'https://gcs.tripi.vn/public-tripi/tripi-feed/img/474095UzM/anh-luffy-cuoi-dep_093856732.jpg',
          role_id: 'bcb8d4a3-1a97-474d-bd1e-1d775e75fjpe'
        }
      ],
      {}
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {})
  }
}
