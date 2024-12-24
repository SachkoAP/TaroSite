import User from '../models/user';
import { mapTariffs } from '../config/tariffs';
import CourseDto from './course.dto';
import Course from '../models/course';

export default class ProfileDto {
    id!: string;
    name!: string;
    phone!: string;
    tariff!: number;
    courses?: CourseDto[];

    constructor(model: User, courses: Course[]) {
        this.id = model.id;
        this.name = model.name;
        this.phone = model.phone;
        // @ts-expect-error map
        this.tariff = mapTariffs[model.tariff];
        this.courses = courses.length !== 0 ? courses.map(c => new CourseDto(c)) : [];
    }
}
