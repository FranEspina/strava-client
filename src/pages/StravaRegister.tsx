import { useNavigate, useSearchParams } from "react-router-dom";
import { useStravaStore } from "../store/strava.ts";
import { useEffect, useState } from "react";
import { createUserFromStravaAsync } from "../services/apiService.ts";
import { Box, CircularProgress } from "@mui/material";
import './StravaRegister.css'

export function StravaRegister () {

  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  
  const storeUser = useStravaStore(state => state.storeUser)
  const storeAthlete = useStravaStore(state => state.storeAthlete)

  const [searchParms] = useSearchParams({
    code: '', 
    scope: '', 
    error:''
  })

  useEffect(() => {

    setLoading(true)

    const authorizationError  = searchParms.get('error')
    if (authorizationError) {
      console.log(`error authorization strava: ${authorizationError}`)
      return navigate("/error");
    }
    
    const token = searchParms.get('code') 
    if (!token)
    {
      console.log(`error authorization strava. Token no encontrado`)
      return navigate("/error");
    }

    const createUser = async (token: string) => {
      const response = await createUserFromStravaAsync(token)
      storeUser(response.user)
      storeAthlete(response.athlete)
    }
    
    createUser(token).then(
      () => navigate("/")
    )
    .catch(error => {
      console.log(`Error creando usuario: ${error}`)
      return navigate("/error")
    })
    .finally(() => setLoading(false))

  }, [searchParms, storeUser, storeAthlete, navigate]);

  return <header>
    <h1>Recibida autorización de Strava</h1>
    {loading && <h2>Guardando datos ...</h2> }
    {loading && <p>Espere por favor</p>}
    {loading ? 
      <Box> 
        <CircularProgress />
      </Box> 
      : null
    }

  </header>

}