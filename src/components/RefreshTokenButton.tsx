import { Button, SxProps } from "@mui/material";
import { refreshUserFromStravaAsync } from "../services/apiService.ts";
import { useStravaStore } from "../store/strava.ts";
import { useNavigate } from "react-router-dom";


interface LoggedOptionsProps {
  sx?: SxProps
  variant: any
}

export function RefreshTokenButton (props: LoggedOptionsProps) {
  
  const storeRefreshToken = useStravaStore(state => state.storeRefreshToken)
  const strava_id = useStravaStore(state => state.user?.strava_id)
  const refresh_token = useStravaStore(state => state.user?.strava_data.refresh_token)
  const navigate = useNavigate()

  const handleRefreshClick = () => {

    if (!strava_id) {
      console.log('Se esperaba un id de strava');
      return navigate("/error")
    }

    if (!refresh_token) {
      console.log('Se esperaba un token para refrescar');
      return navigate("/error")
    }

    refreshUserFromStravaAsync(strava_id, refresh_token)
    .then(response => {
      console.log(response)
      storeRefreshToken(response.user.strava_data)
      console.log('token refrescado')})
    .catch(error => {
      console.log(error);
      navigate("/error")
    })
 }

  return <Button onClick={handleRefreshClick}  variant={props.variant} sx={{...props.sx}}>Refrescar Strava Token</Button>
}