import { DataTypes, Model, Sequelize } from 'sequelize';
import Answer from './answer';
export default class Question extends Model {
    id!: string;
    title!: string;
    number!: number;
    file?: string;
    Answers?: Answer[];

    static initialize(sequelize: Sequelize) {
        Question.init(
            {
                id: {
                    type: DataTypes.UUID,
                    defaultValue: DataTypes.UUIDV4,
                    allowNull: false,
                    primaryKey: true,
                },
                number: {
                    type: DataTypes.SMALLINT,
                    allowNull: false,
                },
                file: {
                    type: DataTypes.STRING,
                    allowNull: true,
                },
                title: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
            },
            {
                sequelize,
                schema: 'public',
                modelName: 'Question',
                tableName: 'questions',
                paranoid: true,
            }
        );
    }
}
