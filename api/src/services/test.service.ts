import blockService from './block.service';
import ApiError from '../utils/ApiError';
import httpStatus from 'http-status';
import Test from '../models/test';
import TestQuestionsDto from '../dtos/testQuestions.dto';
import Question from '../models/question';
import Answer from '../models/answer';
import TestDto from '../dtos/test.dto';
import Progress from '../models/progress';

type results = {
    percent: number;
    countAll: number;
    countRight: number;
};

const getTestById = async (id: string): Promise<Test | null> => {
    const test = await Test.findByPk(id);
    if (!test) return null;
    return test;
};

const destroyTest = async (id: string): Promise<void> => {
    const test = await Test.findByPk(id);
    if (!test) throw new ApiError(httpStatus.BAD_REQUEST, 'Not Found test with id ' + id);
    await test.destroy();
};

const createTest = async (blockId: string): Promise<TestDto> => {
    if (!(await blockService.getBlockById(blockId)))
        throw new ApiError(httpStatus.BAD_REQUEST, 'Not found block with id ' + blockId);
    const test = await Test.create({ blockId });
    return new TestDto(test);
};

const getOneTest = async (testId: string): Promise<TestQuestionsDto> => {
    const test = await Test.findByPk(testId, {
        include: [{ model: Question, include: [{ model: Answer }], order: ['number', 'ASC'] }],
    });
    if (!test) throw new ApiError(httpStatus.BAD_REQUEST, 'Not found test with id ' + testId);
    return new TestQuestionsDto(test);
};

const checkTest = async (id: string, answers: any, userId: string): Promise<results> => {
    const test = await Test.findByPk(id, { include: [{ model: Question }] });
    if (!test) throw new ApiError(httpStatus.BAD_REQUEST, 'Not found test with id ' + id);
    if (!test.Questions) throw new ApiError(httpStatus.BAD_REQUEST, 'No any questions in test');
    if (answers.length !== test.Questions.length) throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid answers');
    const checkingAnswers = await Answer.findAll({ where: { id: answers } });
    const testResults = {
        percent: 0,
        countAll: answers.length,
        countRight: 0,
    } as results;
    checkingAnswers.forEach((answer: any) => {
        if (answer.isCorrect) testResults.countRight++;
    });
    testResults.percent = (testResults.countRight / testResults.countAll) * 100;
    const checkTest = await Progress.findOne({ where: { type: 'test', objectId: id, userId } });
    if (checkTest) await checkTest.destroy({ force: true });
    await Progress.create({ type: 'test', objectId: id, userId, progress: testResults.percent.toFixed(0) });
    return testResults;
};

export default {
    createTest,
    getTestById,
    getOneTest,
    destroyTest,
    checkTest,
};
