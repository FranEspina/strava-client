import './Layout.css'
import { Outlet } from "react-router-dom"
import { FooterLogStore } from "../components/FooterLogStore.tsx"
import { useStravaStore } from '../store/strava.ts';
import { ThemeProvider, createTheme } from '@mui/material';

export const Layout = () => {
  
  const show = useStravaStore(state => state.showStatusFooter)  

  const theme = createTheme({
    palette: {
      mode: 'dark',
    },
  });
  
  return (
    <ThemeProvider theme={theme}>
      <main className="main-layout">
        <header></header>
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