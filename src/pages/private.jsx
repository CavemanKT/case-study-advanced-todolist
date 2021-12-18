import useUser from '@/_hooks/user'

import CompsLayout from '@/components/layouts/Layout'
import withPrivateRoute from '@/_hocs/withPrivateRoute'

function PagesPrivate() {
  const { user } = useUser()

  return (
    <CompsLayout>
      <div id="pages-private">
        <h1>Private Page</h1>
        <h2>{user?.name}</h2>
        <h2>{user?.email}</h2>
      </div>
    </CompsLayout>
  )
}

export default withPrivateRoute(PagesPrivate)
