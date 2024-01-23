import './Activities.css'
import { LogoStrava } from '../components/LogoStrava'
import { useActivities } from '../hooks/useActivities.ts'
import { Loading } from '../components/Loading.tsx'
import { useStravaStore } from '../store/strava.ts'
import { Button, Container, Grid, Paper, Table, TableBody, TableCell, TableHead, TableRow, ThemeProvider, createTheme } from '@mui/material'

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

  function time_convert(num)
  { 
    // Calculate the number of hours by dividing num by 60 and rounding down
    const hours = Math.floor(num / 60 / 60) ;  

    // Calculate the remaining minutes by taking the remainder when dividing num by 60
    const minutes = Math.floor((num / 60) % 60);

    // Return the result as a string in the format "hours:minutes"
    return `${hours}h ${minutes} min`         
  }

  const theme = createTheme({

  });

  return (
    <section className='activities-container'>
      <hgroup>
        <LogoStrava size={20}></LogoStrava>
        <h3>Actividades</h3>
      </hgroup>
      <h3>Lista de actividades</h3>
      <p>{error}</p>
      <p>Tamaño de página: {pageSize}</p>
      <p>Página actual: {currentPage}</p>
      <ThemeProvider theme={theme}>
        
      </ThemeProvider>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid item xs={12}>
        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', bgcolor: 'darkgray' }}>        
          <Table size="small" className="table-activities">
            <TableHead>
              <TableCell>Nombre</TableCell>
                <TableCell sx={{textAlign: 'right'}}>Distancia</TableCell>
                <TableCell sx={{textAlign: 'right'}}>Tiempo</TableCell>
                <TableCell sx={{textAlign: 'right'}}>En Movimiento</TableCell>
                <TableCell>Tipo</TableCell>
            </TableHead>
            <TableBody>
            {activities && activities.length !== 0 && 
              activities.map(a => {
                return (
                  <TableRow key={a.id}>
                    <TableCell sx={{minWidth: 200 }}>{a.name}</TableCell>
                    <TableCell sx={{textAlign: 'right'}}>{(a.distance / 1000).toFixed(2) } Kms</TableCell>
                    <TableCell sx={{textAlign: 'right'}}>{time_convert(a.elapsed_time)}</TableCell>
                    <TableCell sx={{textAlign: 'right'}}>{time_convert(a.moving_time)}</TableCell>
                    <TableCell >{a.type}</TableCell>
                  </TableRow >)
            })}  
            </TableBody>
          </Table>
        </Paper>
      </Grid>
      </Container>
      <div className='table-buttons'>
        <Button onClick={previousHandleClick}>Anterior</Button>
        <Button onClick={nextHandleClick}>Siguiente</Button>
      </div>
      <div className='loading-activities'>
        <Loading />
      </div>
      

    </section>
  )
}