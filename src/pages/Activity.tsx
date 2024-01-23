import { useParams } from "react-router-dom";

export function Activity () {
  const { id } = useParams()

  return (
    <>
      <p>Actividad {id}</p>
    </>
    )
}