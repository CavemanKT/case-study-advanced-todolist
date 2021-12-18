import Layout from './layouts/Layout'

export default function CompsError({ message }) {
  return (
    <Layout>
      <div className="text-center">
        {message}
      </div>
    </Layout>
  )
}
