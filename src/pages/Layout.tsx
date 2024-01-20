import { Outlet } from "react-router-dom"
import { FooterLogStore } from "../components/FooterLogStore.tsx"

export const Layout = () => {
  return (
    <div className="main-layout">
      <header></header>
      <main>
        <Outlet />
      </main>
      <FooterLogStore></FooterLogStore>
    </div>
  )
}