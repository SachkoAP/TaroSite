import User from '../models/user';
import httpStatus from 'http-status';
import ApiError from '../utils/ApiError';
import tokenService from './token.service';
import Course from '../models/course';
import ProfileDto from '../dtos/profile.dto';
import { mapTariffs, tariffValue } from '../config/tariffs';
import kassa from '../utils/kassa';
import { Op } from 'sequelize';
const findUserByPhone = async (phone: string): Promise<User | null> => {
    return await User.findOne({ where: { phone } });
};

const getUserProfile = async (userId: string): Promise<ProfileDto> => {
    const user = await getUserById(userId);
    if (!user) throw new ApiError(httpStatus.BAD_REQUEST, 'Not found user with id ' + userId);
    const courses = await Course.findAll({ where: { tariff: { [Op.contains]: [user.tariff] } } });
    return new ProfileDto(user, courses);
};

const getUserByRefreshToken = async (refreshToken: string): Promise<User | null> => {
    const token = await tokenService.getTokenByRefreshToken(refreshToken);
    if (!token) throw new ApiError(httpStatus.BAD_REQUEST, 'Not found token');
    return await getUserById(token.userId);
};

const getUserById = async (userId: string): Promise<User | null> => {
    return User.findByPk(userId);
};

const buyTariff = async (userId: string, tariff: number): Promise<string> => {
    // @ts-expect-error all checks on top lvl
    const tariffName = mapTariffs[tariff];
    // @ts-expect-error all checks on top lvl
    const value = tariffValue[tariff];
    const reqData = await kassa.createPayment(userId, value.toString() + '.00', tariffName, tariff);
    return reqData.confirmation.confirmation_url;
};

export default {
    findUserByPhone,
    getUserProfile,
    getUserByRefreshToken,
    getUserById,
    buyTariff,
};
