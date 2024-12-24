import catchAsync from '../utils/catchAsync';
import ApiError from '../utils/ApiError';
import httpStatus from 'http-status';
import answerService from '../services/answer.service';

const create = catchAsync(async (req, res) => {
    const { text, isCorrect, questionId } = req.body;
    if (!text) throw new ApiError(httpStatus.BAD_REQUEST, 'Missing text');
    if (typeof isCorrect === 'undefined') throw new ApiError(httpStatus.BAD_REQUEST, 'Missing isCorrect');
    if (!questionId) throw new ApiError(httpStatus.BAD_REQUEST, 'Missing questionId');
    const answer = await answerService.createAnswer(text, isCorrect, questionId);
    res.json(answer);
});

const destroy = catchAsync(async (req, res) => {
    const { answerId } = req.params;
    if (!answerId) throw new ApiError(httpStatus.BAD_REQUEST, 'Missing answerId');
    await answerService.destroyAnswer(answerId);
    res.json({ status: 'OK' });
});

export default {
    create,
    destroy,
};
