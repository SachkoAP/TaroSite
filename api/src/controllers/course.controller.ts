import courseService from '../services/course.service';
import catchAsync from '../utils/catchAsync';
import ApiError from '../utils/ApiError';
import httpStatus from 'http-status';
import Jwt from '../utils/jwt';

const getAll = catchAsync(async (req, res) => {
    const { refreshToken } = req.cookies;
    const userData: any = Jwt.decode(refreshToken);
    const userId = userData.id;
    if (!userId) throw new ApiError(httpStatus.BAD_REQUEST, 'Missing user id');
    const courses = await courseService.getAllCourses(userId);
    res.json(courses);
});

const getOne = catchAsync(async (req, res) => {
    const { courseId } = req.params;
    const course = await courseService.getCourseById(courseId);
    res.json(course);
});

const create = catchAsync(async (req, res) => {
    const { name } = req.body;
    let { tariffs } = req.body;
    const fileName = req.file?.filename;
    if (tariffs && typeof tariffs === 'string')
        tariffs = tariffs
            .slice(1, -1)
            .split(',')
            .map(t => parseInt(t));
    else if (tariffs && typeof tariffs !== 'object') throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid tariffs');
    if (!name) throw new ApiError(httpStatus.BAD_REQUEST, 'Missing name');
    if (!fileName) throw new ApiError(httpStatus.BAD_REQUEST, 'Missing file');
    const course = await courseService.createCourse(name, tariffs, fileName);
    res.json(course);
});

const destroy = catchAsync(async (req, res) => {
    const { courseId } = req.params;
    await courseService.destroyCourse(courseId);
    res.json({ status: 'OK' });
});

const getBlocks = catchAsync(async (req, res) => {
    const { courseId } = req.params;
    const blocks = await courseService.getCourseBlocks(courseId);
    res.json(blocks);
});

export default {
    getAll,
    getOne,
    create,
    destroy,
    getBlocks,
};
