import { Button } from '@mui/material'
import { useStravaStore } from '../store/strava'
import './NavBar.css'
import { Link } from 'react-router-dom'

export function NavBar() {

  const isUserLogged = useStravaStore(state => state.isUserLogged)
  return <>
    <div className="navbar">
      <Button component={Link}  color="error"  to="/">Inicio</Button>
      {isUserLogged && <Button component={Link}  color="error" to="/activities">Actividades</Button>}
      {!isUserLogged && <Button component={Link}  color="error"  to="/login">inicio sesión</Button>}
    </div>
  </>
}