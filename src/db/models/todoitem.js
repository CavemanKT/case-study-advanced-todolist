const {
  Model
} = require('sequelize')
const TodoItemSchema = require('../schema/todo_item')

module.exports = (sequelize, DataTypes) => {
  class TodoItem extends Model {
    static associate(models) {
      TodoItem.Todo = this.belongsTo(models.Todo)
    }
  }
  const { tableAttributes } = TodoItemSchema(sequelize, DataTypes)
  TodoItem.init(tableAttributes, {
    sequelize,
    modelName: 'TodoItem'
  })
  return TodoItem
}
