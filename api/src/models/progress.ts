import { DataTypes, Model, Sequelize } from 'sequelize';

export default class Progress extends Model {
    id!: string;
    type!: string;
    objectId!: string;
    userId!: string;
    progress!: number;

    static initialize(sequelize: Sequelize) {
        Progress.init(
            {
                id: {
                    type: DataTypes.UUID,
                    defaultValue: DataTypes.UUIDV4,
                    allowNull: false,
                    primaryKey: true,
                },
                type: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                objectId: {
                    type: DataTypes.UUID,
                    allowNull: false,
                },
                userId: {
                    type: DataTypes.UUID,
                    allowNull: false,
                },
                progress: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
            },
            {
                sequelize,
                schema: 'public',
                modelName: 'Progress',
                tableName: 'progress',
                paranoid: true,
            }
        );
    }
}
