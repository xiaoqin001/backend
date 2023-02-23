'use strict';
const { Cart } = require('../../db/models');
const { User } = require('../../db/models');
const { Register } = require('../../db/models');
const { Event } = require('../../db/models');

module.exports = (sequelize, DataTypes) => {
  const RegisteredEvent = sequelize.define('RegisteredEvent', {
    cartID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    eventID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    registerID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
    eventTitle: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    clubName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {});
  RegisteredEvent.associate = function(models) {
    // associations can be defined here
    // RegisteredEvent.belongsTo(models.Cart);
    // RegisteredEvent.belongsTo(models.User);
    // RegisteredEvent.belongsTo(models.Register);
    // RegisteredEvent.belongsToMany(
    //   models.Event,
    //   { through: models.Register }
    // );
  };

  RegisteredEvent.register = async function(params) {
    const cart = params.cart;
    const user = params.user;
    const amount = params.amount;
    const event = params.event;
    const register = params.registerID;
    const title = params.eventTitle;
    const club = params.clubName;
    const location = params.location;
    const date = params.date;
    const newRegisterEvent = await RegisteredEvent.create(
      {
        cartID: cart,
        userID: user,
        amount: amount,
        eventID: event,
        registerID: register,
        EventID: event,
        eventTitle: title,
        clubName: club,
        location: location,
        date: date
      }
    );


    return newRegisterEvent;
  }

  RegisteredEvent.getRegisteredEvent = async function(cartID) {
    return await RegisteredEvent.findAll({ where: { cartID: cartID } });
  }
  RegisteredEvent.clear = async function(cartID) {
    console.log('2')
    console.log(cartID);
    const { Op } = require('sequelize');
    const re = await RegisteredEvent.destroy(
      { where:
          { cartID: { [Op.lte]: cartID } }  // specific records to delete
      }
  );

  }

  return RegisteredEvent;
};
