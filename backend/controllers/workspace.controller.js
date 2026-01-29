const Workspace = require("../models/workspace.model");
// const WorkspaceMember = require("../models/workspaceMember.model");
const Project = require("../models/project.model");
// const ProjectMember = require("../models/projectMember.model");
// const Task = require("../models/task.model");
// const Comment = require("../models/comment.model");
const User = require("../models/user.model");
const cloudinary = require('cloudinary').v2;

// create workspace
exports.createWorkspace = async (req, res) => {
  try {
    const { name, description, color } = req.body;

    const workspace = await Workspace.create({
      name,
      description,
      color,
      owner: req.user._id,
      members: [{
        user: req.user._id,
        role: "owner",
        joinedAt: new Date(),
      }],
    });

    res.status(201).json({ workspace, message: "Workspace created successfully" });


  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// get all workspaces for user
exports.getUserWorkspaces = async (req, res) => {
  try {
    // Get the user ID from the authenticated user (from JWT token)
    const userId = req.user._id;

    // Find workspaces where the user is either owner or member
    const workspaces = await Workspace.find({
      $or: [
        { owner: userId },
        { "members.user": userId }
      ]
    }).populate(
      "members.user",
      "name email profilePicture"
    );

    res.status(200).json(workspaces);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// update workspace
exports.updateWorkspace = async (req, res) => {
  try {
    const { workspaceId } = req.params;
    const { name, description, color } = req.body;

    // Check if the workspace exists and user has access
    const workspace = await Workspace.findOne({
      _id: workspaceId,
      $or: [
        { owner: req.user._id },
        { "members.user": req.user._id }
      ]
    });

    if (!workspace) {
      return res.status(404).json({ message: 'Workspace not found or unauthorized' });
    }

    // Update the workspace
    const updatedWorkspace = await Workspace.findByIdAndUpdate(
      workspaceId,
      { name, description, color },
      { new: true }
    );

    res.status(200).json({ workspace: updatedWorkspace, message: 'Workspace updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// get workspace details
exports.getWorkspaceDetails = async (req, res) => {
  try {
    const { workspaceId } = req.params;

    const workspace = await Workspace.findById(workspaceId)
      .populate(
        "members.user",
        "name email profilePicture"
      );

    if (!workspace) {
      return res.status(404).json({ message: 'Workspace not found' });
    }

    res.status(200).json(workspace);


  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// get workspace projects
exports.getWorkspaceProjects = async (req, res) => {
  try {
    const { workspaceId } = req.params;

    const workspace = await Workspace.findById({
      _id: workspaceId,
      "members.user": req.user._id,
    }).populate("members.user", "name email profilePicture");

    if (!workspace) {
      return res.status(404).json({ message: 'Workspace not found or unauthorized' });
    }

    const projects = await Project.find({ workspace: workspaceId, isArchived: false }).sort({ createdAt: -1 });

    res.status(200).json({ projects, workspace });


  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// delete workspace
exports.deleteWorkspace = async (req, res) => {
  try {
    const workspaceId = req.params.workspaceId;

    // Check if the workspace exists and user is the owner
    const workspace = await Workspace.findOne({ _id: workspaceId, owner: req.user._id });

    if (!workspace) {
      return res.status(404).json({ message: 'Workspace not found or unauthorized' });
    }

    // Delete the workspace
    await Workspace.findByIdAndDelete(workspaceId);

    res.status(200).json({ workspace, message: 'Workspace deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// add member to workspace
// exports.addMember = async (req, res) => {
//   try {

//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: error.message });
//   }
// };

exports.getWorkspaceStats = async (req, res) => {
  try {


  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
