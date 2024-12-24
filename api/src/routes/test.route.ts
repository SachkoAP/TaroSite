import { Router } from 'express';
import testController from '../controllers/test.controller';

const router = Router();

router.route('/').post(testController.create);
router.route('/:testId').get(testController.getOne).delete(testController.destroy);
router.route('/check').post(testController.check);

export default router;
