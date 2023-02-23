module.exports = {
    up: (queryInterface, Sequelize) => {
      return queryInterface.addColumn('Carts', 'EventId',{
            type: Sequelize.INTEGER,
            references: {
                model: 'RegisteredEvents',
                key: 'id',
            },
            onDelete: 'cascade'
    },)
},
down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Carts', 'EventId');
  }
}
