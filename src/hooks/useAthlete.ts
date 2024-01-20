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
 
  useEffect(() => {
    if (!user) return 
    getAthleteAsync(user.strava_data.access_token).then(
      result => {
        console.log(result.value)
        result.ok ? setAthlete(result.value) : setErrorMessage(result.message)
      }
    )
  }, [user])

  return {athlete, error: errorMessage}
}



