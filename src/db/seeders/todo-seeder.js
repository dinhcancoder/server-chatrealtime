'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Todos',
      [
        {
          todo_id: '874e82cd-9f56-48da-ad5d-1ea9023c0329',
          todo_name: 'Tham gia buổi định hướng tốt nghiệp',
          description: 'Chiều ngày 05/04/2024 vào lúc 4h30 tham gia buổi định hướng tốt nghiệp đến 5h.',
          completed: false,
          user_id: 'msl22c73-f703-4b16-847d-f61bae053p91'
        },
        {
          todo_id: 'be7e9120-f668-4013-ba81-d0c281c4ef0d',
          todo_name: 'Luffy bây giờ là một Yonko (Tứ Hoàng) trong One Piece..',
          description: 'Việc Luffy được đôn lên làm Tứ Hoàng thay vị trí BigMom – Kaido .',
          completed: false,
          user_id: 'msl22c73-f703-4b16-847d-f61bae053p91'
        },
        {
          todo_id: 'pal19120-f668-4013-ba81-d0c281c40p1a',
          todo_name: 'Thông tin về Roronoa Zoro',
          description: 'Roronoa Zoro, biệt danh "Thợ săn hải tặc" trong One Piece .',
          completed: false,
          user_id: 'msl22c73-f703-4b16-847d-f61bae053p91'
        }
      ],
      {}
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Todos', null, {})
  }
}
