import AppHeader from '@/components/custom/dashboard/AppHeader'
import { AppSidebar } from '@/components/custom/dashboard/AppSideBar'
import { SidebarProvider } from '@/components/ui/sidebar'
import React from 'react'

function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div> <AppHeader /> {children}</div>
    </SidebarProvider>
    
  )
}

export default DashboardLayout
