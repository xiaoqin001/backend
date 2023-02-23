module.exports = {
    up: (queryInterface, Sequelize) => {
      return queryInterface.addColumn('Registers', 'eventID',{
            type: Sequelize.INTEGER,
    },)
},
down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Registers', 'eventID');
  }
}
