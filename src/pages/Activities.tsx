import './Activities.css'
import { LogoStrava } from '../components/LogoStrava'
import { useAthlete } from '../hooks/useAthlete'
import { AthleteInfo } from '../components/AthleteInfo'

export function Activities () {

  const {athlete, error} = useAthlete()
  
  return (
    <section className='activities-container'>
      <hgroup>
        <LogoStrava size={20}></LogoStrava>
        <h3>Actividades</h3>
      </hgroup>
      <AthleteInfo value={athlete} />
      <h3>Lista de actividades</h3>
      <p>{error}</p>
    </section>
  )
}