import axios from "axios";

export async function createUserFromStravaAsync (token: string) {
  const apiurl = import.meta.env.VITE_API_CREATE_USER_FROM_STRAVA_LOGIN
  try{
    const response = await axios(
      {
        method: 'post',
        url: apiurl,
        withCredentials: false,
        data: {authorization_code: token}, 
      })
      return response.data
  }
  catch (error) 
  {
    console.log(error)
  }
}

export async function refreshUserFromStravaAsync (strava_id: number, refresh_token: string) {
  const apiurl = import.meta.env.VITE_API_CREATE_USER_FROM_STRAVA_LOGIN
  try{
    const response = await axios(
      {
        method: 'post',
        url: apiurl,
        withCredentials: false,
        data: {authorization_code: token}, 
      })
      return response.data
  }
  catch (error) 
  {
    console.log(error)
  }
}