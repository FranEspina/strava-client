import { Outlet } from "react-router-dom"

export const Layout = () => {
  return (
    <div className="main-layout">
      <header></header>
      <main>
        <Outlet />
      </main>
    </div>
  )
}