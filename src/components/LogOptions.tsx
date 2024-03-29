import { LogoutButton } from '../components/LogoutButton.tsx'
import { RefreshTokenButton } from '../components/RefreshTokenButton.tsx'
import { AthleteInfo } from '../components/AthleteInfo.tsx'
import { useAthlete } from '../hooks/useAthlete.ts'
import { DeauthorizationButton } from '../components/DeauthorizationButton.tsx'
import { useStravaStore } from '../store/strava.ts'
import { Box } from '@mui/material'
import { SxProps } from '@mui/system'

interface LoggedOptionsProps {
  sx?: SxProps; 
}

export function LoggedOptions (props: LoggedOptionsProps) {
  const {athlete} = useAthlete()
  const isUserLogged = useStravaStore(state => state.isUserLogged )

  return (
    <Box sx={{...props.sx}}>
      {isUserLogged && <AthleteInfo value={athlete} /> }
      <Box component="div" sx={{display: 'flex', flexDirection: 'row', mt: 3, 
      justifyContent: 'center', alignItems: 'center', gap: 1, 
      '@media screen and (max-width:700px)': { flexDirection: 'column', mb: 10} }}>
        {isUserLogged && <LogoutButton variant="outlined" sx={{minWidth: 200}} />}
        {isUserLogged && <RefreshTokenButton variant="outlined" sx={{minWidth: 200}}  />}
        {isUserLogged && <DeauthorizationButton variant="outlined" sx={{minWidth: 200}}  />}
      </Box>
    </Box>
  )
}