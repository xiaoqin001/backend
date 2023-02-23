module.exports = {
    up: (queryInterface, Sequelize) => {
      return queryInterface.addColumn('RegisteredEvents', 'clubName',{
            type: Sequelize.STRING,
    },)
},
down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('RegisteredEvents', 'clubName');
  }
}

// module.exports = {
//   up: (queryInterface, Sequelize) => {
//       return queryInterface.removeColumn('RegisteredEvents', 'clubName');
// },
// down: (queryInterface, Sequelize) => {

// }
// }
