import useSWR from 'swr'
import axios from 'axios'
import fetcher from '@/_services/fetcher'

export default function useUser() {
  const { data, error, mutate } = useSWR('/api/my/profile', fetcher)

  const apiSignup = (values) => (new Promise((resolve, reject) => {
    axios({
      method: 'POST',
      url: '/api/auth/email/signup',
      data: values,
      withCredentials: true
    }).then((resp) => {
      mutate(resp.data)
      resolve(resp)
    }).catch((err) => {
      reject(err)
    })
  }))

  const apiLogin = (values) => (new Promise((resolve, reject) => {
    axios({
      method: 'POST',
      url: '/api/auth/email/login',
      data: values,
      withCredentials: true
    }).then((resp) => {
      mutate(resp.data)
      resolve(resp)
    }).catch((err) => {
      reject(err)
    })
  }))
  const apiLogout = () => (new Promise((resolve, reject) => {
    axios({
      method: 'DELETE',
      url: '/api/auth/logout',
      withCredentials: true
    }).then((resp) => {
      resolve(resp)
      mutate(null)
    }).catch((err) => {
      reject(err)
    })
  }))

  return {
    user: data?.user || null,
    isLoading: !error && !data,
    isError: error,
    errorMessage: error?.response?.data?.message,
    apiSignup,
    apiLogin,
    apiLogout
  }
}
