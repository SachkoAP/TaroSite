import courseController from '../controllers/course.controller';
import { Router } from 'express';
import { v4 } from 'uuid';
import multer from 'multer';
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

router.route('/').get(courseController.getAll).post(upload.single('file'), courseController.create);
router.route('/:courseId').get(courseController.getOne).delete(courseController.destroy);
router.route('/:courseId/blocks').get(courseController.getBlocks);

export default router;
