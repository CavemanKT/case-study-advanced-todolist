import nc from 'next-connect'
import getCurrentTodo from '@/api/helpers/getCurrentTodo'

import todoItemsMoveToAnotherList from '@/api/controllers/todos/todo-items/multi-update'

export default nc()
  .use(getCurrentTodo)
  .put(todoItemsMoveToAnotherList)
