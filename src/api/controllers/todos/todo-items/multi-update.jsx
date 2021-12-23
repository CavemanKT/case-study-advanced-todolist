/* eslint-disable no-plusplus */
import nc from 'next-connect'
import { TodoItem } from '@/db/models'

const todoTodoItemsMultiUpdate = async (req, res) => {
  const { itemIdArr, someListId } = req.query
  const newArr = itemIdArr.split(',')

  for (let i = 0; i < newArr.length; i++) {
    await TodoItem.update({ TodoId: someListId }, {
      where: {
        id: newArr[i]
      }
    })
  }

  res.status(204).json()
}

export default nc()
  .use(todoTodoItemsMultiUpdate)
