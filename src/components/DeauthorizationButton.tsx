import { useNavigate } from "react-router-dom"
import { useStravaStore } from "../store/strava"
import { Button, SxProps } from "@mui/material"
interface LoggedOptionsProps {
  sx?: SxProps
  variant: any
}

export function DeauthorizationButton (props: LoggedOptionsProps) {
  const deauthorizeStravaAccess = useStravaStore(state => state.deauthorizeStravaAccess )
  const navigate = useNavigate()
  
  const handleClick = () => {
    deauthorizeStravaAccess()
    navigate("/")
  }

  return <Button onClick={handleClick} color="error" variant={props.variant} sx={{...props.sx}}>Revocar autorización</Button>
}