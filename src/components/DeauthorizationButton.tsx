import { useNavigate } from "react-router-dom"
import { useStravaStore } from "../store/strava"
import { Button } from "@mui/material"

export function DeauthorizationButton (props) {
  const deauthorizeStravaAccess = useStravaStore(state => state.deauthorizeStravaAccess )
  const navigate = useNavigate()
  
  const handleClick = () => {
    deauthorizeStravaAccess()
    navigate("/")
  }

  return <Button onClick={handleClick} color="error" variant={props.variant} sx={{...props.sx}}>Revocar autorización</Button>
}