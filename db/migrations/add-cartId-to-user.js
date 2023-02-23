module.exports = {
    up: (queryInterface, Sequelize) => {
      return queryInterface.addColumn('Users', 'cartID',{
            type: Sequelize.INTEGER,
            references: {
                model: 'Carts',
                key: 'id',
            },
            onDelete: 'cascade'
    },)
},
down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Users', 'cartID');
  }
}
