/* eslint-disable func-names */
module.exports = function (sequelize, DataTypes) {
  return sequelize.define('Todo', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Todos',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: 'Todos_pkey',
        unique: true,
        fields: [
          { name: 'id' }
        ]
      }
    ]
  })
}
