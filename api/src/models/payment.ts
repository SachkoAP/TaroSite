import { DataTypes, Model, Sequelize } from 'sequelize';

export default class Payment extends Model {
    id!: string;
    yookassaPyamentId!: string;
    description!: string;
    status!: string;

    static initialize(sequelize: Sequelize) {
        Payment.init(
            {
                id: {
                    type: DataTypes.UUID,
                    defaultValue: DataTypes.UUIDV4,
                    allowNull: false,
                    primaryKey: true,
                },
                yookassaPyamentId: {
                    type: DataTypes.UUID,
                    allowNull: false,
                },
                description: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                status: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
            },
            {
                sequelize,
                schema: 'public',
                modelName: 'Payment',
                tableName: 'payments',
                paranoid: true,
            }
        );
    }
}
