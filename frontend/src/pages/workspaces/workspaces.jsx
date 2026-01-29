import { useState } from 'react'
import CreateWorkspace from '../../components/workspace/create-workspace'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import { PlusCircle, Users } from 'lucide-react'
import { useGetUserWorkspaces } from '@/hooks/use-workspace'
import NoDataFound from '@/components/workspace/no-data-found'
import WorkspaceAvatar from '@/components/workspace/workspace-avatar'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'



const Workspaces = () => {
    const [isCreatingWorkspace, setIsCreatingWorkspace] = useState(false)
    const { workspaces, loading } = useGetUserWorkspaces()


    if (loading) return <Spinner />

    return (
        <>
            <div className="space-y-8">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl md:text-3xl font-bold">Workspaces</h2>

                    <Button onClick={() => setIsCreatingWorkspace(true)}>
                        <PlusCircle className="size-4 mr-2" />
                        New Workspace
                    </Button>
                </div>

                <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
                    {
                        workspaces.map((workspace) => {
                            return <WorkspaceCard key={workspace._id} workspace={workspace} />
                        })
                    }

                    {
                        workspaces.length === 0 && <NoDataFound
                            title="No Workspaces found"
                            description="Create a new workspace to get started."
                            buttonText="Create a Workspace"
                            buttonAction={() => setIsCreatingWorkspace(true)}
                        />
                    }
                </div>
            </div>

            <CreateWorkspace
                isCreatingWorkspace={isCreatingWorkspace}
                setIsCreatingWorkspace={setIsCreatingWorkspace}
            />

        </>
    )
};

const WorkspaceCard = ({ workspace }) => {
    return (
        <Link to={`/workspaces/${workspace._id}`}>
            <Card className="transition-all shadow-md hover:-translate-y-1">
                <CardHeader className="pb-2">
                    <div className="flex items-center gap-2">
                        <WorkspaceAvatar name={workspace.name} color={workspace.color} />

                        <div>
                            <CardTitle className="text-sm font-semibold">{workspace.name}</CardTitle>
                            <span className="text-xs text-muted-foreground">
                                Created at {format(workspace.createdAt, 'MMM d, yyyy h:mm a')}
                            </span>
                        </div>

                        <div className="flex items-center text-muted-foreground">
                            <Users className="size-4 mr-1" />

                            <span className="text-xs">{workspace.members.length} members</span>
                        </div>
                    </div>

                    <CardDescription>
                        {workspace.description || 'No description.'}
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <div className="text-sm text-muted-foreground">
                        View Workspace Details and Projects
                    </div>
                </CardContent>
            </Card>
        </Link>
    )
};

export default Workspaces