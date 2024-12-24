import catchAsync from '../utils/catchAsync';
import ApiError from '../utils/ApiError';
import httpStatus from 'http-status';
import testService from '../services/test.service';
import Jwt from '../utils/jwt';

const create = catchAsync(async (req, res) => {
    const { blockId } = req.body;
    if (!blockId) throw new ApiError(httpStatus.BAD_REQUEST, 'Missing blockId');
    const test = await testService.createTest(blockId);
    res.json(test);
});

const getOne = catchAsync(async (req, res) => {
    const { testId } = req.params;
    if (!testId) throw new ApiError(httpStatus.BAD_REQUEST, 'Missing testId');
    const test = await testService.getOneTest(testId);
    res.json(test);
});

const destroy = catchAsync(async (req, res) => {
    const { testId } = req.params;
    if (!testId) throw new ApiError(httpStatus.BAD_REQUEST, 'Missing testId');
    await testService.destroyTest(testId);
    res.json({ status: 'OK' });
});

const check = catchAsync(async (req, res) => {
    const { refreshToken } = req.cookies;
    const userData: any = Jwt.decode(refreshToken);
    const userId = userData.id;
    const { id, answers } = req.body;
    if (!userId) throw new ApiError(httpStatus.BAD_REQUEST, 'Missing user id');
    if (!id) throw new ApiError(httpStatus.BAD_REQUEST, 'Missing id');
    if (!answers) throw new ApiError(httpStatus.BAD_REQUEST, 'Missing answers');
    const results = await testService.checkTest(id, answers, userId);
    res.json(results);
});

export default {
    create,
    getOne,
    destroy,
    check,
};
