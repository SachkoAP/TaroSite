import { Router } from 'express';
import answerController from '../controllers/answer.controller';

const router = Router();

router.route('/').post(answerController.create);
router.route('/:answerId').delete(answerController.destroy);

export default router;
