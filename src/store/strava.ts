import { create } from "zustand"
import { Athlete } from "../models/AthleteModel.ts"
import { User } from '../models/UserModel.ts'
import { persist, devtools } from 'zustand/middleware'

interface AppState {
  token: string
  athlete: Athlete
  user: User | undefined
  isUserLogged: boolean
  storeAthlete: (athlete: Athlete) => void
  storeUser: (user: User) => void
  storeToken: (token : string) => boolean
  logOut: () => void, 
  isAccessTokenExpired: () => boolean
}

export const useStravaStore = create<AppState>()(
  devtools(persist((set, get) => {
    return {
      token: '', 
      user: undefined, 
      athlete: {id: 0}, 
      isUserLogged: false,
      storeToken: async (token : string) => {
        set({token, isUserLogged: true})
      }, 
      logOut: () => {
        set({token: '', athlete: {id: 0}, user: undefined, isUserLogged: false})
      }, 
      storeAthlete: (athlete: Athlete) => {
        set({athlete})
      }, 
      storeUser: (user: User) => {
        set({user})
      }, 
      isAccessTokenExpired: () => {
        const token_expires_at = get().user?.strava_data.expires_at
        if (!token_expires_at) return false
        const currenttime = new Date() / 1000 as number
        return token_expires_at > currenttime
      }
    }
  }, {
    name: 'strava-info'
  }))
)