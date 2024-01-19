import { useEffect, useState } from "react";
import { Athlete } from "../models/AthleteModel";
import { getAthleteAsync, getUserAuthorizationUrl } from "../services/stravaService.ts";
import { useStravaStore } from "../store/strava.ts";

type returnUseAthlete = {
  athlete: Athlete, 
  error: string
}

export function useAthlete () : returnUseAthlete {

  const [athlete, setAthlete] = useState<Athlete>()
  const [errorMessage, setErrorMessage] = useState<string>('')
  const tokenStr = useStravaStore(state => state.token)

  useEffect(() => {
    getAthleteAsync(tokenStr).then(
      result => {
        result.ok ? setAthlete(result.value) : setErrorMessage(result.message)
      }
    )
  }, [tokenStr])

  return {athlete, error: errorMessage}
}



