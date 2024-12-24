import { Router } from 'express';
import progressController from '../controllers/progress.controller';

const router = Router();

router.route('/:type/:objectId').get(progressController.getType);

export default router;
