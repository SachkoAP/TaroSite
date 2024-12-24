import UserService from './user.service';
import ApiError from '../utils/ApiError';
import httpStatus from 'http-status';
import Progress from '../models/progress';
import ProgressDto from '../dtos/progress.dto';

const getProgressByType = async (type: string, userId: string, objectId: string) => {
    const user = await UserService.getUserById(userId);
    if (!user) throw new ApiError(httpStatus.BAD_REQUEST, 'Not found user with id ' + userId);
    const progress = await Progress.findOne({ where: { type, userId, objectId } });
    if (!progress) return null;
    else return new ProgressDto(progress);
};

export default {
    getProgressByType,
};
