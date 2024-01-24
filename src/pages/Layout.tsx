import './Layout.css'
import { Outlet } from "react-router-dom"
import { FooterLogStore } from "../components/FooterLogStore.tsx"
import { useStravaStore } from '../store/strava.ts';
import { ThemeProvider } from '@mui/material';
import { myTheme } from '../services/themeService.ts';

export const Layout = () => {
  
  const show = useStravaStore(state => state.showStatusFooter)  

  return (
    <ThemeProvider theme={myTheme}>
      <main className="main-layout">
        <main className='page-layout'>
          <Outlet />
        </main>
        <footer className='footer-layout'>
          {show && <FooterLogStore ></FooterLogStore>}
        </footer>
      </main>
    </ThemeProvider>
  )
}