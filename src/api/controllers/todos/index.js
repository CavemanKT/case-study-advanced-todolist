import nc from 'next-connect'

import { Todo } from '@/db/models'

const todosIndex = async (req, res) => {
  const todos = await Todo.findAll()

  res.status(200).json({ todos })
}

export default nc()
  .use(todosIndex)
