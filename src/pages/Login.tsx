import { Box, Button } from '@mui/material'
import { useStravaUrl } from '../hooks/useStravaUrl.ts'
import { LogoStrava } from '../components/LogoStrava.tsx'

export function Login () {
  const { userAuthorizationUrl } = useStravaUrl()

  
  return (
    <Box component="section" sx={{display: 'flex', gap: 2, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
      <LogoStrava size={100}></LogoStrava>
      <h1>Usuario no registrado</h1>
      <Button variant="contained" color="error" className='button-login' href={userAuthorizationUrl}>
        Login With Strava
      </Button>
    </Box>
  )
}