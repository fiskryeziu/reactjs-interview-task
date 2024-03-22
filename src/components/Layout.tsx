import { Link, Outlet } from "react-router-dom"
import SideBar from "./SideBar"

function Layout() {
  return (
    <div className="flex flex-col h-screen">
      <header className="bg-[#1F2A44] px-2 py-2">
        <Link to="/" className="text-white font-bold ml-2">
          Your Notes
        </Link>
      </header>
      <main className="w-full h-full flex bg-gray-200">
        <SideBar />
        <Outlet />
      </main>
    </div>
  )
}

export default Layout
