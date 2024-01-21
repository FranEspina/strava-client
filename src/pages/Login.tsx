import { useStravaUrl } from '../hooks/useStravaUrl.ts'
import './Login.css'

export function Login () {
  const { userAuthorizationUrl } = useStravaUrl()

  
  return (
    <>
      <hgroup>
        <h1>Usuario no registrado</h1>
      </hgroup>
      <div className='login-container'>
        <a className='button-login' href={userAuthorizationUrl}>
          Login With Strava
        </a>
      </div>
    </>
  )
}