module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.removeColumn('RegisteredEvents', 'RegisteredEventId');
},
down: (queryInterface, Sequelize) => {

}
}
