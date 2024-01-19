import './Home.css'
import { useStravaStore } from '../store/strava'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export function Home () {

  const navigate = useNavigate()
  const pruebasToken = useStravaStore(state => state.token)
  const isUserLogged = useStravaStore(state => state.isUserLogged )
  const logOut = useStravaStore(state => state.logOut )


  useEffect(() => {
    if (!isUserLogged) {
      navigate("/login");
    }
  }, [navigate, isUserLogged]);

  return (
    <>
      <hgroup>
        <h1>Mi perfil de Strava</h1>
        <h2>Usuario registrado</h2>
      </hgroup>
      <div className='home-container'>
        <p>{`token stoerd: ${pruebasToken}`}</p>
        <p>{`is login user: ${isUserLogged}`}</p>
        <button onClick={() => logOut()}>Log out</button>
      </div>
    </>
  )
}