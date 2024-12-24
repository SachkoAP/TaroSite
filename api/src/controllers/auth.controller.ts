import catchAsync from '../utils/catchAsync';
import authService from '../services/auth.service';
import ApiError from '../utils/ApiError';
import httpStatus from 'http-status';

const registerByPhone = catchAsync(async (req, res) => {
    const { phone, name } = req.body;
    if (!phone) throw new ApiError(httpStatus.BAD_REQUEST, 'Missing phone');
    if (!phone.match(/^\d{10}$/g)) throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid phone');
    if (!name) throw new ApiError(httpStatus.BAD_REQUEST, 'Missing name');
    await authService.registerByPhone(phone, name);
    res.json({ status: 'OK' });
});

const renewCode = catchAsync(async (req, res) => {
    const { phone } = req.body;
    if (!phone) throw new ApiError(httpStatus.BAD_REQUEST, 'Missing phone');
    if (!phone.match(/^\d{10}$/g)) throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid phone');
    await authService.renewCode(phone);
    res.json({ status: 'OK' });
});

const confirm = catchAsync(async (req, res) => {
    const { phone, code } = req.body;
    if (!code) throw new ApiError(httpStatus.BAD_REQUEST, 'Missing code');
    if (!phone) throw new ApiError(httpStatus.BAD_REQUEST, 'Missing phone');
    if (!phone.match(/^\d{10}$/g)) throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid phone');
    const userData = await authService.confirm(phone, code);
    res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
    res.json(userData);
});

const loginByPhone = catchAsync(async (req, res) => {
    const { phone } = req.body;
    if (!phone) throw new ApiError(httpStatus.BAD_REQUEST, 'Missing phone');
    if (!phone.match(/^\d{10}$/g)) throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid phone');
    await authService.loginByPhone(phone);
    res.json({ status: 'OK' });
});

export default {
    registerByPhone,
    renewCode,
    confirm,
    loginByPhone,
};
