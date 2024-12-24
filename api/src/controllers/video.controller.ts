import catchAsync from '../utils/catchAsync';
import ApiError from '../utils/ApiError';
import httpStatus from 'http-status';
import videoService from '../services/video.service';
import Jwt from '../utils/jwt';
import UserService from '../services/user.service';

const createOrUpdate = catchAsync(async (req, res) => {
    const { name, blockId, duration, number, fileName } = req.body;

    if (!fileName) throw new ApiError(httpStatus.BAD_REQUEST, 'Missing file');
    if (!name) throw new ApiError(httpStatus.BAD_REQUEST, 'Missing name');
    if (!blockId) throw new ApiError(httpStatus.BAD_REQUEST, 'Missing blockId');

    const video = await videoService.createOrUpdateVideo(name, fileName, duration, number, blockId);
    res.json(video);
});

const getOne = catchAsync(async (req, res) => {
    const { videoId } = req.params;
    if (!videoId) throw new ApiError(httpStatus.BAD_REQUEST, 'Missing videoId');
    const video = await videoService.getOneVideo(videoId);
    res.json(video);
});

const getBlockVideos = catchAsync(async (req, res) => {
    const { blockId } = req.params;
    if (!blockId) throw new ApiError(httpStatus.BAD_REQUEST, 'Missing blockId');
    const videos = await videoService.getBlocksVideos(blockId);
    res.json(videos);
});

const setWatched = catchAsync(async (req, res) => {
    const { refreshToken } = req.cookies;
    const { videoId } = req.params;
    const userData: any = Jwt.decode(refreshToken);
    const userId = userData.id;
    if (!videoId) throw new ApiError(httpStatus.BAD_REQUEST, 'Missing videoId');
    if (!userId) throw new ApiError(httpStatus.UNAUTHORIZED, 'User unauthorized');
    const user = await UserService.getUserById(userId);
    if (!user) throw new ApiError(httpStatus.UNAUTHORIZED, 'User unauthorized');
    const progress = await videoService.setVideoWatched(videoId, userId);
    res.json(progress);
});

export default {
    createOrUpdate,
    getOne,
    getBlockVideos,
    setWatched,
};
