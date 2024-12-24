import CourseDto from '../dtos/course.dto';
import Course from '../models/course';
import ApiError from '../utils/ApiError';
import httpStatus from 'http-status';
import BlockDto from '../dtos/block.dto';
import Block from '../models/block';
import User from '../models/user';
import { Op } from 'sequelize';
import Test from '../models/test';

const getCourseById = async (courseId: string): Promise<CourseDto | null> => {
    const course = await Course.findByPk(courseId);
    if (!course) return null;
    return new CourseDto(course);
};

const getAllCourses = async (userId: string): Promise<CourseDto[]> => {
    const user = await User.findByPk(userId);
    if (!user) throw new ApiError(httpStatus.BAD_REQUEST, 'Not found user with id ' + userId);
    const courses = await Course.findAll({ where: { tariff: { [Op.contains]: [user.tariff] } } });
    return courses.map(c => new CourseDto(c));
};

const createCourse = async (name: string, tariffs: object | undefined, fileName: string): Promise<CourseDto> => {
    const checkCourse = await Course.findOne({ where: { name } });
    if (checkCourse) throw new ApiError(httpStatus.BAD_REQUEST, 'Already exists course');
    const course = await Course.create({ name, photo: fileName, tariff: tariffs });
    return new CourseDto(course);
};

const destroyCourse = async (courseId: string): Promise<void> => {
    const course = await Course.findByPk(courseId);
    if (!course) throw new ApiError(httpStatus.BAD_REQUEST, 'Not found course');
    await Course.destroy({ where: { id: courseId } });
};

const getCourseBlocks = async (courseId: string): Promise<BlockDto[] | []> => {
    const course = await Course.findByPk(courseId, {
        include: [{ model: Block, include: [{ model: Course }] }],
    });
    if (!course) throw new ApiError(httpStatus.BAD_REQUEST, 'Not found course');
    const blocks = course.Blocks?.sort((a, b) => {
        return a.number - b.number;
    });
    if (!blocks) throw new ApiError(httpStatus.BAD_REQUEST, 'Not found blocks');
    for (const b of blocks) {
        b.Test = (await Test.findOne({ where: { blockId: b.id } })) || undefined;
    }
    return blocks ? blocks.map(b => new BlockDto(b)) : [];
};

export default {
    getCourseById,
    getAllCourses,
    createCourse,
    destroyCourse,
    getCourseBlocks,
};
