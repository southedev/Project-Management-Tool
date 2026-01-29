import { useState } from 'react'
import { Spinner } from '@/components/ui/spinner';
import WorkspaceHeader from '@/components/workspace/workspace-header';
import { useGetWorkspaceDetails, useGetUserWorkspaces } from '@/hooks/use-workspace';
import { useParams } from 'react-router-dom'
import ProjectList from '@/components/project/project-list';
import CreateProjectDialog from '@/components/project/create-project-dialog';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

const WorkspaceDetails = () => {
    const { workspaceId } = useParams();
    const [isCreateProject, setIsCreateProject] = useState(false);
    const [isInviteMember, setIsInviteMember] = useState(false);

    // Get workspace details using the custom hook
    const { workspace, loading: workspaceLoading } = useGetWorkspaceDetails(workspaceId);
    const { loading: workspacesLoading } = useGetUserWorkspaces();
    
    // Show loading spinner while fetching
    if (workspacesLoading || workspaceLoading || !workspaceId) {
        return <Spinner />;
    }

    // Show not found message if workspace doesn't exist
    if (!workspace) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-center">
                    <h2 className="text-xl font-semibold mb-2">Workspace not found</h2>
                    <p className="text-muted-foreground">The workspace you're looking for doesn't exist or you don't have access to it.</p>
                </div>
            </div>
        );
    }

    // Ensure workspace has required properties with fallbacks
    const safeWorkspace = {
        ...workspace,
        members: Array.isArray(workspace.members) ? workspace.members : [],
        projects: Array.isArray(workspace.projects) ? workspace.projects : []
    };

    return (
        <div className="space-y-8">
            <WorkspaceHeader
                workspace={safeWorkspace}
                members={safeWorkspace.members}
                onCreateProject={() => setIsCreateProject(true)}
                onInviteMember={() => setIsInviteMember(true)}
            />

            <ProjectList
                workspace={safeWorkspace}
                projects={safeWorkspace.projects}
                workspaceId={workspaceId}
                onCreateProject={() => setIsCreateProject(true)}
            />

            <CreateProjectDialog
                isOpen={isCreateProject}
                onOpenChange={setIsCreateProject}
                workspaceId={workspaceId}
                workspaceMembers={safeWorkspace.members}
            />

            {/* Placeholder dialog to consume isInviteMember state and satisfy ESLint */}
            {/* This should be replaced with a proper InviteMemberDialog component */}
            <Dialog open={isInviteMember} onOpenChange={setIsInviteMember}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Invite Members</DialogTitle>
                        <DialogDescription>
                            Invite members to join this workspace. This feature is coming soon.
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default WorkspaceDetails