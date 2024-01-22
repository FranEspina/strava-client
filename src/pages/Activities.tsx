import './Activities.css'
import { LogoStrava } from '../components/LogoStrava'
import { useActivities } from '../hooks/useActivities.ts'
import { Loading } from '../components/Loading.tsx'
import { useStravaStore } from '../store/strava.ts'
import { Button } from '@mui/material'

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
          <th>Nombre</th>
          <th>Distancia</th>
          <th>Tiempo</th>
          <th>En Movimiento</th>
          <th>Tipo</th>
        </tr>
        </thead>
        {!isLoading && (!activities || activities.length === 0) && 
          <p>No existen datos que mostrar :( </p>}
        {activities && activities.length !== 0 && 
          activities.map(a => {
            return (
              <tr key={a.id}>
                <td className='left-align column-name-activity'>{a.name}</td>
                <td className='right-align'>{(a.distance / 1000).toFixed(2) } Kms</td>
                <td className='right-align'>{a.elapsed_time}</td>
                <td className='right-align'>{a.moving_time}</td>
                <td className='right-align'>{a.type}</td>
              </tr>)
      })}  
      </table>
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