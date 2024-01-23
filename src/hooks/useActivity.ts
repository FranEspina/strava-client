import { useEffect, useState } from "react";
import { StravaActivity } from "../models/StravaActivityModel";
import { useStravaStore } from "../store/strava";
import { useNavigate } from "react-router-dom";
import { getActivityAsync } from "../services/stravaService.ts";

export function useActivity (id: string) {
  
  const [activity, setActivity] = useState<StravaActivity>(null)
  const [errorMessage, setErrorMessage] = useState<string>('')
  const access_token = useStravaStore(state => state.user?.strava_data.access_token)
  const navigate = useNavigate()
  const storeIsAsyncTaskLoading = useStravaStore(state => state.storeIsAsyncTaskLoading)

  useEffect(() => {
    
    if (!access_token){
      console.log('Imposible recuperar token')
      return navigate("/error")
    }

    storeIsAsyncTaskLoading(true)
    getActivityAsync(access_token, id)
    .then(response => {
        if (!response.ok){
          console.log('Error recuperando actividad')
          console.log(response.message)
          return navigate("/error")
        }
        setActivity(response.value as StravaActivity)
      }
    )
    .catch((error: Error) => {
      console.log(error)
      setErrorMessage(error.message)
    })
    .finally(() => storeIsAsyncTaskLoading(false))

  }, [storeIsAsyncTaskLoading, navigate, access_token, id])

  return {activity, errorMessage}
}