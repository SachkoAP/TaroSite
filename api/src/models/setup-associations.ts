import { models } from './index';

const { User, TokenModel, Course, Block, Video, Test, Question, Answer, Payment, Progress } = models;

export default function () {
    User.hasOne(TokenModel, { foreignKey: 'userId' });
    TokenModel.belongsTo(User, { foreignKey: 'userId' });

    Course.hasMany(Block, { foreignKey: 'courseId' });
    Block.belongsTo(Course, { foreignKey: 'courseId' });

    Block.hasMany(Video, { foreignKey: 'blockId' });
    Video.belongsTo(Block, { foreignKey: 'blockId' });

    Block.hasMany(Test, { foreignKey: 'blockId' });
    Test.belongsTo(Block, { foreignKey: 'blockId' });

    Test.hasMany(Question, { foreignKey: 'testId' });
    Question.belongsTo(Test, { foreignKey: 'testId' });

    Question.hasMany(Answer, { foreignKey: 'questionId' });
    Answer.belongsTo(Question, { foreignKey: 'questionId' });

    User.hasOne(Payment, { foreignKey: 'userId' });
    Payment.belongsTo(User, { foreignKey: 'userId' });

    User.hasMany(Progress, { foreignKey: 'userId' });
    Progress.belongsTo(User, { foreignKey: 'userId' });
}
