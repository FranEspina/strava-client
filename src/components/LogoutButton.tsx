import { useNavigate } from "react-router-dom"
import { useStravaStore } from "../store/strava"

export function LogoutButton () {
  const logOut = useStravaStore(state => state.logOut )
  const navigate = useNavigate()
  
  const logoutHandleClick = () => {
    logOut()
    navigate("/")
  }

  return <button onClick={logoutHandleClick}>Log out</button>
}