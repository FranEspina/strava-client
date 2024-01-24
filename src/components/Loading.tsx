import { Box, CircularProgress } from '@mui/material'
import { useStravaStore } from '../store/strava';

interface LoadingProps {
  size?: number
}
export function Loading (props: LoadingProps) {

  const isAsyncTaskLoading = useStravaStore(state => state.isAsyncTaskLoading)
  const computedSize = (props.size) ? props.size : 25
  return (
    isAsyncTaskLoading 
      ? <CircularProgress size={computedSize} ></CircularProgress>
      : <Box sx={{minHeight: computedSize, minWidth: computedSize, p: 0}} ></Box>
  )
}