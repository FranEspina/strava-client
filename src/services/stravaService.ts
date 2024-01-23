import axios from "axios"
import { Athlete } from "../models/AthleteModel";
import { StravaActivity } from "../models/StravaActivityModel";

type getResultResponse<T> = {
  ok: boolean, 
  value?: T, 
  message: string
}

export async function getAthleteAsync (tokenStr: string) : Promise<getResultResponse<Athlete>> {

  const urlApiStrava = 'https://www.strava.com/api/v3/athlete'

  let result : getResultResponse<Athlete> = {
    message: '', 
    ok: false
  }

  try{
    const response = await axios(
      {
        method: 'get',
        url: urlApiStrava,
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
    let message
    if (error instanceof Error) message = error.message
    else message = String(error)

    result = 
    {
      ok: false, 
      value: {id: 0}, 
      message: message, 
    }
    return result
  }
}

export function getUserAuthorizationUrl () : string  {
  const clientID = import.meta.env.VITE_STRAVA_APP_CLIENT_ID
  const redirect_uri = import.meta.env.VITE_STRAVA_URL_EXCHANGE_TOKEN
  const scopes = 'read_all,activity:read_all'
  const urlbase = `http://www.strava.com/oauth/authorize?client_id=${clientID}&response_type=code&redirect_uri=${redirect_uri}&approval_prompt=force&scope=${scopes}`
  return urlbase
}

export async function deauthorizeStravaAsync (tokenStr: string) : Promise<getResultResponse<string>> {
  const urlApiStrava = 'https://www.strava.com/oauth/deauthorize'
  const clientID = import.meta.env.VITE_STRAVA_APP_CLIENT_ID
  const result : getResultResponse<string> = {
    ok: false,
    value: '', 
    message: '' 
  }

  try{
    const response = await axios(
      {
        method: 'post',
        url: urlApiStrava,
        withCredentials: false,
        params: {
          client_id: clientID, 
          access_token: tokenStr
        },
      })
      
    return {
      ok: true, 
      value: response.data,
      message: ''
    }
                    
  } catch (error) {
    let message
    if (error instanceof Error) message = error.message
    else message = String(error)
    result.message = message
    return result
  }
}

export async function getActivitiesAsync({tokenStr, page, perPage}: {tokenStr: string, page: number, perPage: number}) : Promise<getResultResponse<Array<StravaActivity>>> {
  
  const urlApiStrava = 'https://www.strava.com/api/v3/athlete/activities'
  
  const result : getResultResponse<Array<StravaActivity>> = {
    message: '', 
    value: [], 
    ok: false
  }

  try{
    const response = await axios(
      {
        method: 'get',
        url: urlApiStrava,
        withCredentials: false,
        params: {
          access_token: tokenStr,
          page: page, 
          per_page: perPage, 
        },
      })
      
    return {
      ok: true, 
      value: response.data,
      message: ''
    }
                    
  } catch (error) {
    let message
    if (error instanceof Error) message = error.message
    else message = String(error)
    result.message = message
    return result
  }
}

export async function getActivityAsync (tokenStr: string, id: string) : Promise<getResultResponse<StravaActivity>> {

  const urlApiStrava = `https://www.strava.com/api/v3/activities/${id}`

  let result : getResultResponse<StravaActivity> = {
    message: '', 
    ok: false
  }

  try{
    const response = await axios(
      {
        method: 'get',
        url: urlApiStrava,
        withCredentials: false,
        params: {
          access_token: tokenStr,
        },
      })

      console.log(response)

      return {
        ok: true, 
        value: response.data,
        message: ''
      }

                          
  } catch (error) {
    let message
    if (error instanceof Error) message = error.message
    else message = String(error)

    console.log(message)

    result = 
    {
      ok: false, 
      value: {id: 0}, 
      message: message, 
    }
    return result
  }
}