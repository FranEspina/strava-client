import { useEffect, useState } from 'react'
import { getUserAuthorizationUrl } from '../services/stravaService.ts'

export function useStravaUrl(){
  
  const [userAuthorizationUrl, setUSerUrl] = useState('')

  useEffect(() => setUSerUrl(getUserAuthorizationUrl())
    , [])

  return ({userAuthorizationUrl})
}