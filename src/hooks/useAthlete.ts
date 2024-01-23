import { useEffect, useState } from "react";
import { Athlete } from "../models/AthleteModel";
import { getAthleteAsync } from "../services/stravaService.ts";
import { useStravaStore } from "../store/strava.ts";

type returnUseAthlete = {
  athlete: Athlete, 
  error: string
}

export function useAthlete () : returnUseAthlete {
  const [athlete, setAthlete] = useState<Athlete>({id: 0})
  const [errorMessage, setErrorMessage] = useState<string>('')
  const access_token = useStravaStore(state => state.user?.strava_data?.access_token)
  const athleteStored = useStravaStore(state => state.athlete)
 
  useEffect(() => {
    if (!access_token) return
     
    if (athleteStored){
      setAthlete(athleteStored) 
    }
    else{
      getAthleteAsync(access_token)
      .then(
        result => {
          console.log(result.value) 
          if (result.ok) {
            setAthlete(result.value as Athlete)
          } else {
            setErrorMessage(result.message)
          }
        }
      ).catch(error => {
        console.log(error)
        setErrorMessage(error.message)
      })
    }
  }, [access_token, athleteStored])

  return {athlete, error: errorMessage}
}



