import useUser from '@/_hooks/user'

import CompsLayout from '@/components/layouts/Layout'
import withPrivateRoute from '@/_hocs/withPrivateRoute'

function PagesPrivate() {
  const { user } = useUser()

  return (
    <CompsLayout>
      <div id="pages-private" className="container page-container text-center mt-5">
        <div>
          <h1>Private Page</h1>
        </div>
        <div>
          <h2>{user?.name}</h2>
        </div>
        <div>
          <h2>{user?.email}</h2>
        </div>
      </div>
    </CompsLayout>
  )
}

export default withPrivateRoute(PagesPrivate)
