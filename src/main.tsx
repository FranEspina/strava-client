import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from '@mui/material'
import { myTheme } from './services/themeService.ts'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <ThemeProvider theme={myTheme}>
      <App />
    </ThemeProvider>
  </BrowserRouter>
)
