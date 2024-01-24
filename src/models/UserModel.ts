export interface User {
  username: string, 
  firstname: string, 
  lastname: string, 
  email: string, 
  strava_id: number, 
  strava_data: StravaData
}

export interface StravaData {
  token_type: string,
  expires_at: number,
  expires_in: number,
  refresh_token: string,
  access_token: string,
}
  