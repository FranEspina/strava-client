import './Activities.css'
import { LogoStrava } from '../components/LogoStrava'
import { useActivities } from '../hooks/useActivities.ts'
import { useEffect } from 'react'
import { Loading } from '../components/Loading.tsx'

export function Activities () {

  const { activities, error } = useActivities()
  
  useEffect(() => console.log(activities), [activities])
  
  return (
    <section className='activities-container'>
      <hgroup>
        <LogoStrava size={20}></LogoStrava>
        <h3>Actividades</h3>
      </hgroup>
      <h3>Lista de actividades</h3>
      <p>{error}</p>
      <table className='table-activities'>
        <tr>
          <th>name</th>
          <th>distance</th>
          <th>elapsed_time</th>
          <th>moving_time</th>
          <th>type</th>
          <th>workout_type</th>
        </tr>
        <Loading />
        {activities.map(a => {
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

    </section>
  )
}