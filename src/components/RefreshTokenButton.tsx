import { Button } from "@mui/material";
import { refreshUserFromStravaAsync } from "../services/apiService.ts";
import { useStravaStore } from "../store/strava.ts";
import { useNavigate } from "react-router-dom";


export function RefreshTokenButton ({force: boolean}) {
  
  const storeRefreshToken = useStravaStore(state => state.storeRefreshToken)
  const strava_id = useStravaStore(state => state.user?.strava_id)
  const refresh_token = useStravaStore(state => state.user?.strava_data.refresh_token)
  const navigate = useNavigate()

  const handleRefreshClick = () => {
    try
    {
      refreshUserFromStravaAsync(strava_id, refresh_token)
      .then(response => {
        storeRefreshToken(response.strava_data)
        console.log('token refrescado')})
    }
    catch (error) {
      console.log(error);
      navigate("/error")
    }
  }

  return <Button onClick={handleRefreshClick}>Refrescar Strava Token</Button>
}