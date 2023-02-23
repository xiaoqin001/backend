module.exports = {
    up: (queryInterface, Sequelize) => {
      return queryInterface.addColumn('RegisteredEvents', 'eventTitle',{
            type: Sequelize.STRING,
    },)
},
down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('RegisteredEvents', 'eventTitle');
  }
}

// module.exports = {
//   up: (queryInterface, Sequelize) => {
//       return queryInterface.removeColumn('RegisteredEvents', 'eventTitle');
// },
// down: (queryInterface, Sequelize) => {

// }
// }
