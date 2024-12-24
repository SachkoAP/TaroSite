import { Router } from 'express';
import videoController from '../controllers/video.controller';
import multer from 'multer';
import { v4 } from 'uuid';
import path from 'path';
import extract7z from '../middlewares/extract7z';

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
        const acceptedExtensionsList = ['.zip', '.jpg'];
        const extname = path.extname(file.originalname).toLowerCase();
        if (acceptedExtensionsList.includes(extname)) {
            cb(null, true);
        } else {
            cb(new Error('Invalid file extension'));
        }
    },
});

// router.route('/').post(upload.single('file'), videoController.createOrUpdate);
router.route('/').post(upload.single('file'), extract7z.extract, videoController.createOrUpdate);
router.route('/:videoId/watched').post(videoController.setWatched);
router.route('/:videoId').get(videoController.getOne);
router.route('/block/:blockId').get(videoController.getBlockVideos);

export default router;
