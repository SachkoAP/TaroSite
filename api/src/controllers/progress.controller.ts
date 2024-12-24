import catchAsync from '../utils/catchAsync';
import ApiError from '../utils/ApiError';
import httpStatus from 'http-status';
import progressTypes from '../config/progress-types';
import progressService from '../services/progress.service';
import Jwt from '../utils/jwt';

const getType = catchAsync(async (req, res) => {
    const { refreshToken } = req.cookies;
    const { type, objectId } = req.params;
    const userData: any = Jwt.decode(refreshToken);
    const userId = userData.id;

    if (!userId) throw new ApiError(httpStatus.BAD_REQUEST, 'Missing user id');
    if (!type) throw new ApiError(httpStatus.BAD_REQUEST, 'Missing type');
    if (!objectId) throw new ApiError(httpStatus.BAD_REQUEST, 'Missing objectId');
    if (!progressTypes.includes(type)) throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid type');

    const progress = await progressService.getProgressByType(type, userId, objectId);

    res.json(progress);
});

export default {
    getType,
};
