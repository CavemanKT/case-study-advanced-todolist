const {
  Model
} = require('sequelize')
const TodoSchema = require('../schema/todo')

module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    static associate(models) {
      Todo.TodoItems = this.hasMany(models.TodoItem, { onDelete: 'CASCADE', hooks: true })
    }
  }
  const { tableAttributes } = TodoSchema(sequelize, DataTypes)
  Todo.init(tableAttributes, {
    sequelize,
    modelName: 'Todo'
  })
  return Todo
}
