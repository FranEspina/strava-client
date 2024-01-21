import { create } from "zustand"
import { Athlete } from "../models/AthleteModel.ts"
import { User } from '../models/UserModel.ts'
import { persist, devtools } from 'zustand/middleware'

interface AppState {
  athlete: Athlete
  user: User | undefined
  isUserLogged: boolean
  storeAthlete: (athlete: Athlete) => void
  storeUser: (user: User) => void
  logOut: () => void, 
  isAccessTokenExpired: () => boolean
  storeRefreshToken: (strava_data) => void
}

export const useStravaStore = create<AppState>()(
  devtools(persist((set, get) => {
    return {
      token: '', 
      user: undefined, 
      athlete: {id: 0}, 
      logOut: () => {
        set({athlete: {id: 0}, user: undefined, isUserLogged: false})
      }, 
      storeAthlete: (athlete: Athlete) => {
        set({athlete})
      }, 
      storeUser: (user: User) => {
        set({user})
        set({isUserLogged: true})
      }, 
      isAccessTokenExpired: () => {
        const token_expires_at = get().user?.strava_data.expires_at
        if (!token_expires_at) return false
        
        const currenttime = new Date() / 1000
        console.log(`comparando expire ${token_expires_at} con ahora ${currenttime}`)
        return token_expires_at < currenttime
      }, 
      storeRefreshToken: (strava_data) => {
        const newUser = structuredClone(get().user)
        if (newUser) {
          console.log(strava_data)
          newUser.strava_data.access_token = strava_data.access_token    
          newUser.strava_data.expires_at = strava_data.expires_at
          newUser.strava_data.expires_in = strava_data.expires_in
          newUser.strava_data.refresh_token = strava_data.refresh_token
          newUser.strava_data.token_type = strava_data.token_type    
        }
        set({user: newUser})
        set({isUserLogged: true})
      }
      
    }
  }, {
    name: 'strava-info'
  }))
)