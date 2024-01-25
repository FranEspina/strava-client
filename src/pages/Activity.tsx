import { Box, Stack, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { useActivity } from "../hooks/useActivity.ts";
import { Loading } from "../components/Loading.tsx";
import { useAthlete } from "../hooks/useAthlete.ts";
import { StravaField } from "../components/StravaField.tsx";
import { kmConvert, meterConvert, timeConvert } from "../services/formatService.ts";

export function Activity () {
  const { id } = useParams()

  const { activity } = useActivity(id || '')
  const { athlete } = useAthlete()

  return (
    <Box component="article" display="flex" flexDirection="row">
      <Box component="main" p={2} sx={{width: "100%"}}>
        {(activity && athlete) 
        ? <>
          <Stack height={50} direction="row" alignItems="center" justifyContent='start' component="header" gap={20}>
            <Typography variant="h5" >{athlete?.firstname} {athlete?.lastname} - {activity?.sport_type}</Typography>
          </Stack>
          <Box display="flex" flexDirection="row" component="section" p={2} gap={5} sx={{'@media screen and (max-width:700px)': { flexDirection: 'column'} }} >
            <Box component="div"  display="flex" flexDirection='row' alignItems="start" gap={2} sx={{'@media screen and (max-width:700px)': { flexDirection: 'column', alignItems: 'center', justifyContent: 'center'} }}>
              <img src={athlete?.profile} alt="Imagen del usuario" style={{width: 100, height: 100, borderRadius: "100%"}} />
              <Stack direction="column" alignItems="start" justifyContent="center" gap={2} sx={{'@media screen and (max-width:700px)': { alignItems: 'center', justifyContent: 'center'} }}>
                <Stack direction="row" gap={1} alignItems="start" justifyContent="center" >
                  <Typography variant="subtitle2" textAlign="left" >{activity?.start_date_local?.toString()}</Typography>
                  <Typography variant="subtitle2" textAlign="left" >{activity?.location_country}</Typography>
                </Stack>
                <Typography variant="h4" textAlign="left">{activity.name}</Typography>
                <Typography variant="body2" textAlign="left">{activity?.description}</Typography>
              </Stack>
            </Box>
            <Box display='flex' flexDirection='column'>
              <Stack direction="row" gap={2} flexWrap='wrap'>  
                <StravaField fieldValue={kmConvert(activity?.distance)} description="Distancia" units="Kms"></StravaField>
                <StravaField fieldValue={timeConvert(activity?.elapsed_time)} minWidth={100} description="Tiempo en movimiento"></StravaField>
                <StravaField fieldValue={meterConvert(activity?.total_elevation_gain)} description="Desnivel"></StravaField>
                {activity?.suffer_score && <StravaField fieldValue={activity?.suffer_score?.toString()} description="Esfuerzo Relativo" />}
              </Stack>
              <Stack direction="row" gap={2} flexWrap='wrap'>  
                {activity?.average_watts && <StravaField fieldValue={activity?.average_watts?.toString()} description="Potencia promedio ponderada" units="w" />}
                {activity?.kilojoules && <StravaField fieldValue={activity?.kilojoules.toString()} description="Trabajo total" units="kj" />}
                {activity?.calories && <StravaField fieldValue={meterConvert(activity?.calories)} description="Calorías" />}
              </Stack>
            </Box>
          </Box>
          </>
        : <Loading></Loading>
        }
      </Box>
    </Box>
    
    )
}