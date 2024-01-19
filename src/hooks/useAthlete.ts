import { useEffect, useState } from "react";
import { Athlete } from "../models/AthleteModel";
import { getAthleteAsync, getUserAuthorizationUrl } from "../services/stravaService.ts";

type returnUseAthlete = {
  athlete: Athlete, 
  error: string
}

export function useAthlete () : returnUseAthlete {

  const [athlete, setAthlete] = useState<Athlete>()
  const [errorMessage, setErrorMessage] = useState<string>('')

  useEffect(() => {
    const url = getUserAuthorizationUrl()
    console.log(url)
    getAthleteAsync().then(
      result => {
        result.ok ? setAthlete(result.value) : setErrorMessage(result.message)
      }
    )
  }, [])

  return {athlete, error: errorMessage}
}



