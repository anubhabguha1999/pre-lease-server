const { sequelize } = require('../config/dbConnection');
const User = require('./user');
const Permission = require('./permission');
const UserRole = require('./userRole');
const Token = require('./token');

// Define associations

// User ↔ UserRole
User.hasMany(UserRole, {
  foreignKey: 'user_id',
  as: 'roles',
});

UserRole.belongsTo(User, {
  foreignKey: 'user_id',
  as: 'user',
});

// User ↔ Token
User.hasMany(Token, {
  foreignKey: 'userId',
  as: 'tokens',
});

Token.belongsTo(User, {
  foreignKey: 'userId',
  targetKey: 'userId',
  as: 'user',
});

module.exports = {
  sequelize,
  User,
  Permission,
  UserRole,
  Token,
};
