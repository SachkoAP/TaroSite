import Video from '../models/video';

export default class VideoDto {
    id!: string;
    name!: string;
    number!: number;
    m3u8?: string;
    preview?: string;
    duration!: number;
    blockId!: string;

    constructor(model: Video) {
        this.id = model.id;
        this.name = model.name;
        this.number = model.number;
        this.m3u8 = model.m3u8;
        this.preview = model.preview;
        this.duration = model.duration;
        this.blockId = model.blockId;
    }
}
