// import { CronJob } from 'cron';
// import Video from '../models/video';
// import Question from '../models/question';
// import Course from '../models/course';
// import Block from '../models/block';
// import * as fs from 'node:fs';
//
// export default {
//     deleteUseless: new CronJob('00 00 * * *', async () => {
//         console.log('[CRON] Start deleteUseless');
//
//         const videos = await Video.findAll({ attributes: ['url480', 'url720', 'url1080', 'preview'] });
//         const questions = await Question.findAll({ attributes: ['file'] });
//         const courses = await Course.findAll({ attributes: ['photo'] });
//         const blocks = await Block.findAll({ attributes: ['photo'] });
//         const exist: any = [];
//         videos.forEach(video => exist.push(video.url480, video.url720, video.url1080, video.preview));
//         questions.forEach(question => exist.push(question.file));
//         courses.forEach(course => exist.push(course.photo));
//         blocks.forEach(block => exist.push(block.photo));
//
//         const testFolder = './uploads';
//         fs.readdirSync(testFolder).forEach(file => {
//             if (!exist.includes(file))
//                 fs.rm(`${testFolder}/${file}`, err => {
//                     if (err) {
//                         console.error(err.message);
//                         return;
//                     }
//                     console.log(`${file} deleted`);
//                 });
//         });
//
//         console.log('[CRON] End deleteUseless');
//     }),
// };
