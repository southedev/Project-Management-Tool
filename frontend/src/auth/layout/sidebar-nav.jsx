import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils'
import { useLocation, useNavigate } from 'react-router-dom';


const SidebarNav = ({ items, isCollapsed, className, currentWorkspace, ...props }) => {
    const location = useLocation();
    const navigate = useNavigate();
  return (
    <nav className={cn("flex flex-col gap-y-2", className)} {...props}>
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = location.pathname === item.href;

        const handleClick = () => {
          if (item.href === "/workspaces") {
            navigate(item.href);
          } else if (currentWorkspace && currentWorkspace._id) {
            navigate(`${item.href}?workspaceId=${currentWorkspace._id}`);
          } else {
            navigate(item.href);
          }
        };
        return <Button key={item.href} variant={isActive ? "outline" : "ghost"} className={cn("justify-start", isActive && "bg-blue-800/20 text-blue-600 font-medium")} onClick={handleClick}>
          <Icon className="mr-2 size-4" />
          {
            isCollapsed ? <span className='sr-only'>{item.title}</span> : item.title
          }
        </Button>
      }
      )}
    </nav>
  )
}

export default SidebarNav
