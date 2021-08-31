import { useContext, useEffect } from "react"
import { Can } from "../components/Can"
import { AuthContext } from "../contexts/AuthContext"
import { userCan } from "../hooks/userCan"
import { setupAPIClient } from "../services/api"
import { api } from "../services/apiClient"
import { withSSRAuth } from "../utils/withSSRAuth"

export default function Dashboard() {
  const { user, signOut } = useContext(AuthContext)

  const userCanSeeMetrics = userCan({
    permissions: ['metrics.list']
  })

  useEffect(() => {
    api.get('/me').then(response => console.log(response)).catch(err => console.log(err))
  }, [])

  return (
    <>
      <h1>Dashboard {user?.email}</h1>
      <button onClick={signOut}>
        signOut
      </button>
      <Can permissions={['metrics.list']}>
        <h1>Metrics</h1>
      </Can>
      {userCanSeeMetrics && <div>Metrics </div>}
    </>
  )
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  const apiClient = setupAPIClient(ctx)
  const response = await apiClient.get('/me')

  console.log(response)

  return {
    props: {}
  }
})