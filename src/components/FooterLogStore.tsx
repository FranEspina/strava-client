import { useStravaStore } from "../store/strava"

export function FooterLogStore () {

  const estado = useStravaStore(state => state)

  const isUserLogged = useStravaStore(state => state.isUserLogged)

  return <div>
    <h3>Estado de la página</h3>
    <h4>Nombre athleta</h4>
    <p>{estado.athlete.firstname} {estado.athlete.lastname}</p>
    <h4>Usuario</h4>
    <p>{estado.user?.email}</p>
    <h4>Access Token</h4>
    <p>{estado.user?.strava_data?.access_token}</p>
    <h4>Refresh Token</h4>
    <p>{estado.user?.strava_data?.refresh_token}</p>
    <h4>Usuario logado</h4>
    <p>{isUserLogged ? 'Si' : 'No'}</p>
  </div>
}

