import { useNavigate } from "react-router-dom"
import { useStravaStore } from "../store/strava"
import { Button, SxProps } from "@mui/material"


interface LoggedOptionsProps {
  sx?: SxProps
  variant: any
}

export function LogoutButton (props: LoggedOptionsProps) {
  const logOut = useStravaStore(state => state.logOut )
  const navigate = useNavigate()
  
  const logoutHandleClick = () => {
    logOut()
    navigate("/")
  }

  return <Button onClick={logoutHandleClick} variant={props.variant} sx={{...props.sx}}>Log out</Button>
}