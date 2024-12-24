import { Router } from 'express';
import authController from '../controllers/auth.controller';

const router = Router();

router.route('/register').post(authController.registerByPhone);
router.route('/confirm').post(authController.confirm);
router.route('/login').post(authController.loginByPhone);
router.route('/renewCode').post(authController.renewCode);

export default router;
