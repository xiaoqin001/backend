module.exports = {
    up: (queryInterface, Sequelize) => {
      return queryInterface.addColumn('RegisteredEvents', 'RegisteredEventId',{
            type: Sequelize.INTEGER,
    },)
},
down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('RegisteredEvents', 'RegisteredEventId');
  }
}
