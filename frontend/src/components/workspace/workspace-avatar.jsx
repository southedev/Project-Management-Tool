const WorkspaceAvatar = ({ name, color }) => {
  return (
    <div className="w-6 h-6 rounded text-white flex items-center justify-center" style={{ backgroundColor: color }}>
     <span className="text-xs font-medium text-white">{name.charAt(0).toUpperCase()}</span>
    </div>
  )
}

export default WorkspaceAvatar
