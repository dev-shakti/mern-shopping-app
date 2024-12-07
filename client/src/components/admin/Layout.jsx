import { Outlet } from "react-router-dom"
import AdminSidebar from "./Sidebar"
import AdminHeader from "./Header"
import { useState } from "react"


const AdminLayout = () => {
  const [sidebarOpen,setSidebarOpen]=useState(false)
  return (
    <div className="flex min-h-screen ">
        {/* admin sidebar */}
        <AdminSidebar open={sidebarOpen} setOpen={setSidebarOpen}/>
      <div className="flex flex-1 flex-col">
        {/* admin header */}
        <AdminHeader setOpen={setSidebarOpen}/>
        <main className="flex-1 flex-col flex bg-muted/40 p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default AdminLayout
