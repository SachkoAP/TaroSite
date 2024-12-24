import Video from '../models/video';
import VideoDto from '../dtos/video.dto';
import Block from '../models/block';
import ApiError from '../utils/ApiError';
import httpStatus from 'http-status';
import Progress from '../models/progress';
import ProgressDto from '../dtos/progress.dto';

const createOrUpdateVideo = async (
    name: string,
    file: string,
    duration: number | undefined,
    number: number | undefined,
    blockId: string
): Promise<VideoDto> => {
    let video = await Video.findOne({ where: { name } });
    if (file.split('.')[1] === 'jpg') {
        if (video) await video.update({ preview: file, duration, number });
        else video = await Video.create({ name, preview: file, blockId, duration, number });
    } else if (video) {
        video = await video.update({
            m3u8: file,
            blockId,
            duration,
            number,
        });
    } else {
        video = await Video.create({
            name,
            m3u8: file,
            blockId,
            duration,
            number,
        });
    }
    return new VideoDto(video);
};

const getOneVideo = async (videoId: string): Promise<VideoDto | null> => {
    const video = await Video.findByPk(videoId, { include: [{ model: Block }] });
    if (!video) return null;
    return new VideoDto(video);
};

const getBlocksVideos = async (blockId: string): Promise<VideoDto[]> => {
    const block = await Block.findByPk(blockId, { include: [{ model: Video }] });
    if (!block) throw new ApiError(httpStatus.BAD_REQUEST, 'Not found block with id ' + blockId);
    const videos = block.Videos ? block.Videos.map(video => new VideoDto(video)) : [];
    videos.sort((a, b) => a.number - b.number);
    return videos;
};

const setVideoWatched = async (videoId: string, userId: string): Promise<ProgressDto> => {
    const checkVideo = await Progress.findOne({ where: { type: 'video', objectId: videoId, userId } });
    if (checkVideo) await checkVideo.destroy({ force: true });
    const progress = await Progress.create({ type: 'video', objectId: videoId, userId, progress: 100 });
    return new ProgressDto(progress);
};

export default {
    createOrUpdateVideo,
    getOneVideo,
    getBlocksVideos,
    setVideoWatched,
};
