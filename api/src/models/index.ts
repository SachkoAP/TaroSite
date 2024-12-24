import { Sequelize } from 'sequelize';

import User from './user';
import TokenModel from './token-model';
import Course from './course';
import Block from './block';
import Video from './video';
import Test from './test';
import Question from './question';
import Answer from './answer';
import Payment from './payment';
import Progress from './progress';

const { DB_USER, DB_PWD, DB_HOST, DB_PORT, DB_NAME } = process.env;
export const models = { User, TokenModel, Course, Block, Video, Test, Question, Answer, Payment, Progress };

export const sequelize = new Sequelize(`${DB_NAME}`, `${DB_USER}`, `${DB_PWD}`, {
    host: `${DB_HOST}`,
    port: parseInt(`${DB_PORT}`),
    dialect: 'postgres',
    dialectOptions: {
        // multipleStatements: true,
        typeCast: true,
    },
    define: {
        charset: 'utf8mb4',
        collate: 'utf8mb4_unicode_ci',
        timestamps: true,
        underscored: true,
    },
    logging: false,
});
