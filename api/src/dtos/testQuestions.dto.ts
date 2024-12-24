import QuestionDto from './question.dto';
import Test from '../models/test';

export default class TestQuestionsDto {
    id!: string;
    questions?: QuestionDto[];

    constructor(model: Test) {
        this.id = model.id;
        this.questions = model.Questions ? model.Questions.map(q => new QuestionDto(q)) : [];
    }
}
