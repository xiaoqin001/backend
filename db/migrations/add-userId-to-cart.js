module.exports = {
    up: (queryInterface, Sequelize) => {
      return queryInterface.addColumn('Carts', 'UserID',{
            type: Sequelize.INTEGER,
            references: {
                model: 'Users',
                key: 'id',
            },
            onDelete: 'cascade'
    },)
},
down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Carts', 'UserID');
  }
}
