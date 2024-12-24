import User from '../models/user';
import smsService from './sms.service';
import ApiError from '../utils/ApiError';
import httpStatus from 'http-status';
import UserDto from '../dtos/user.dto';
import userService from './user.service';
import jwtUtils from '../utils/jwt';

type data = {
    accessToken: string;
    refreshToken: string;
    user: UserDto;
};

const registerByPhone = async (phone: string, name: string): Promise<void> => {
    const checkUser = await userService.findUserByPhone(phone);
    if (checkUser && checkUser.isConfirmed) throw new ApiError(httpStatus.BAD_REQUEST, 'Already exists user');
    const code = await smsService.sendFCallRed(phone);
    await User.findOrCreate({
        where: { phone },
        defaults: { tempCode: code, phone, name },
    }).then(async ([user, created]) => {
        if (!created) {
            user.tempCode = code;
            await user.save();
        }
        setTimeout(
            async () => {
                user.tempCode = null;
                await user.save();
            },
            1000 * 60 * 10
        );
    });
};

const renewCode = async (phone: string): Promise<void> => {
    const user = await userService.findUserByPhone(phone);
    if (!user) throw new ApiError(httpStatus.BAD_REQUEST, 'Not found user');
    const code = await smsService.sendSMSRed(phone);
    await user.update({ tempCode: code }).then(async user => {
        setTimeout(
            async () => {
                user.tempCode = null;
                await user.save();
            },
            1000 * 60 * 10
        );
    });
};

const confirm = async (phone: string, code: string): Promise<data> => {
    const user = await userService.findUserByPhone(phone);
    if (!user) throw new ApiError(httpStatus.BAD_REQUEST, 'Not found user');
    if (!code.match(/^[0-9]+$/g) || parseInt(code) !== user.tempCode)
        throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid code');
    if (!user.isConfirmed) {
        user.isConfirmed = true;
        await user.save();
    }
    const userDto = new UserDto(user);
    const { accessToken, refreshToken } = jwtUtils.generate({ ...userDto });
    await jwtUtils.saveToken(userDto.id, refreshToken);
    return {
        accessToken: accessToken,
        refreshToken: refreshToken,
        user: userDto,
    };
};

const loginByPhone = async (phone: string): Promise<void> => {
    const user = await userService.findUserByPhone(phone);
    if (!user) throw new ApiError(httpStatus.BAD_REQUEST, 'Not found user');
    user.tempCode = await smsService.sendFCallRed(phone);
    await user.save().then(async user => {
        setTimeout(
            async () => {
                user.tempCode = null;
                await user.save();
            },
            1000 * 60 * 10
        );
    });
};

export default {
    registerByPhone,
    renewCode,
    confirm,
    loginByPhone,
};
