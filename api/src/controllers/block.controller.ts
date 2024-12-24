import catchAsync from '../utils/catchAsync';
import ApiError from '../utils/ApiError';
import httpStatus from 'http-status';
import blockService from '../services/block.service';

const getOne = catchAsync(async (req, res) => {
    const { blockId } = req.params;
    const block = await blockService.getBlockById(blockId);
    res.json(block);
});

const create = catchAsync(async (req, res) => {
    const { name, courseId, number } = req.body;
    const fileName = req.file?.filename;
    if (!name) throw new ApiError(httpStatus.BAD_REQUEST, 'Missing name');
    if (!courseId) throw new ApiError(httpStatus.BAD_REQUEST, 'Missing courseId');
    const block = await blockService.createBlock(name, courseId, fileName, number);
    res.json(block);
});

const getInner = catchAsync(async (req, res) => {
    const { blockId } = req.params;
    const data = await blockService.getBlockInner(blockId);
    res.json(data);
});

const destroy = catchAsync(async (req, res) => {
    const { blockId } = req.params;
    await blockService.destroyBlock(blockId);
    res.json({ status: 'OK' });
});

const update = catchAsync(async (req, res) => {
    const { blockId } = req.params;
    const { name, courseId, number } = req.body;
    const fileName = req.file?.filename;
    if (!blockId) throw new ApiError(httpStatus.BAD_REQUEST, 'Missing blockId');
    await blockService.updateBlock(blockId, name, courseId, fileName, number);
    res.json({ status: 'OK' });
});

export default {
    getOne,
    create,
    destroy,
    getInner,
    update,
};
