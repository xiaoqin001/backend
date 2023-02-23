module.exports = {
    up: (queryInterface, Sequelize) => {
      return queryInterface.addColumn('RegisteredEvents', 'EventId',{
            type: Sequelize.INTEGER,
    },)
},
down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('RegisteredEvents', 'EventId');
  }
}
