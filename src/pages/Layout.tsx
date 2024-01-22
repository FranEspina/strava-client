import './Layout.css'
import { Outlet } from "react-router-dom"
import { FooterLogStore } from "../components/FooterLogStore.tsx"
import { useStravaStore } from '../store/strava.ts'

export const Layout = () => {
  
  //TODO: Revisar porque no vale con inicializar a true o false el estado de showStatusFooter
  const show = useStravaStore(state => state.showStatusFooter)
  const setShow = useStravaStore(state => state.setShowStatusFooter)
  setShow(false)

  return (
    <div className="main-layout">
      <header></header>
      <main className='page-layout'>
        <Outlet />
      </main>
      <footer className='footer-layout'>
        {show && <FooterLogStore ></FooterLogStore>}
      </footer>
    </div>
  )
}