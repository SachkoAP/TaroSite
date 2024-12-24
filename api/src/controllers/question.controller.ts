import catchAsync from '../utils/catchAsync';
import ApiError from '../utils/ApiError';
import httpStatus from 'http-status';
import questionService from '../services/question.service';

const create = catchAsync(async (req, res) => {
    const { number, title, testId } = req.body;
    const fileName = req.file?.filename;
    if (!number) throw new ApiError(httpStatus.BAD_REQUEST, 'Missing number');
    if (!title) throw new ApiError(httpStatus.BAD_REQUEST, 'Missing title');
    if (!testId) throw new ApiError(httpStatus.BAD_REQUEST, 'Missing testId');
    const question = await questionService.createQuestion(number, title, fileName, testId);
    res.json(question);
});

const destroy = catchAsync(async (req, res) => {
    const { questionId } = req.params;
    if (!questionId) throw new ApiError(httpStatus.BAD_REQUEST, 'Missing questionId');
    await questionService.destroyQuestion(questionId);
    res.json({ status: 'OK' });
});

export default {
    create,
    destroy,
};
