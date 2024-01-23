import { Button } from '@mui/material'
import { useStravaStore } from '../store/strava'
import './NavBar.css'
import { Link } from 'react-router-dom'

export function NavBar() {

  const isUserLogged = useStravaStore(state => state.isUserLogged)
  return <>
    <div className="navbar">
      <Button component={Link} to="/">Inicio</Button>
      <Button component={Link} to="/activities">Actividades</Button>
      {!isUserLogged && <Button component={Link} to="/login">inicio sesión</Button>}
    </div>
  </>
}