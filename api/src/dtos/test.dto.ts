import Test from '../models/test';

export default class TestDto {
    id!: string;

    constructor(model: Test) {
        this.id = model.id;
    }
}
