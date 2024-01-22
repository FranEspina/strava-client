import { useStravaStore } from '../store/strava'
import './NavBar.css'
import { Link } from 'react-router-dom'

export function NavBar() {

  const isUserLogged = useStravaStore(state => state.isUserLogged)
  return <>
    <div className="navbar">
      <Link to="/">Inicio</Link>
      <Link to="/activities">Actividades</Link>
      <Link to="/about">Acerca de</Link>
      {!isUserLogged && <Link to="/login">inicio sesión</Link>}
    </div>
  </>
}