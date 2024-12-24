import Question from '../models/question';
import AnswerDto from './answer.dto';

export default class QuestionDto {
    id!: string;
    title?: string;
    number!: number;
    file?: string;
    answers?: AnswerDto[];

    constructor(model: Question) {
        this.id = model.id;
        this.title = model.title;
        this.number = model.number;
        this.file = model.file;
        this.answers = model.Answers ? model.Answers.map(a => new AnswerDto(a)) : [];
    }
}
