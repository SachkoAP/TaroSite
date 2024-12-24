import { NextFunction, Request, Response } from 'express';
import ApiError from '../utils/ApiError';
import httpStatus from 'http-status';
import AdmZip from 'adm-zip';
import fs from 'fs';

const extract = (req: Request, res: Response, next: NextFunction) => {
    try {
        const fileName = req.file?.filename;
        const extractPath = `./uploads/${fileName.split('.')[0]}`;
        if (!fileName) throw new ApiError(httpStatus.BAD_REQUEST, 'Missing file');
        if (fileName.endsWith('.jpg')) {
            req.body.fileName = fileName;
            return next();
        }

        if (!fs.existsSync(extractPath)) {
            fs.mkdirSync(extractPath);
        }

        const zip = new AdmZip(`./uploads/${fileName}`);
        zip.extractAllTo(extractPath);

        let originalName;
        fs.readdirSync(extractPath).forEach(file => {
            originalName = file.split('_')[0];
        });
        fs.readdirSync('./uploads').forEach(file => {
            if (file === fileName)
                fs.unlink(`./uploads/${file}`, err => {
                    if (err) throw err;
                });
        });

        req.body.fileName = `${fileName.split('.')[0]}/${originalName}_output/${originalName}.m3u8`;
        next();
    } catch (e) {
        return next(e);
    }
};

export default {
    extract,
};
