import { DataTypes, Model, Sequelize } from 'sequelize';
export default class Answer extends Model {
    id!: string;
    text!: string;
    isCorrect!: boolean;

    static initialize(sequelize: Sequelize) {
        Answer.init(
            {
                id: {
                    type: DataTypes.UUID,
                    defaultValue: DataTypes.UUIDV4,
                    allowNull: false,
                    primaryKey: true,
                },
                text: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                isCorrect: {
                    type: DataTypes.BOOLEAN,
                    allowNull: false,
                    defaultValue: false,
                },
            },
            {
                sequelize,
                schema: 'public',
                modelName: 'Answer',
                tableName: 'answers',
                paranoid: true,
            }
        );
    }
}
