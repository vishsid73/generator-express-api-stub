'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    console.log(Sample);
    return [
      queryInterface.bulkInsert('Sample', [
        { key: "Admin", createdAt: Date.now(), updatedAt: Date.now() },
        { key: 'Siddharth', createdAt: Date.now(), updatedAt: Date.now()},
        { key: "Lexstart", createdAt: Date.now(), updatedAt: Date.now() }
      ])
    ];
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
