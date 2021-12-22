const bcrypt = require('bcrypt')

const { User, AuthenticityToken, Todo, TodoItem } = require('../models')

module.exports = {
  up: async () => {
    await User.destroy({ truncate: true })
    await AuthenticityToken.destroy({ truncate: true })
    await Todo.destroy({ truncate: true })
    await TodoItem.destroy({ truncate: true })
    const passwordHash = await bcrypt.hash('123456', 10)
    await User.create({
      name: 'Tester',
      email: '1@test.com',
      passwordHash
    })
  }
}
