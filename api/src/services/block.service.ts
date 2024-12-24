import ApiError from '../utils/ApiError';
import httpStatus from 'http-status';
import Block from '../models/block';
import BlockDto from '../dtos/block.dto';
import courseService from './course.service';
import Test from '../models/test';
import TestDto from '../dtos/test.dto';
import Video from '../models/video';
import VideoDto from '../dtos/video.dto';

type blockInner = {
    videos: VideoDto[];
    test: TestDto;
};

const getBlockById = async (blockId: string): Promise<BlockDto | null> => {
    const block = await Block.findByPk(blockId, { include: [{ model: Test }] });
    if (!block) return null;
    return new BlockDto(block);
};

const getBlockInner = async (blockId: string): Promise<blockInner> => {
    const test = await Test.findOne({ where: { blockId } });
    const videos = await Video.findAll({ where: { blockId }, order: [['number', 'ASC']] });
    if (!test) throw new ApiError(httpStatus.BAD_REQUEST, 'Not found test in block with id ' + blockId);
    return {
        videos: videos.map(video => new VideoDto(video)),
        test: new TestDto(test),
    };
};

const createBlock = async (
    name: string,
    courseId: string,
    fileName: string | undefined,
    number: number | undefined
): Promise<BlockDto> => {
    if (!(await courseService.getCourseById(courseId)))
        throw new ApiError(httpStatus.NOT_FOUND, 'Not found course with id ' + courseId);
    const block = await Block.create({ name, courseId, photo: fileName, number });
    return new BlockDto(block);
};

const destroyBlock = async (blockId: string): Promise<void> => {
    const block = await Block.findByPk(blockId);
    if (!block) throw new ApiError(httpStatus.BAD_REQUEST, 'Not found block');
    await Block.destroy({ where: { id: blockId } });
};

const updateBlock = async (
    blockId: string,
    name: string | undefined,
    courseId: string | undefined,
    fileName: string | undefined,
    number: number | undefined
): Promise<void> => {
    if (!(await getBlockById(blockId))) throw new ApiError(httpStatus.NOT_FOUND, 'Not found block with id ' + blockId);
    if (courseId && !(await courseService.getCourseById(courseId)))
        throw new ApiError(httpStatus.NOT_FOUND, 'Not found course with id ' + courseId);
    await Block.update({ name, courseId, photo: fileName, number }, { where: { id: blockId } });
};

export default {
    getBlockById,
    createBlock,
    destroyBlock,
    getBlockInner,
    updateBlock,
};
