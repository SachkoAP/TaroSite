import User from '../models/user';
import { mapTariffs } from '../config/tariffs';
export default class UserDto {
    id!: string;
    name?: string;
    phone!: string;
    isConfirmed!: boolean;
    tariff!: number;
    constructor(model: User) {
        this.id = model.id;
        this.name = model.name;
        this.phone = model.phone;
        this.isConfirmed = model.isConfirmed;
        // @ts-expect-error map
        this.tariff = mapTariffs[model.tariff];
    }
}
