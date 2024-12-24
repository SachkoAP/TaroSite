import { Router } from 'express';
import userController from '../controllers/user.controller';

const router = Router();

// fixme: refresh-token troubles
// router.route('/profile').get(verifyToken.auth, userController.getProfile);
router.route('/profile').get(userController.getProfile);
router.route('/buy').post(userController.buyTariff);

export default router;
