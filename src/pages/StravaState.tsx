import { useNavigate, useSearchParams } from "react-router-dom";
import { useStravaStore } from "../store/strava.ts";
import { useEffect } from "react";
import { createUserFromStravaAsync } from "../services/apiService.ts";

export function StravaState () {

  const navigate = useNavigate()
  
  const storeToken = useStravaStore(state => state.storeToken)
  const storeUser = useStravaStore(state => state.storeUser)
  const storeAthlete = useStravaStore(state => state.storeAthlete)

  const [searchParms] = useSearchParams({
    code: '', 
    scope: ''
  })

  useEffect(() => {
    const token = searchParms.get('code')

    const createUser = async (token) => {
      const response = await createUserFromStravaAsync(token)
      storeUser(response.user)
      storeAthlete(response.athlete)
    }

    if (token){
      storeToken(token)
      createUser(token)
      navigate("/");
    }
  }, [searchParms, storeToken, storeUser, storeAthlete, navigate]);

  return <>
    <h1>Llamada de Strava</h1>
  </>

}