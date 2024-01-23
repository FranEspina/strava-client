import { Box, CircularProgress, Hidden } from '@mui/material'
import { useStravaStore } from '../store/strava';
export function Loading (props) {

  const isAsyncTaskLoading = useStravaStore(state => state.isAsyncTaskLoading)
  return (
    isAsyncTaskLoading 
      ? <CircularProgress size={props.size | 25} ></CircularProgress>
      : <Box sx={{minHeight: props.size | 25, minWidth: props.size | 25, p: 0}} ></Box>
  )
}