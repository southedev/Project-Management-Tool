import NoDataFound from '../workspace/no-data-found'
import ProjectCard from './project-card';

const ProjectList = ({ projects, workspaceId, onCreateProject }) => {

    return (
        <div>
            <h3 className="text-xl font-medium mb-4">Projects</h3>

            <div className="grid grid-cols-2 gap-6 lg:grid-cols-3">
                {
                    !projects || projects.length === 0 ? 
                    <NoDataFound
                        title="No projects found"
                        description="Create a new project to get started."
                        buttonText="Create a Project"
                        buttonAction={onCreateProject}
                    /> :
                        projects.map((project) => (
                            <ProjectCard
                                key={project._id}
                                project={project}
                                workspaceId={workspaceId}
                                progress={project.progress}
                            />
                        ))
                }
            </div>
        </div>
    )
}

export default ProjectList
