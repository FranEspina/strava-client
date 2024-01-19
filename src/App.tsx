import './App.css'; 
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Home } from './pages/Home.tsx'
import { NavBar } from './components/NavBar.tsx'
import { Activities } from './pages/Activities.tsx';

function App() {

  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" Component={Home} /> 
        <Route path="/about" Component={About} /> 
        <Route path="/activities" Component={Activities} /> 
        <Route path="*" Component={NotFound} />
      </Routes>
    </Router>
  )
}

export default App

function About() {
  return <><h1>Página sobre la aplicación</h1></>;
}

function NotFound() {
  return <><h1>Página no encontrada</h1></>;
}