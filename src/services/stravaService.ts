import axios from "axios"
import { Athlete } from "../models/AthleteModel";


type getResultResponse = {
  ok: boolean, 
  value?: Athlete, 
  message: string
}

// TEMPORAL TOKEN VARIABLE. SIX HOUR EXPIRE. TODO MOVE TO SECRETS !!!
const tokenStr = 'ca7075e72bdd18f461aaf53e4c9384efcf41e820' 

export async function getAthleteAsync () : Promise<getResultResponse> {

  const urlAthlete = 'https://www.strava.com/api/v3/athlete'

  let result : getResultResponse = {
    message: '', 
    ok: false
  }

  try{
    const response = await axios(
      {
        method: 'get',
        url: urlAthlete,
        withCredentials: false,
        params: {
          access_token: tokenStr,
        },
      })
      
    return {
      ok: true, 
      value: response.data,
      message: ''
    }
                    
  } catch (error) {
    result = 
    {
      ok: false, 
      value: {id: 0}, 
      message: error.message, 
    }
    return result
  }
}

export function getUserAuthorizationUrl () : string  {
  const clientID = import.meta.env.VITE_STRAVA_APP_CLIENT_ID
  const redirect_uri = import.meta.env.VITE_STRAVA_URL_EXCHANGE_TOKEN
  const urlbase = `http://www.strava.com/oauth/authorize?client_id=${clientID}&response_type=code&redirect_uri=${redirect_uri}&approval_prompt=force&scope=read`
  return urlbase
}

