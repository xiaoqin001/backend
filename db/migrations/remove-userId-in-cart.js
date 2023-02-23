module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.removeColumn('Carts', 'userID');
},
down: (queryInterface, Sequelize) => {

}
}
