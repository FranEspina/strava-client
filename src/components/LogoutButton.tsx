import { useNavigate } from "react-router-dom"
import { useStravaStore } from "../store/strava"
import { Button } from "@mui/material"

export function LogoutButton (props) {
  const logOut = useStravaStore(state => state.logOut )
  const navigate = useNavigate()
  
  const logoutHandleClick = () => {
    logOut()
    navigate("/")
  }

  return <Button onClick={logoutHandleClick} variant={props.variant} sx={{...props.sx}}>Log out</Button>
}