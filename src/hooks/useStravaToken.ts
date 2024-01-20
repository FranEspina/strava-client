import { useStravaStore } from "../store/strava";

export function useStravaAccessToken () {
  const isAccessTokenExpired = useStravaStore(state => state.isAccessTokenExpired)
  
  const expired = isAccessTokenExpired()
  if (!expired) {
    return useStravaStore(state => state.user?.strava_data.access_token)
  } 



}