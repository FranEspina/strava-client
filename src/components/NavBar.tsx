import './NavBar.css'
import { Link } from 'react-router-dom'

export function NavBar() {
  return <>
    <div className="navbar">
      <Link to="/">Inicio</Link>
      <Link to="/activities">Actividades</Link>
      <Link to="/about">Acerca de</Link>
    </div>
  </>
}