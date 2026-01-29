import { Button } from '@/components/ui/button'
import { Bell, PlusCircle } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useAuth } from '@/hooks/use-auth'
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger, DropdownMenuLabel } from '@/components/ui/dropdown-menu'
import { Link } from 'react-router-dom'
import WorkspaceAvatar from '../workspace/workspace-avatar'
import { useGetUserWorkspaces } from '@/hooks/use-workspace'

const Header = ({ onCreateWorkspace }) => {
  const { user, logout } = useAuth();
  const { selectedWorkspace, onWorkspaceSelected } = useAuth();
  const { workspaces } = useGetUserWorkspaces();

  return (
    <div className="bg-background sticky top-0 z-40 border-b">
      <div className="flex h-14 items-center justify-between px-4 sm:px-6 lg:px-8 py-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              {
                selectedWorkspace ?
                  <>
                    {
                      selectedWorkspace.color && <WorkspaceAvatar color={selectedWorkspace.color} name={selectedWorkspace.name} />
                    }
                    <span className="font-medium">{selectedWorkspace.name}</span>
                  </> :
                  <span className="font-medium">{workspaces[0]?.name || 'Select Workspace'}</span>
              }
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent>
            <DropdownMenuLabel>Workspaces</DropdownMenuLabel>

            <DropdownMenuSeparator />

            <DropdownMenuGroup>
              {
                workspaces.map((ws) => (
                  <DropdownMenuItem key={ws._id} onClick={() => onWorkspaceSelected(ws._id)}>
                    {ws.color && (
                      <WorkspaceAvatar color={ws.color} name={ws.name} />
                    )}
                    <span className="font-medium">{ws.name}</span>
                  </DropdownMenuItem>
                ))
              }
            </DropdownMenuGroup>

            <DropdownMenuGroup>
              <DropdownMenuItem onClick={onCreateWorkspace}>
                <PlusCircle className="w-4 h-4 mr-2" />
                Create Workspace
              </DropdownMenuItem>
            </DropdownMenuGroup>

          </DropdownMenuContent>

        </DropdownMenu>


        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Bell />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="rounded-full border p-1 w-8 h-8" variant="ghost" size="icon">
                <Avatar>
                  <AvatarImage src={user?.profilePicture || ''} />
                  <AvatarFallback className="bg-black text-white">{user?.name?.charAt(0) || 'U'}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" >
              <DropdownMenuLabel>My Account</DropdownMenuLabel>

              <DropdownMenuSeparator />

              <DropdownMenuItem>
                <DropdownMenuLabel>Profile</DropdownMenuLabel>
                <Link to="/user/profile" />
              </DropdownMenuItem>

              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={logout}>
                <DropdownMenuLabel>Logout</DropdownMenuLabel>
                <Link to="/user/logout" />
              </DropdownMenuItem>

            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

    </div>
  )
}

export default Header
