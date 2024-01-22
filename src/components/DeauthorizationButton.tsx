import { useNavigate } from "react-router-dom"
import { useStravaStore } from "../store/strava"

export function DeauthorizationButton () {
  const deauthorizeStravaAccess = useStravaStore(state => state.deauthorizeStravaAccess )
  const navigate = useNavigate()
  
  const handleClick = () => {
    deauthorizeStravaAccess()
    navigate("/")
  }

  return <button onClick={handleClick}>Revocar autorización</button>
}