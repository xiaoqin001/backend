module.exports = {
    up: (queryInterface, Sequelize) => {
      return queryInterface.addColumn('RegisteredEvents', 'location',{
            type: Sequelize.STRING,
    },)
},
down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('RegisteredEvents', 'location');
  }
}


// module.exports = {
//   up: (queryInterface, Sequelize) => {
//       return queryInterface.removeColumn('RegisteredEvents', 'location');
// },
// down: (queryInterface, Sequelize) => {

// }
// }
