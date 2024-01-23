import { LogoStrava } from '../components/LogoStrava'
import { useActivities } from '../hooks/useActivities.ts'
import { Loading } from '../components/Loading.tsx'
import { useStravaStore } from '../store/strava.ts'
import { Box, Button, Icon, Paper, Table, TableBody, TableCell, TableHead, TableRow, ThemeProvider, createTheme } from '@mui/material'
import { kmConvert, meterConvert, timeConvert } from '../services/formatService.ts'
import { Link } from 'react-router-dom'


export function Activities () {

  const { activities, error, currentPage, moveNextPage, movePreviousPage } = useActivities()
  const pageSize = useStravaStore(state => state.pageSize)
  const isLoading = useStravaStore(state => state.isAsyncTaskLoading)

  const nextHandleClick = () => {
    if (!isLoading){
      moveNextPage()
    }
  }

  const previousHandleClick = () => {
    if (!isLoading){
      movePreviousPage()
    }
  }

  return (
    <section className='activities-container'>
      <Box component="hgroup" sx={{display: 'flex', flexDirection: 'row', gap:2, alignItems: 'center', justifyContent: 'star' }}>
        <LogoStrava size={20}></LogoStrava>
        <h3>Listado de actividades</h3>
      </Box>
      <p>{error}</p>
      <Box sx={{display: 'flex', flexDirection: 'row', gap:2 }}>
        <p>Tamaño de página: {pageSize}</p>
        <p>Página actual: {currentPage}</p>
      </Box>
      <Paper sx={{ p: 2, width: '100%', display: 'flex', flexDirection: 'column', mt: 2 }}>        
        <Table size="small" className="table-activities">
          <TableHead>
            <TableCell>Nombre</TableCell>
            <TableCell sx={{textAlign: 'right'}}>Distancia</TableCell>
            <TableCell sx={{textAlign: 'right'}}>Tiempo</TableCell>
            <TableCell sx={{textAlign: 'right'}}>En Movimiento</TableCell>
            <TableCell sx={{textAlign: 'right'}}>Ascenso</TableCell>
            <TableCell>Tipo</TableCell>
          </TableHead>
          <TableBody>
          {activities && activities.length !== 0 && 
            activities.map(a => {
              return (
                <TableRow key={a.id}>
                  <TableCell sx={{minWidth: 200 }}>
                    <Button component={Link} to={`/activities/${a.id}`}>{a.name}</Button>  
                  </TableCell>
                  <TableCell sx={{textAlign: 'right'}}>{kmConvert(a.distance)}</TableCell>
                  <TableCell sx={{textAlign: 'right'}}>{timeConvert(a.elapsed_time)}</TableCell>
                  <TableCell sx={{textAlign: 'right'}}>{timeConvert(a.moving_time)}</TableCell>
                  <TableCell sx={{textAlign: 'right'}}>{meterConvert(a.total_elevation_gain)}</TableCell>
                  <TableCell >{a.type}</TableCell>
                </TableRow >)
          })}  
          </TableBody>
        </Table>
      </Paper>
      <Box component="div"  sx={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'end'}}>
        <Button onClick={previousHandleClick}><Icon>navigate_before</Icon></Button>
        <Loading />
        <Button onClick={nextHandleClick}><Icon>navigate_next</Icon></Button>
      </Box>
    </section>

  )
}