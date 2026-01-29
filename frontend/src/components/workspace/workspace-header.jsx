import React from 'react'
import WorkspaceAvatar from './workspace-avatar'
import { Button } from '../ui/button'
import { Plus, UserPlus } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'

const WorkspaceHeader = ({ workspace, onCreateProject, onInviteMember }) => {
    // Handle null/undefined workspace gracefully
    if (!workspace) {
        return (
            <div className="space-y-8">
                <div className="space-y-3">
                    <div className="flex flex-col-reverse md:flex-row md:justify-between md:items-center gap-3">
                        <div className="flex md:items-center gap-3">
                            <div className="bg-gray-200 border-2 border-dashed rounded-lg w-12 h-12 flex items-center justify-center">
                                <span className="text-gray-500 text-xs">?</span>
                            </div>
                            <h2 className="text-xl md:text-2xl font-semibold text-muted-foreground">Loading workspace...</h2>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div className="space-y-3">
                <div className="flex flex-col-reverse md:flex-row md:justify-between md:items-center gap-3">
                    <div className="flex md:items-center gap-3">
                        {
                            workspace.color && (
                                <WorkspaceAvatar color={workspace.color} name={workspace.name || 'Untitled'} />
                            )
                        }

                        <h2 className="text-xl md:text-2xl font-semibold">{workspace.name || 'Untitled Workspace'}</h2>
                    </div>

                    <div className="flex items-center gap-3 justify-between md:justify-start mb-4 md:mb-0">
                        <Button variant="outline" onClick={onInviteMember}>
                            <UserPlus className="size-4 mr-2" />
                            Invite
                        </Button>

                        <Button onClick={onCreateProject}>
                            <Plus className="size-4 mr-2" />
                            Create Project
                        </Button>
                    </div>
                </div>

                {
                    workspace.description && (
                        <p className="text-sm md:text-base text-muted-foreground">{workspace.description}</p>
                    )
                }
            </div>

            {
                Array.isArray(workspace.members) && workspace.members.length > 0 && (
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">
                            Members
                        </span>

                        <div className='flex space-x-2'>
                            {
                                workspace.members.map((member) => (
                                    <Avatar key={member._id || member.id} title={member.user?.name || ''} className="size-8 relative h-8 w-8 rounded-full border-2 border-background overflow-hidden">

                                        <AvatarImage src={member.user?.profilePicture} alt={member.user?.name || ''} />
                                        <AvatarFallback>
                                            {member.user && typeof member.user === 'object' && member.user.name && member.user.name.trim()
                                                ? member.user.name.trim().charAt(0).toUpperCase()
                                                : 'U'}
                                        </AvatarFallback>
                                    </Avatar>
                                ))
                            }

                        </div>
                    </div>
                )
            }

        </div>
    )
}

export default WorkspaceHeader
