import { create } from "zustand"
import { Athlete } from "../models/AthleteModel"
import { persist, devtools } from 'zustand/middleware'

interface AppState {
  token: string
  athlethe: Athlete
  isUserLogged: boolean
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
      }
    }
  }, {
    name: 'strava-info'
  }))
)