import { DataTypes, Model, Sequelize } from 'sequelize';
import tariffs from '../config/tariffs';
export default class User extends Model {
    id!: string;
    name!: string;
    phone!: string;
    telegram?: string;
    vkontakte?: string;
    tariff!: string;
    isConfirmed!: boolean;
    tempCode?: number | null;
    static initialize(sequelize: Sequelize) {
        User.init(
            {
                id: {
                    type: DataTypes.UUID,
                    defaultValue: DataTypes.UUIDV4,
                    allowNull: false,
                    primaryKey: true,
                },
                name: {
                    type: DataTypes.STRING,
                    allowNull: true,
                },
                phone: {
                    type: DataTypes.CHAR(10),
                    allowNull: false,
                    unique: true,
                },
                telegram: {
                    type: DataTypes.STRING,
                    allowNull: true,
                },
                vkontakte: {
                    type: DataTypes.STRING,
                    allowNull: true,
                },
                tariff: {
                    type: DataTypes.SMALLINT,
                    allowNull: false,
                    validate: {
                        isIn: [Object.values(tariffs)],
                    },
                    defaultValue: 1,
                },
                isConfirmed: {
                    type: DataTypes.BOOLEAN,
                    allowNull: false,
                    defaultValue: false,
                },
                tempCode: {
                    type: DataTypes.INTEGER,
                    allowNull: true,
                },
            },
            {
                sequelize,
                schema: 'public',
                modelName: 'User',
                tableName: 'users',
                paranoid: true,
            }
        );
    }
}
