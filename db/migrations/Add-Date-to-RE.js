module.exports = {
    up: (queryInterface, Sequelize) => {
      return queryInterface.addColumn('RegisteredEvents', 'date',{
            type: Sequelize.STRING,
    },)
},
down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('RegisteredEvents', 'date');
  }
}

// module.exports = {
//   up: (queryInterface, Sequelize) => {
//       return queryInterface.removeColumn('RegisteredEvents', 'date');
// },
// down: (queryInterface, Sequelize) => {

// }
// }
