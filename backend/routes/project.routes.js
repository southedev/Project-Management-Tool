const express = require('express');
const { validateRequest } = require('zod-express-middleware');
const { projectSchema } = require('../libs/validate');
const { createProject } = require('../controllers/project.controller');
const authMiddleware = require('../middlewares/auth-middleware');
const { z } = require('zod');

const router = express.Router();

router.post('/:workspaceId/create-project', authMiddleware, validateRequest({
    params: z.object({
        workspaceId: z.string(),
    }),
    body: projectSchema, 
}), createProject);



module.exports = router;