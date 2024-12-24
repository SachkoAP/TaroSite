import catchAsync from '../utils/catchAsync';
import ApiError from '../utils/ApiError';
import httpStatus from 'http-status';
import userService from '../services/user.service';
import Jwt from '../utils/jwt';

const getProfile = catchAsync(async (req, res) => {
    const { refreshToken } = req.cookies;
    const userData: any = Jwt.decode(refreshToken);
    const userId = userData.id;
    if (!userId) throw new ApiError(httpStatus.BAD_REQUEST, 'Missing user id');
    const profile = await userService.getUserProfile(userId);
    res.json(profile);
});

const buyTariff = catchAsync(async (req, res) => {
    const { refreshToken } = req.cookies;
    const tariff = parseInt(req.body.tariff);
    if (!tariff) throw new ApiError(httpStatus.BAD_REQUEST, 'Missing tariff');
    if (![2, 3, 4].includes(tariff)) throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid tariff');
    const userData: any = Jwt.decode(refreshToken);
    const userId = userData.id;
    const redirectUrl = await userService.buyTariff(userId, tariff);
    res.json({ redirectUrl });
});

export default {
    getProfile,
    buyTariff,
};
