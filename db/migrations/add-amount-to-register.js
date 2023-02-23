module.exports = {
    up: (queryInterface, Sequelize) => {
      return queryInterface.addColumn('Registers', 'amount',{
            type: Sequelize.INTEGER,
    },)
},
down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Registers', 'amount');
  }
}
