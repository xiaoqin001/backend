'use strict';
const { Validator } = require('sequelize');
const bcrypt = require('bcryptjs');
const { findDOMNode } = require('react-dom');
const { useSyncExternalStore } = require('react');


module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validator:{
        len: [4,30],
        isNotEmail(value) {
          if (Validator.isEmail(value)) {
            throw new Error('Cannot be an Email.');
          }
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      isEmail: true,
      validator:{
        len: [3,256]
      }
    },
    hashedPassword: {
      type: DataTypes.STRING,
      allowNull: false,
      validator:{
        len: [60, 60]
      }
    },
    cartID: {
      type: DataTypes.INTEGER,
      // allowNull: false,
      unique: true,
    },
  }, {
    defualtScope: {
      attributes:{
        exclude: ['hashedPassword', 'updatedAt', 'email', 'createdAt']
      }
    },
    scopes: {
      currentUser: {
        attributes:{
          exclude: ['hashedPassword']
        }
      },
      loginUser: {
        attributes:{}
      }
    }
  });

  User.associate = function(models) {
    // associations can be defined here
    User.hasOne(models.Cart);
    // User.hasMany(models.RegisteredEvent);
    // User.belongsToMany(
    //   models.Event,
    //   { through: models.Register }
    // );
  };

  // Authentication Flow
  // User Model Methods

  // instance method
  User.prototype.toSafeObject = function() {
    const {id, username, email} = this;
    return {id, username, email};
  }


  User.prototype.validatePassword = function (password) {
    return bcrypt.compareSync(password, this.hashedPassword.toString());
  }

  // static method
  User.getCurrentUserById = async function(id) {
    return await User.scope('currentUser').findByPk(id);
  }

  User.login = async function({ credential, password }) {
    const { Op } = require('sequelize');
    const user = await User.scope('loginUser').findOne({
      where: {
        [Op.or]: {
          username: credential,
          email: credential
        }
      }
    });
    if (user && user.validatePassword(password)) {
      return await User.scope('currentUser').findByPk(user.id)
    }
  }

  User.signup = async function({ username, email, password }) {
    const hashedPassword = bcrypt.hashSync(password)
    const user = await User.create({
      username,
      email,
      hashedPassword
    })
    const cart = await user.createCart({UserID: user.id});
    // user.addCart(cart);
    user.cartID = cart.id
    return await User.scope('currentUser').findByPk(user.id)
  }
  return User;
};
