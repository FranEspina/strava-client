import { Box, Stack, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { useActivity } from "../hooks/useActivity.ts";
import { Loading } from "../components/Loading.tsx";
import { useAthlete } from "../hooks/useAthlete.ts";

export function Activity () {
  const { id } = useParams()

  const { activity } = useActivity(id)
  const { athlete } = useAthlete()

  console.log(activity)

  return (
    <Box component="article" display="flex" flexDirection="row">
      <Stack component="aside" >
        <Box minWidth={200}  bgcolor="black" >
          Navegación Lateral
        </Box>
      </Stack>
      <Box component="main" p={2} sx={{width: "100%"}}>
        <Stack height={50} direction="row" alignItems="center" justifyContent='start' component="header" gap={20}>
          <Typography>{athlete?.firstname} {athlete?.lastname} - {activity?.sport_type}</Typography>
        </Stack>
        <Box display="flex" component="section" p={2} gap={5}>
          <Box component="div" display="flex" alignItems="start" gap={2} >
            <img src={athlete?.profile} alt="Imagen del usuario" style={{width: 100, height: 100, borderRadius: "100%"}} />
            <Stack direction="column" alignItems="start" justifyContent="center" gap={2}>
              <Stack direction="row" gap={1} alignItems="start" justifyContent="center" >
                <Typography variant="subtitle2" textAlign="left">{activity?.start_date_local?.toString()}</Typography>
                <Typography variant="subtitle2" textAlign="left">{activity?.location_country}</Typography>
              </Stack>
              <Typography variant="h5" textAlign="left">{activity.name}</Typography>
              <Typography variant="body1" textAlign="left">{activity?.description}</Typography>
            </Stack>
          </Box>
          <Box component="div">  
          </Box>
        </Box>
      </Box>
      <Loading></Loading>
    </Box>
    
    )
}