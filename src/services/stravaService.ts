import axios from "axios"
import { Athlete } from "../models/AthleteModel";


type getResultResponse = {
  ok: boolean, 
  value?: Athlete, 
  message: string
}

export async function getAthleteAsync (tokenStr: string) : Promise<getResultResponse> {

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
  const scopes = 'read,activity:read'
  const urlbase = `http://www.strava.com/oauth/authorize?client_id=${clientID}&response_type=code&redirect_uri=${redirect_uri}&approval_prompt=force&scope=${scopes}`
  return urlbase
}

