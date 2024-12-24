import Block from '../models/block';

export default class BlockDto {
    id!: string;
    number!: number;
    name!: string;
    photo?: string;
    testId?: string;

    constructor(model: Block) {
        this.id = model.id;
        this.number = model.number;
        this.name = model.name;
        this.photo = model.photo;
        this.testId = model.Test ? model.Test.id : undefined;
    }
}
