import { useNavigate, useSearchParams } from "react-router-dom";
import { useStravaStore } from "../store/strava.ts";
import { useEffect } from "react";

export function StravaState () {

  const navigate = useNavigate()
  
  const storeToken = useStravaStore(state => state.storeToken)

  const [searchParms] = useSearchParams({
    code: '', 
    scope: ''
  })

  useEffect(() => {
    const token = searchParms.get('code')
    if (token){
      storeToken(token)
      navigate("/");
    }
  }, [searchParms, storeToken, navigate]);



  return <>
    <h1>Llamada de Strava</h1>
  </>

}