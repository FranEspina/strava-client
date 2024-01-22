import { Box, CircularProgress } from "@mui/material"
import { Athlete } from "../models/AthleteModel"
import './AthleteInfo.css'

type AthleteProps = {
  value: Athlete
}

export function AthleteInfo ({ value } : AthleteProps) {

  let fecha = '' 
  if (value && value.created_at){
    fecha = new Date(value.created_at).toLocaleDateString("es-ES");
  }

  return (
     ( !value ) 
      ?  
        <Box sx={{ display: 'flex' }}>
          <CircularProgress />
        </Box>
      : <div className="athlete-info">
          <div className="left">
            <img className="image-athlete" src={value?.profile} alt="" />
          </div>
          <div className="right">
            <h3>{`${value?.firstname} ${value?.lastname}`}</h3>
            <p>Miembro de Strava desde {fecha}</p>
          </div>
        </div>
  )
}
