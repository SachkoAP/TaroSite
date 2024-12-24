import { DataTypes, Model, Sequelize } from 'sequelize';
import Block from './block';

export default class Video extends Model {
    id!: string;
    name!: string;
    number!: number;
    m3u8?: string;
    preview?: string;
    duration!: number;
    blockId!: string;
    Block!: Block;

    static initialize(sequelize: Sequelize) {
        Video.init(
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
                    unique: true,
                },
                number: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    defaultValue: 1,
                },
                m3u8: {
                    type: DataTypes.STRING,
                    allowNull: true,
                },
                preview: {
                    type: DataTypes.STRING,
                    allowNull: true,
                },
                duration: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    defaultValue: 0,
                },
            },
            {
                sequelize,
                schema: 'public',
                modelName: 'Video',
                tableName: 'videos',
                paranoid: true,
            }
        );
    }
}
