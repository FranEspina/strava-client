import './Home.css'
import { useStravaStore } from '../store/strava'
import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { refreshUserFromStravaAsync } from '../services/apiService.ts'
import { LoggedOptions } from '../components/LogOptions.tsx'
import { Box, Button, Stack, Typography } from '@mui/material'
import { LogoStrava } from '../components/LogoStrava.tsx'


export function Home () {

  const isUserLogged = useStravaStore(state => state.isUserLogged )
  const firstname = useStravaStore(state => state.user?.firstname)
  const navigate = useNavigate()
  const strava_id = useStravaStore(state => state.user?.strava_id)
  const refresh_token = useStravaStore(state => state.user?.strava_data.refresh_token)
  const storeRefreshToken = useStravaStore(state => state.storeRefreshToken)
  const isAccessTokenExpired = useStravaStore(state => state.isAccessTokenExpired)

  useEffect(() => {
    if (isUserLogged) {

      if (!strava_id || !refresh_token){
        console.log('Se esperaba un identificador de Strava y un Token de refresco')
        return navigate("/error")
      }

      if (isAccessTokenExpired()){
        refreshUserFromStravaAsync(strava_id, refresh_token)
        .then(response => {          
          storeRefreshToken(response)
        })
        .catch(error => {
          console.log('Error refrescando token')
          console.log(error)
          navigate("/error")
        })
      }
    }
  }, [navigate, isUserLogged, isAccessTokenExpired, storeRefreshToken, refresh_token, strava_id]);
    

  return (
    <>
      <Box component="hgroup" display="flex" flexDirection="column" alignItems="center" gap={1}>
        <Stack direction="row" gap={2} justifyContent="center" alignItems="center">
          <LogoStrava size={90}></LogoStrava>
          <Typography variant='h1'>Mui Strava</Typography>
        </Stack>
        <Typography variant="h4" textAlign="center" width="100%">
          Revisa tus actividades de Strava
        </Typography>

        <Stack  direction="column" gap={3} alignItems="center" justifyContent="center" width={500} marginTop={5}>
          {!isUserLogged &&
             <>
              <Typography variant="body1" textAlign="start"  width="100%">
                Usa <strong>zustand</strong> para el estado global, backend <strong>express</strong> para authorización y <strong>MongoDb</strong> en la nube para almacenar datos del usuario. 
              </Typography>
              <Typography variant="body1" textAlign="start"  width="100%">
                Frontend está realizado en <strong>React</strong> con <strong>TypeScript</strong> usando algunos componentes <strong>MUI material</strong>.
              </Typography>
             </> 
          }
        </Stack>

        {!isUserLogged && <Button variant="contained" color="error" component={Link} to="/login" sx={{mt: 5}}>inicio sesión</Button>}
        {isUserLogged &&
          <>
            <Typography variant="h4" textAlign="center"  width="100%">
              Bienvenido {firstname}
            </Typography>
            <LoggedOptions sx={{mt: 5}} />
          </> 
        }  

      </Box>

    </>
  )
}