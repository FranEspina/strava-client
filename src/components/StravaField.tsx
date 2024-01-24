import { Box, Stack, Typography } from "@mui/material";

interface stravaFieldParams{
  fieldValue: string, 
  description: string, 
  units?: string, 
  minWidth?: number, 
}

export function StravaField ({fieldValue, description, units, minWidth} : stravaFieldParams) {
  return (
    <Box display='flex' flexDirection='column' alignItems='start' justifyContent='start' minWidth={minWidth} >
      <Stack display='flex' flexDirection='row' gap={1} alignItems="center" padding={0} margin={0} >
        <Typography variant="h5">{fieldValue}</Typography>
        {units && <Typography variant="body2" >{units}</Typography>}
      </Stack>
      <Typography textAlign="left" variant="body2" color="GrayText">{description}</Typography>
    </Box>
  )
}