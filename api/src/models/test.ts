import { DataTypes, Model, Sequelize } from 'sequelize';
import Question from './question';
export default class Test extends Model {
    id!: string;
    Questions?: Question[];

    static initialize(sequelize: Sequelize) {
        Test.init(
            {
                id: {
                    type: DataTypes.UUID,
                    defaultValue: DataTypes.UUIDV4,
                    allowNull: false,
                    primaryKey: true,
                },
            },
            {
                sequelize,
                schema: 'public',
                modelName: 'Test',
                tableName: 'tests',
                paranoid: true,
            }
        );
    }
}
