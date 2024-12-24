import Answer from '../models/answer';

export default class AnswerDto {
    id!: string;
    text!: string;

    constructor(model: Answer) {
        this.id = model.id;
        this.text = model.text;
    }
}
