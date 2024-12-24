import Answer from '../models/answer';
import questionService from './question.service';
import ApiError from '../utils/ApiError';
import httpStatus from 'http-status';
import AnswerDto from '../dtos/answer.dto';

const createAnswer = async (text: string, isCorrect: boolean, questionId: string): Promise<AnswerDto> => {
    if (!(await questionService.getQuestionById(questionId)))
        throw new ApiError(httpStatus.BAD_REQUEST, 'Not found question with id ' + questionId);
    const answer = await Answer.create({ text, isCorrect, questionId });
    return new AnswerDto(answer);
};

const destroyAnswer = async (answerId: string): Promise<void> => {
    const answer = await Answer.findByPk(answerId);
    if (!answer) throw new ApiError(httpStatus.BAD_REQUEST, 'Not found answer with id ' + answerId);
    await answer.destroy();
};

export default {
    createAnswer,
    destroyAnswer,
};
