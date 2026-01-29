import React from 'react'
import Sidebar from '../../components/layout/sidebar'
import Header from '../../components/layout/header'
import { Navigate, Outlet } from 'react-router-dom'
import { useState } from 'react'
import { Spinner } from '@/components/ui/spinner'
import { useAuth } from '@/hooks/use-auth'
import CreateWorkspace from '../../components/workspace/create-workspace'

const DashboardLayout = () => {
  const [currentWorkspace, setCurrentWorkspace] = useState(null)
  const [isCreatingWorkspace, setIsCreatingWorkspace] = useState(false)
  const { isLoading, isAuthenticated } = useAuth()

  if (isLoading) {
    return <Spinner />
  }

  if (!isAuthenticated) {
    return <Navigate to="/sign-in" />
  }

  const handleWorkspaceSelected = (workspace) => {
    setCurrentWorkspace(workspace)
  }

  return (
    <div className="flex h-screen w-full">
      <Sidebar currentWorkspace={currentWorkspace} />

      <div className="flex flex-1 flex-col h-full">
        <Header
          onWorkspaceSelected={handleWorkspaceSelected}
          selectedWorkspace={currentWorkspace}
          onCreateWorkspace={() => setIsCreatingWorkspace(true)}
        />

        <main className="flex-1 overflow-y-auto h-full w-full">
          <div className="mx-auto container px-2 sm:px-6 lg:px-8 py-0 md:py-8 w-full h-full">
            <Outlet />
          </div>
        </main>
      </div>

      <CreateWorkspace
        isCreatingWorkspace={isCreatingWorkspace}
        setIsCreatingWorkspace={setIsCreatingWorkspace}
      />
    </div>
  )
}

export default DashboardLayout
