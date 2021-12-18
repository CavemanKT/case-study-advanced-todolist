import useSWR from 'swr'
import axios from 'axios'
import { useRouter } from 'next/router'

const fetcher = (url) => axios.get(url).then((res) => res.data)

export default function useTodos() {
  const router = useRouter()
  const { data, error } = useSWR('/api/todos', fetcher, {
    shouldRetryOnError: false
  })
  const createTodo = (values) => (new Promise((resolve, reject) => {
    console.log(values)
    axios({
      method: 'POST',
      url: '/api/todos',
      data: values
    }).then((resp) => {
      console.log('resp.data:', resp.data)
      resolve()
      router.push(`/all-lists/${resp.data.todo.id}`)
    }).catch(() => {
      reject()
    })
  }))

  return {
    meta: data?.meta,
    todos: data?.todos || [],
    isLoading: !error && !data,
    isError: error,
    errorMessage: error?.response?.data?.message,
    createTodo
  }
}
