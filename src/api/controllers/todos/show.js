import nc from 'next-connect'

import moment from 'moment'
import { TodoItem } from '@/db/models'

const todosShow = (req, res) => {
  const { currentTodo } = res

  console.log(currentTodo?.TodoItems[0]?.deadline, Date.now())

  for (let i = 0; i < currentTodo.TodoItems.length; i++) {
    if (!currentTodo?.TodoItems[i]?.overdue) {
      const { deadline } = currentTodo.TodoItems[i]
      const date = deadline.split('T')[0]
      const dateWithoutDash = date.split('-', 3).join('')
      console.log('dateWithoutDash', dateWithoutDash)
      const time = deadline.split('T')[1].split('+')[0]
      console.log('time', time)
      const timeWithoutColon = time.split(':', 3).join('')
      console.log('timeWithoutColon', timeWithoutColon)
      const datetime = dateWithoutDash + timeWithoutColon
      console.log('datetime', datetime)
      const datetimeDifference = moment(datetime, 'YYYYMMDDhmmss').fromNow()
      console.log('datetimeDifference', datetimeDifference)
      if (datetimeDifference.includes('ago')) {
        TodoItem.update({ overdue: true }, {
          where: {
            id: currentTodo.TodoItems[i].id
          }
        })
      }
    } else {
      const { deadline } = currentTodo.TodoItems[i]
      const date = deadline.split('T')[0]
      const dateWithoutDash = date.split('-', 3).join('')
      console.log('dateWithoutDash', dateWithoutDash)
      const time = deadline.split('T')[1].split('+')[0]
      console.log('time', time)
      const timeWithoutColon = time.split(':', 3).join('')
      console.log('timeWithoutColon', timeWithoutColon)
      const datetime = dateWithoutDash + timeWithoutColon
      console.log('datetime', datetime)
      const datetimeDifference = moment(datetime, 'YYYYMMDDhmmss').fromNow()
      console.log('datetimeDifference', datetimeDifference)
      if (!datetimeDifference.includes('ago')) {
        TodoItem.update({ overdue: false }, {
          where: {
            id: currentTodo.TodoItems[i].id
          }
        })
      }
    }
  }

  res.status(200).json({ todo: currentTodo })
}

export default nc()
  .use(todosShow)
