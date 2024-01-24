import './App.css'; 
import { Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home.tsx'
import { NavBar } from './components/NavBar.tsx'
import { Activities } from './pages/Activities.tsx'
import { Layout } from './pages/Layout.tsx'
import { Error } from './pages/Error.tsx';
import { Login } from './pages/Login.tsx'
import { NotFound } from './pages/NotFound.tsx'
import { About } from './pages/About.tsx'
import { StravaRegister } from './pages/StravaRegister.tsx';
import { Activity } from './pages/Activity.tsx';


function App() {


  return (
    <>
      <NavBar />
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index Component={Home} /> 
          <Route path='login' Component={Login} />
          <Route path="about" element={<About />} /> // Dos formas de renderizar una ruta
          <Route path="activities" Component={Activities} /> 
          <Route path="activities/:id" Component={Activity} />
          <Route path="error" Component={Error} /> 
          <Route path="*" Component={NotFound} />
        </Route>
        <Route path="/strava" element={<StravaRegister />}/>
      </Routes>
    </>
  )
}

export default App
