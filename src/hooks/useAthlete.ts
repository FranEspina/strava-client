import { useEffect, useState } from "react";
import { Athlete } from "../models/AthleteModel";
import { getAthleteAsync } from "../services/stravaService.ts";
import { useStravaStore } from "../store/strava.ts";

type returnUseAthlete = {
  athlete: Athlete, 
  error: string
}

export function useAthlete () : returnUseAthlete {
  const [athlete, setAthlete] = useState<Athlete>()
  const [errorMessage, setErrorMessage] = useState<string>('')

  const user = useStravaStore(state => state.user)
  const athleteStored = useStravaStore(state => state.athlete)
 
  useEffect(() => {
    if (!user) return 
    if (athleteStored){
      setAthlete(athleteStored) 
    }
    else{
      getAthleteAsync(user.strava_data.access_token).then(
        result => {
          console.log(result.value)
          result.ok ? setAthlete(result.value) : setErrorMessage(result.message)
        }
      )
    }
  }, [user, athleteStored])

  return {athlete, error: errorMessage}
}



