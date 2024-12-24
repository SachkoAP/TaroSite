import { DataTypes, Model, Sequelize } from 'sequelize';
import Test from './test';
import Video from './video';

export default class Block extends Model {
    id!: string;
    name!: string;
    number!: number;
    courseId!: string;
    photo?: string;
    Test?: Test;
    Videos?: Video[];

    static initialize(sequelize: Sequelize) {
        Block.init(
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
                    defaultValue: 1,
                },
                name: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                photo: {
                    type: DataTypes.STRING,
                    allowNull: true,
                },
            },
            {
                sequelize,
                schema: 'public',
                modelName: 'Block',
                tableName: 'blocks',
                paranoid: true,
            }
        );
    }
}
