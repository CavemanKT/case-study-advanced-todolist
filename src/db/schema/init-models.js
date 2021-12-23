/* eslint-disable no-underscore-dangle */
const { DataTypes } = require('sequelize')
const _AuthenticityToken = require('./authenticity_token')
const _SequelizeMetum = require('./sequelize_metum')
const _TodoItem = require('./todo_item')
const _Todo = require('./todo')
const _User = require('./user')

function initModels(sequelize) {
  const AuthenticityToken = _AuthenticityToken(sequelize, DataTypes)
  const SequelizeMetum = _SequelizeMetum(sequelize, DataTypes)
  const TodoItem = _TodoItem(sequelize, DataTypes)
  const Todo = _Todo(sequelize, DataTypes)
  const User = _User(sequelize, DataTypes)

  return {
    AuthenticityToken,
    SequelizeMetum,
    TodoItem,
    Todo,
    User
  }
}
module.exports = initModels
module.exports.initModels = initModels
module.exports.default = initModels
