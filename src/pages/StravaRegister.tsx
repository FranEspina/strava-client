import { useNavigate, useSearchParams } from "react-router-dom";
import { useStravaStore } from "../store/strava.ts";
import { useEffect, useState } from "react";
import { createUserFromStravaAsync } from "../services/apiService.ts";
import './StravaRegister.css'
import { Loading } from "../components/Loading.tsx";

export function StravaRegister () {

  const navigate = useNavigate()
  const storeIsAsyncTaskLoading = useStravaStore(state => state.storeIsAsyncTaskLoading)
  const isAsyncTaskLoading = useStravaStore(state => state.isAsyncTaskLoading)
  
  const storeUser = useStravaStore(state => state.storeUser)
  const storeAthlete = useStravaStore(state => state.storeAthlete)

  const [searchParms] = useSearchParams({
    code: '', 
    scope: '', 
    error:''
  })

  useEffect(() => {

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
      storeIsAsyncTaskLoading(true)
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
    .finally(() => storeIsAsyncTaskLoading(false))

  }, [storeIsAsyncTaskLoading, searchParms, storeUser, storeAthlete, navigate]);

  return <header>
    <h1>Recibida autorización de Strava</h1>
    {isAsyncTaskLoading && <h2>Guardando datos ...</h2> }
    {isAsyncTaskLoading && <p>Espere por favor</p>}
    <Loading />

  </header>

}