import { create } from "zustand"
import { Athlete } from "../models/AthleteModel.ts"
import { User } from '../models/UserModel.ts'
import { persist, devtools } from 'zustand/middleware'

interface AppState {
  token: string
  athlete: Athlete
  user: User
  isUserLogged: boolean
  storeAthlete: (athlete: Athlete) => void
  storeUser: (user: User) => void
  storeToken: (token : string) => boolean
  logOut: () => void
}

export const useStravaStore = create<AppState>()(
  devtools(persist((set, get) => {
    return {
      token: '', 
      athlethe: {id: 0}, 
      isUserLogged: false,
      storeToken: async (token : string) => {
        set({token, isUserLogged: true})
      }, 
      logOut: () => {
        set({token: '', isUserLogged: false})
      }, 
      storeAthlete: (athlete: Athlete) => {
        set({athlete})
      }, 
      storeUser: (user: User) => {
        set({user})
      }
    }
  }, {
    name: 'strava-info'
  }))
)