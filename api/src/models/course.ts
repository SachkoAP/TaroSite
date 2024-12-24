import { DataTypes, Model, Sequelize } from 'sequelize';
import Block from './block';

export default class Course extends Model {
    id!: string;
    name!: string;
    photo?: string;
    tariff!: number[];
    Blocks?: Block[];

    static initialize(sequelize: Sequelize) {
        Course.init(
            {
                id: {
                    type: DataTypes.UUID,
                    defaultValue: DataTypes.UUIDV4,
                    allowNull: false,
                    primaryKey: true,
                },
                name: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                photo: {
                    type: DataTypes.STRING,
                    allowNull: true,
                },
                tariff: {
                    type: DataTypes.ARRAY(DataTypes.SMALLINT),
                    allowNull: false,
                    defaultValue: [1],
                },
            },
            {
                sequelize,
                schema: 'public',
                modelName: 'Course',
                tableName: 'courses',
                paranoid: true,
            }
        );
    }
}
