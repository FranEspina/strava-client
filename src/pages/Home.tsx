import { useStravaUrl } from '../hooks/useStravaUrl'
import './Home.css'

export function Home () {
  const { userAuthorizationUrl } = useStravaUrl()

  return (
    <>
      <hgroup>
        <h1>Mi perfil de Strava</h1>
      </hgroup>
      <div className='login-container'>
        <a className='button-login' href={userAuthorizationUrl}>
          Login With Strava
        </a>
      </div>
    </>
  )
}