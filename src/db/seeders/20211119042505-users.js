/* eslint-disable no-plusplus */
const bcrypt = require('bcrypt')
const { Faker } = require('fakergem')

const { User, AuthenticityToken, Todo, TodoItem } = require('../models')

// generate a time stamp for createdAt
const genRandDay = () => {
  const randDay = Math.floor(Math.random() * 27) + 1
  return randDay
}

const genRandMonth = () => {
  const randMonth = Math.floor(Math.random() * 12) + 1
  if (randMonth > 12) {
    return genRandMonth()
  }
  return randMonth
}

const genRandYear = () => {
  const randNum = Math.floor(Math.random() * 2)
  switch (randNum) {
    case 0:
      return 2021
    case 1:
      return 2022
    default:
      return 2021
  }
}

const genRandDate = () => {
  const randDay = genRandDay()
  const randMonth = genRandMonth()
  const randYear = genRandYear()

  const randDate = `${randYear}-${randMonth}-${randDay} 13:29:29.516+08`
  return randDate
}

module.exports = {
  up: async () => {
    await User.destroy({ truncate: true })
    await AuthenticityToken.destroy({ truncate: true })
    await Todo.destroy({ truncate: true })
    await TodoItem.destroy({ truncate: true })
    const passwordHash = await bcrypt.hash('123123', 10)
    await User.create({
      name: `${Faker.Name.firstName()} ${Faker.Name.lastName()}`,
      email: '1@test.com',
      passwordHash,
      registrationType: 'email'
    })
    for (let i = 1; i <= 4; i++) {
      await Todo.create({
        name: `List ${i}`
      })
      for (let j = 1; j <= 4; j++) {
        await TodoItem.create({
          name: `Task ${j}`,
          description: Faker.Lorem.sentence(4),
          complete: false,
          deadline: genRandDate(),
          TodoId: i
        })
      }
    }
  }
}
