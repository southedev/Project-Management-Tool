const Workspace = require('../models/workspace.model');
const Project = require('../models/project.model');

exports.createProject = async (req, res) => {
    try {
        const { workspaceId } = req.params;
        const { title, description, status, startDate, dueDate, tags, members } = req.body;

        // Validate required fields
        if (!title || !status) {
            return res.status(400).json({ message: 'Title and status are required' });
        }

        const workspace = await Workspace.findById(workspaceId).populate('members.user');

        if (!workspace) {
            return res.status(404).json({ message: 'Workspace not found' });
        }

        // Check if user is a member of the workspace
        const isMember = workspace.members.some((member) => 
            member.user._id.toString() === req.user._id.toString()
        );

        if (!isMember) {
            return res.status(403).json({ message: 'You are not a member of this workspace' });
        }

        // Validate member IDs exist in workspace
        if (members && members.length > 0) {
            const workspaceMemberIds = workspace.members.map(m => m.user._id.toString());
            const invalidMembers = members.filter(member => 
                !workspaceMemberIds.includes(member.user)
            );
            
            if (invalidMembers.length > 0) {
                return res.status(400).json({ 
                    message: 'Some members are not part of this workspace' 
                });
            }
        }

        // Create the project
        const newProject = await Project.create({
            title,
            description: description || '',
            status,
            startDate: startDate ? new Date(startDate) : null,
            dueDate: dueDate ? new Date(dueDate) : null,
            tags: Array.isArray(tags) ? tags : [],
            workspace: workspaceId,
            members: members || [],
            createdBy: req.user._id,
        });

        // Add project to workspace
        workspace.projects.push(newProject._id);
        await workspace.save();

        // Populate the response with user details
        const populatedProject = await Project.findById(newProject._id)
            .populate('createdBy', 'name email')
            .populate('members.user', 'name email');

        return res.status(201).json({ 
            message: 'Project created successfully', 
            project: populatedProject 
        });

    } catch (error) {
        console.error('Project creation error:', error);
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: error.message });
        }
        return res.status(500).json({ message: 'Internal server error' });
    }
};
