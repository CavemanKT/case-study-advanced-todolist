import nc from 'next-connect'

import getCurrentTodo from '@/api/helpers/getCurrentTodo'

import todosShow from '@/api/controllers/todos/show'
import todosUpdate from '@/api/controllers/todos/update'
import todosDestroy from '@/api/controllers/todos/destroy'

export default nc()
  .use(getCurrentTodo)
  .get(todosShow)
  .put(todosUpdate)
  .delete(todosDestroy)
