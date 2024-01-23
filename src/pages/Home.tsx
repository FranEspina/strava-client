import './Home.css'
import { useStravaStore } from '../store/strava'
import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { refreshUserFromStravaAsync } from '../services/apiService.ts'
import { LoggedOptions } from '../components/LogOptions.tsx'


export function Home () {

  const firstname = useStravaStore(state => state.user?.firstname)
  const isUserLogged = useStravaStore(state => state.isUserLogged )
  const navigate = useNavigate()

  const strava_id = useStravaStore(state => state.user?.strava_id)
  const refresh_token = useStravaStore(state => state.user?.strava_data.refresh_token)
  const storeRefreshToken = useStravaStore(state => state.storeRefreshToken)
  const isAccessTokenExpired = useStravaStore(state => state.isAccessTokenExpired)

  console.log('dentro home')
  useEffect(() => {
    console.log('dentro use effect')
    if (isUserLogged) {
      if (isAccessTokenExpired()){
        console.log('token expirado')
        console.log(`antes llamada refreshUserFromStravaAsync('${strava_id}', '${refresh_token}')`)
        refreshUserFromStravaAsync(strava_id, refresh_token)
        .then(response => {
          storeRefreshToken(response)
          console.log('token refrescado')})
        .catch(error => {
          console.log(error)
          navigate("/error")
        })
      }
    }
  }, [navigate, isUserLogged, isAccessTokenExpired, storeRefreshToken, refresh_token, strava_id]);
    

  return (
    <>
      <hgroup>
        <h1>Página de inicio</h1>
        
      </hgroup>
      <div className='home-container'>
        {isUserLogged 
          ? <h2>Bienvenido {firstname}</h2>
          : <p>Para acceder inicie sesión con strava</p>
        }
      </div>

      {!isUserLogged && <Link to="/login">inicio sesión</Link>}
      {isUserLogged && <LoggedOptions sx={{mt: 10}} />}  

    </>
  )
}