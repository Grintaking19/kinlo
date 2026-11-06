import express from 'express';
import ensureAuthenticated  from '../../middlewares/ensureAuthenticated.js';
import { getMeController } from './users.controllers.js';
const router = express.Router();


// GET /users/me  For testing purposes.
router.get('/me', ensureAuthenticated, getMeController);


export default router;