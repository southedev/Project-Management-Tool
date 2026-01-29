import React from 'react'

const ProjectCard = ({ project }) => {
  return (
    <div>
      <h3 className="text-lg font-medium mb-2">{project.name}</h3>
      <p className="text-sm text-gray-500 mb-4">{project.description}</p>
    </div>
  )
}

export default ProjectCard
