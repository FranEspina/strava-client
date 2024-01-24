import { useEffect, useState } from "react";
import { getActivitiesAsync } from "../services/stravaService.ts";
import { useStravaStore } from "../store/strava.ts";
import { StravaActivity } from "../models/StravaActivityModel.ts";
import { useNavigate } from "react-router-dom";

type returnUseActivities = {
  activities: Array<StravaActivity>, 
  error: string, 
  currentPage: number, 
  moveNextPage: () => void, 
  movePreviousPage: () => void

}

export function useActivities () : returnUseActivities {
  const navigate = useNavigate()
  const [activities, setActivities] = useState<Array<StravaActivity>>([])
  const [errorMessage, setErrorMessage] = useState<string>('')

  const isUserLogged = useStravaStore(state => state.isUserLogged)
  const access_token = useStravaStore(state => state.user?.strava_data.access_token)
  const pageSize = useStravaStore(state => state.pageSize)

  const [currentPage, setCurrentPage] = useState(1)


  const storeIsAsyncTaskLoading = useStravaStore(state => state.storeIsAsyncTaskLoading)

  const moveNextPage = () => {
    setCurrentPage(currentPage + 1)
  }

  const movePreviousPage = () => {
    if (currentPage === 1) return 
    setCurrentPage(currentPage - 1)
  }
 
  useEffect(() => {

    if (!isUserLogged || !access_token) return navigate("/login")

    storeIsAsyncTaskLoading(true)
    getActivitiesAsync({tokenStr: access_token, page: currentPage, perPage: pageSize}).then(
      result => {
        if (result.ok){
          const list = result.value as Array<StravaActivity>
          if (list.length === 0){
            setCurrentPage(currentPage - 1)
          } else {
            setActivities(list)
          }
        } else{
          setErrorMessage(result.message)
        }
      }).catch(error => {
        console.log(error)
        return navigate("/error")
      })
      .finally(() => storeIsAsyncTaskLoading(false))


  }, [pageSize, currentPage, storeIsAsyncTaskLoading, navigate, isUserLogged, access_token, setActivities])

  return {activities, error: errorMessage, currentPage, moveNextPage, movePreviousPage}
}



