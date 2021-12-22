import nc from 'next-connect'
import moment from 'moment'
import { TodoItem } from '@/db/models'

const fs = require('fs')

const todosShow = async (req, res) => {
  const { currentTodo } = res

  console.log('currentMoment:', Date.now())

  for (let i = 0; i < currentTodo.TodoItems.length; i++) {
    if (!currentTodo?.TodoItems[i]?.overdue) {
      const { deadline } = currentTodo.TodoItems[i]
      const date = deadline.split('T')[0]
      const dateWithoutDash = date.split('-', 3).join('')
      const time = deadline.split('T')[1].split('+')[0]
      const timeWithoutColon = time.split(':', 3).join('')
      const datetime = dateWithoutDash + timeWithoutColon
      const datetimeDifference = moment(datetime, 'YYYYMMDDhmmss').fromNow()
      if (datetimeDifference.includes('ago')) {
        if (currentTodo?.TodoItems[i].overdue === false) {
          await TodoItem.update({ overdue: true }, {
            where: {
              id: currentTodo.TodoItems[i].id
            }
          })
          // send email at this point
          process.stdout.write('Send email when today meets the deadline')
          const data = 'Here is the email template'
          // change the file path before you test please
          fs.writeFile('/home/caveman/Desktop/output.txt', data, (err) => {
            if (err) throw err
          })
        }
      }
    } else {
      const { deadline } = currentTodo.TodoItems[i]
      const date = deadline.split('T')[0]
      const dateWithoutDash = date.split('-', 3).join('')
      const time = deadline.split('T')[1].split('+')[0]
      const timeWithoutColon = time.split(':', 3).join('')
      const datetime = dateWithoutDash + timeWithoutColon
      const datetimeDifference = moment(datetime, 'YYYYMMDDhmmss').fromNow()
      if (!datetimeDifference.includes('ago')) {
        await TodoItem.update({ overdue: false }, {
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
