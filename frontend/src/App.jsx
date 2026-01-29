import { HashRouter, Route, Routes } from "react-router-dom"
import Landing from "./pages/welcome/landing"
import SignIn from "./auth/sign-in"
import SignUp from "./auth/sign-up"
import ForgotPassword from "./auth/forgot-password"
import Workspaces from "./pages/workspaces/workspaces"
// import MyTasks from "./pages/workspace/my-tasks"
// import Members from "./pages/workspace/members"
// import Achieved from "./pages/workspace/achieved"
// import Settings from "./pages/workspace/settings"
import WorkspaceDetails from "./pages/workspaces/workspace-details"
import DashboardLayout from "./pages/dashboard/dashboard-layout"
import CreateWorkspace from "./components/workspace/create-workspace"
import ProtectedLayout from "./auth/layout/protected-layout"

function App() {
  return (
    <HashRouter>

      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route element={<ProtectedLayout />}>
          <Route path="/create-workspace" element={<CreateWorkspace />} />
          <Route path="/dashboard" element={<DashboardLayout />} />
          <Route path="/workspaces" element={<DashboardLayout />}>
            <Route index element={<Workspaces />} />
            <Route path=":workspaceId" element={<WorkspaceDetails />} />
          </Route>
          {/* <Route path="/dashboard" element={<DashboardLayout />}>
            <Route path="my-tasks" element={<MyTasks />} />
            <Route path="members" element={<Members />} />
            <Route path="achieved" element={<Achieved />} />
            <Route path="settings" element={<Settings />} />
          </Route> */}
        </Route>

      </Routes>
    </HashRouter>
  )
}

export default App