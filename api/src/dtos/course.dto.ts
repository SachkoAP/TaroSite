import Course from '../models/course';
import { mapTariffs } from '../config/tariffs';

export default class CourseDto {
    id!: string;
    name!: string;
    photo?: string;
    tariff!: number[];

    constructor(model: Course) {
        this.id = model.id;
        this.name = model.name;
        this.photo = model.photo;
        // @ts-expect-error map
        this.tariff = model.tariff.map(t => mapTariffs[t]);
    }
}
