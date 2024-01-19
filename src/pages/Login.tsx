import { useStravaUrl } from '../hooks/useStravaUrl'
import { useStravaStore } from '../store/strava'
import './Login.css'

export function Login () {
  const { userAuthorizationUrl } = useStravaUrl()

  const pruebasEstado = useStravaStore(state => state.test)

  return (
    <>
      <hgroup>
        <h1>Usuario no registrado</h1>
      </hgroup>
      <div className='login-container'>
        <a className='button-login' href={userAuthorizationUrl}>
          Login With Strava
        </a>
        <p>{pruebasEstado}</p>
      </div>
    </>
  )
}