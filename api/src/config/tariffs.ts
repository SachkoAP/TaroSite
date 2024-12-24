import { mapObjectKeys } from '../utils/mapper';

const tarriffs = {
    Нет: 1,
    Базовый: 2,
    Стандартный: 3,
    Про: 4,
};

export const tariffValue = {
    2: 5555,
    3: 15555,
    4: 35555,
};
export default tarriffs;
export const mapTariffs = mapObjectKeys(tarriffs);
