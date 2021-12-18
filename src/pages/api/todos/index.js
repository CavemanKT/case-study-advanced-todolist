import nc from 'next-connect'

import todosIndex from '@/api/controllers/todos/index'
import todosCreate from '@/api/controllers/todos/create'

export default nc()
  .get(todosIndex)
  .post(todosCreate)
