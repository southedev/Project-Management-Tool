const express = require("express");
const { validateRequest } = require("zod-express-middleware")
const { createWorkspace, getUserWorkspaces, deleteWorkspace, updateWorkspace, getWorkspaceDetails, getWorkspaceProjects, getWorkspaceStats } = require("../controllers/workspace.controller");
const { workspaceSchema } = require("../libs/validate");
const authMiddleware = require("../middlewares/auth-middleware");

const router = express.Router();

router.get("/", authMiddleware, getUserWorkspaces);
router.get("/:workspaceId", authMiddleware, getWorkspaceDetails);
router.get("/:workspaceId/projects", authMiddleware, getWorkspaceProjects);
router.post("/create", authMiddleware, validateRequest({ body: workspaceSchema }), createWorkspace);
router.put("/:workspaceId", authMiddleware, validateRequest({ body: workspaceSchema }), updateWorkspace);
router.delete("/:workspaceId", authMiddleware, deleteWorkspace);
router.get("/:workspaceId/stats", authMiddleware, getWorkspaceStats);


module.exports = router;