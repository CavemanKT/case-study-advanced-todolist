/* eslint-disable no-plusplus */
import nc from 'next-connect'
import { TodoItem } from '@/db/models'

const todoTodoItemsMultiDestroy = async (req, res) => {
  const { itemIdArr, id } = req.query
  const newArr = itemIdArr.split(',')

  for (let i = 0; i < newArr.length; i++) {
    await TodoItem.destroy({
      where: {
        id: newArr[i]
      }
    })
  }

  const todoItems = await TodoItem.findAll({
    where: {
      TodoId: id
    }
  })

  res.status(204).json({ todoItems })
}

export default nc()
  .use(todoTodoItemsMultiDestroy)
