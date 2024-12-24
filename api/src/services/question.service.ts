import Question from '../models/question';
import testService from './test.service';
import ApiError from '../utils/ApiError';
import httpStatus from 'http-status';
import QuestionDto from '../dtos/question.dto';

const getQuestionById = async (id: string): Promise<Question | null> => {
    const question = await Question.findByPk(id);
    if (!question) return null;
    return question;
};

const createQuestion = async (
    number: number,
    title: string,
    file: string | undefined,
    testId: string
): Promise<QuestionDto> => {
    if (!(await testService.getTestById(testId)))
        throw new ApiError(httpStatus.BAD_REQUEST, 'Not found test with id ' + testId);
    const question = await Question.create({ number, title, file, testId });
    return new QuestionDto(question);
};

const destroyQuestion = async (questionId: string): Promise<void> => {
    const question = await Question.findByPk(questionId);
    if (!question) throw new ApiError(httpStatus.BAD_REQUEST, 'Not found question with id ' + questionId);
    await question.destroy();
};

export default {
    createQuestion,
    getQuestionById,
    destroyQuestion,
};
