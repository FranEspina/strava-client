import { useEffect, useState } from "react";
import { getActivitiesAsync } from "../services/stravaService.ts";
import { useStravaStore } from "../store/strava.ts";
import { StravaActivity } from "../models/StravaActivityModel.ts";
import { useNavigate } from "react-router-dom";

type returnUseActivities = {
  activities: [StravaActivity], 
  error: string
}

export function useActivities () : returnUseActivities {
  const navigate = useNavigate()
  const [activities, setActivities] = useState<[StravaActivity]>([{}])
  const [errorMessage, setErrorMessage] = useState<string>('')

  const isUserLogged = useStravaStore(state => state.isUserLogged)
  const access_token = useStravaStore(state => state.user?.strava_data.access_token)

  const storeIsAsyncTaskLoading = useStravaStore(state => state.storeIsAsyncTaskLoading)
 
  useEffect(() => {
    if (!isUserLogged || !access_token) return navigate("/home")

    storeIsAsyncTaskLoading(true)
    getActivitiesAsync(access_token).then(
      result => {
        console.log(result.value)
        result.ok ? setActivities(result.value as [StravaActivity]) : setErrorMessage(result.message)
      }).catch(error => {
        console.log(error)
        return navigate("/error")
      })
      .finally(() => storeIsAsyncTaskLoading(false))


  }, [storeIsAsyncTaskLoading, navigate, isUserLogged, access_token, setActivities])

  return {activities, error: errorMessage}
}



