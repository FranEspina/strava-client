import './Activities.css'
import { LogoStrava } from '../components/LogoStrava'
import { useActivities } from '../hooks/useActivities.ts'
import { Loading } from '../components/Loading.tsx'
import { useStravaStore } from '../store/strava.ts'
import { Button } from '@mui/material'

export function Activities () {

  const { activities, error, currentPage, moveNextPage, movePreviousPage } = useActivities()
  const pageSize = useStravaStore(state => state.pageSize)
  
  const nextHandleClick = () => {
    moveNextPage()
  }

  const previousHandleClick = () => {
    movePreviousPage()
  }
  
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
      <table className='table-activities'>
        <thead>
        <tr>
          <th>name</th>
          <th>distance</th>
          <th>elapsed_time</th>
          <th>moving_time</th>
          <th>type</th>
          <th>workout_type</th>
        </tr>
        </thead>
        <Loading />
        {(!activities || activities.length === 0) && 
          <p>No existen datos que mostrar :( </p>}
        {activities && activities.length !== 0 && 
          activities.map(a => {
            return (
              <tr key={a.id}>
                <td>{a.name}</td>
                <td>{a.distance}</td>
                <td>{a.elapsed_time}</td>
                <td>{a.moving_time}</td>
                <td>{a.type}</td>
                <td>{a.workout_type}</td>
              </tr>)
      })}  
      </table>
      <div className='table-buttons'>
        <Button onClick={previousHandleClick}>Anterior</Button>
        <Button onClick={nextHandleClick}>Siguiente</Button>
      </div>

    </section>
  )
}