import { CheckCircle2, ChevronsLeft, ChevronsRight, LayoutDashboard, ListCheck, LogOut, Settings, Users, Workflow } from 'lucide-react';
import { useState } from 'react'
import { useAuth } from '@/hooks/use-auth'
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';
import { ScrollArea } from '../ui/scroll-area';
import SidebarNav from '@/components/auth/layout/sidebar-nav';


const Sidebar = ({ currentWorkspace }) => {

  const { logout } = useAuth();

  const [isCollapsed, setIsCollapsed] = useState(false);

  const navItems = [
    {
      title: 'Dashboard',
      href: '/dashboard',
      icon: LayoutDashboard
    },
    {
      title: 'Workspaces',
      href: '/workspaces',
      icon: Workflow
    },
    {
      title: 'My Tasks',
      href: '/my-tasks',
      icon: ListCheck
    },
    {
      title: 'Members',
      href: '/members',
      icon: Users
    },
    {
      title: 'Achieved',
      href: '/achieved',
      icon: CheckCircle2
    },
    {
      title: 'Settings',
      href: '/settings',
      icon: Settings
    }

  ]

  return (
    <div className={cn("flex flex-col border-r bg-sidebar transition-all duration-300",
      isCollapsed ? "w-16 md:w-[80px]" : "w-16 md:w-[240px]")}>
      <div className="flex h-14 items-center border-b px-4 mb-4">
        <Link to="/dashboard" className="flex items-center">
          {
            !isCollapsed && (
              <div className="flex items-center gap-2">
                <Workflow className="size-6 text-blue-500" />
                <span className="font-semibold text-lg hidden md:block">To be Defined</span>
              </div>
            )
          }

          {
            isCollapsed && (
              <Workflow className="size-6 text-blue-500" />
            )
          }
        </Link>

        <Button variant={"ghost"} size={"icon"} className="ml-auto hidden md:block" onClick={() => setIsCollapsed(!isCollapsed)}>
          {
            isCollapsed ? <ChevronsRight className="size-4" /> : <ChevronsLeft className="size-4" />
          }
        </Button>
      </div>

      <ScrollArea className="flex-1 px-3 py-2">
        <SidebarNav
          items={navItems}
          isCollapsed={isCollapsed}
          className={cn(isCollapsed && "items-center space-y-2")}
          currentWorkspace={currentWorkspace}
        />
      </ScrollArea>

      <div>
        <Button
          variant={"ghost"}
          size={isCollapsed ? "icon" : "default"}
          onClick={logout}
        >
          <LogOut className={cn("size-4", isCollapsed && "mr-2")} />
          <span className="hidden md:block">Log Out</span>
        </Button>
      </div>
    </div>
  )
}

export default Sidebar
