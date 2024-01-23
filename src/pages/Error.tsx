import { LoggedOptions } from "../components/LogOptions";

export function Error () {
  return <>
  <h1>Se produjo un error</h1>
  <h2>Error insperado procesando operación</h2>
  <LoggedOptions sx={{mt: 5}} />
  </>
}