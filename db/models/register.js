'use strict';
module.exports = (sequelize, DataTypes) => {
  const Register = sequelize.define('Register', {
    cartID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
    userID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    eventID: {
      type: DataTypes.INTEGER,
      allowNull: false
      // allowNull: false,
      // unique: true,
    }
  }, {});
  Register.associate = function(models) {
    // associations can be defined here
    // Register.hasOne(models.RegisteredEvent);
    // Register.hasOne(models.Event);
  };

  Register.registerEvent = async function(params) {
    const cart = params.cart;
    const user = params.user;
    const amount = params.amount;
    const event = params.event;
    const newRegister = await Register.create(
      {
        cartID: cart,
        userID: user,
        amount: amount,
        eventID: event
      }
    );
    return newRegister;
  }


  return Register;
};
