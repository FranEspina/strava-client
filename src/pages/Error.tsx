export function Error (error) {
  return <>
  <h1>Se produjo un error</h1>
  <h2>Error insperado procesando operación</h2>
  {error} && <p>{error}</p>
  </>
}