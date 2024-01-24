import { Box, Button, Typography } from '@mui/material'
import { useStravaUrl } from '../hooks/useStravaUrl.ts'
import { LogoStrava } from '../components/LogoStrava.tsx'

export function Login () {
  const { userAuthorizationUrl } = useStravaUrl()

  return (
    <Box marginTop={5} component="section" sx={{display: 'flex', gap: 5, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
      <LogoStrava size={100}></LogoStrava>
      <h1>Usuario no registrado</h1>
      <Typography marginBottom={2} width="400px">Usa tus credenciales de Strava para iniciar sesión y dar permisos para consultar tus actividades</Typography>
      <Button variant="contained" color="error" className='button-login' href={userAuthorizationUrl}>
        Login With Strava
      </Button>
    </Box>
  )
}