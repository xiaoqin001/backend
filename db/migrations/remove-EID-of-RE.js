module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.removeColumn('RegisteredEvents', 'EventId');
},
down: (queryInterface, Sequelize) => {

}
}
