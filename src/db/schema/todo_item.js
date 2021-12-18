const Sequelize = require('sequelize')

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('TodoItem', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    complete: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    deadline: {
      type: DataTypes.DATE,
      allowNull: true
    },
    TodoId: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'TodoItems',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: 'TodoItems_pkey',
        unique: true,
        fields: [
          { name: 'id' }
        ]
      }
    ]
  })
}