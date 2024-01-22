import { Box, CircularProgress } from '@mui/material'
import { useStravaStore } from '../store/strava';
export function Loading () {

  const isAsyncTaskLoading = useStravaStore(state => state.isAsyncTaskLoading)

  return (
    isAsyncTaskLoading 
      ? <Box>
          <CircularProgress></CircularProgress>
        </Box> 
      : null
  )
}