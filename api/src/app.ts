import express, { Express } from 'express';
import corsMiddleware from './middlewares/cors';
import cookieParser from 'cookie-parser';
import cookieSession from 'cookie-session';
import * as fs from 'fs';

import authRoute from './routes/auth.route';
import courseRoute from './routes/course.route';
import blockRoute from './routes/block.route';
import testRoute from './routes/test.route';
import questionRoute from './routes/question.route';
import answerRoute from './routes/answer.route';
import userRoute from './routes/user.route';
import videoRoute from './routes/video.route';
import progressRoute from './routes/progress.route';
// import cronService from './services/cron.service';

const app: Express = express();

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(corsMiddleware);
app.use(cookieParser());
app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [process.env.COOKIE_KEY as string],
    })
);

// uploader section
app.use('/uploads', express.static('./uploads'));
const dir = './uploads';
if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
}

// cron section
// cronService.deleteUseless.start();

app.use('/auth', authRoute);
app.use('/course', courseRoute);
app.use('/block', blockRoute);
app.use('/test', testRoute);
app.use('/question', questionRoute);
app.use('/answer', answerRoute);
app.use('/user', userRoute);
app.use('/video', videoRoute);
app.use('/progress', progressRoute);

// uploader section
// app.use('/uploads', express.static('./uploads'));
// const dir = './uploads';
// if (!fs.existsSync(dir)) {
//     fs.mkdirSync(dir);
// }

export default app;
