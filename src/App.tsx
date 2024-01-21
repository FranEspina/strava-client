import './App.css'; 
import { Routes, Route, redirect, useNavigate } from 'react-router-dom'
import { Home } from './pages/Home.tsx'
import { NavBar } from './components/NavBar.tsx'
import { Activities } from './pages/Activities.tsx'
import { Layout } from './pages/Layout.tsx'
import { Error } from './pages/Error.tsx';
import { Login } from './pages/Login.tsx'
import { StravaRegister } from './pages/StravaRegister.tsx';

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
          <Route path="error" Component={Error} /> 
          <Route path="*" Component={NotFound} />
        </Route>
        <Route path="/strava" Component={StravaRegister}/>
      </Routes>
    </>
  )
}

export default App

function About() {
  return <><h1>Página de la aplicación</h1></>;
}

function NotFound() {
  return <><h1>Página no encontrada</h1></>;
}