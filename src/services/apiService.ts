import axios from "axios";

export async function createUserFromStravaAsync (token: string) {
  const url = import.meta.env.VITE_API_CREATE_USER_FROM_STRAVA_LOGIN
  try{
    return await axios.post(url, {token})
  }
  catch (error) 
  {
    console.log(error)
  }
}