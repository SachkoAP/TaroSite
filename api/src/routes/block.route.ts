import { Router } from 'express';
import blockController from '../controllers/block.controller';
import multer from 'multer';
import { v4 } from 'uuid';
import path from 'path';

const router = Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads');
    },
    filename: function (req, file, cb) {
        cb(null, `${v4()}.${file.originalname.split('.')[1]}`);
    },
});

const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        const acceptedExtensionsList = ['.jpg', '.jpeg', '.png'];
        const extname = path.extname(file.originalname).toLowerCase();
        if (acceptedExtensionsList.includes(extname)) {
            cb(null, true);
        } else {
            cb(new Error('Invalid file extension'));
        }
    },
});

router.route('/').post(upload.single('file'), blockController.create);
router
    .route('/:blockId')
    .get(blockController.getOne)
    .delete(blockController.destroy)
    .patch(upload.single('file'), blockController.update);
router.route('/:blockId/inner').get(blockController.getInner);

export default router;
