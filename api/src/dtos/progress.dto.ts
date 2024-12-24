import Progress from '../models/progress';

export default class ProgressDto {
    id!: string;
    type!: string;
    objectId!: string;
    userId!: string;
    progress!: number;

    constructor(model: Progress) {
        this.id = model.id;
        this.type = model.type;
        this.objectId = model.id;
        this.userId = model.userId;
        this.progress = model.progress;
    }
}
