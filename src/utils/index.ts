/**
 * Функция извлекает из строки массив чисел
 *
 * @example
 *  parseNumbers(`1, 23, 456, 78`);
 *  // returns: [1, 23, 456, 78]
 *
 * @param {string} str Строка для парсинга чисел
 * @returns {number[]} Возвращает массив с числами
 */
export const parseNumbers = (str: string): number[] => str.match(/(\d+)/g)?.map((n: string) => Number(n)) || [];

/**
 * Функция извлекает из строки массив строк
 *
 * @example
 *  parseStrings(`ru, fr, de`);
 *  // returns: ['ru', 'fr', 'de']
 *
 * @param {string} str Строка для парсинга строк
 * @returns {string[]} Возвращает массив со строками
 */
export const parseStrings = (str: string): string[] => str.match(/(\w+)/g)?.map((n: string) => n) || [];

/**
 * Функция лемматизации
 *
 * @example
 * lemma(1, ['день', 'дня', 'дней']); // returns: 1 день
 * lemma(2, ['день', 'дня', 'дней']); // returns: 2 дня
 * lemma(5, ['день', 'дня', 'дней']); // returns: 5 дней
 *
 * @param {number} num
 * @param {string[]} suffix - Леммы ["день", "дня", "дней"]
 * @returns {string} Возвращает строку с правильным склонением
 */
export const lemma = (num: number, suffix: string[] = ['день', 'дня', 'дней']) => {
    const keys = [2, 0, 1, 1, 1, 2];
    const mmod = num % 100;
    const suffixKey = mmod > 7 && mmod < 20 ? 2 : keys[mmod % 10 < 5 ? mmod % 10 : 5];

    return suffix[suffixKey];
};

/**
 * Асинхронная задержка выполнения
 *
 * @param {number} ms - задержка в миллисекундах
 */
export const wait = async (ms: number) => new Promise((resolve): void => {
    setTimeout(() => {
        resolve(true);
    }, ms);
});

/**
 * Преобразует первую букву строки в заглавную
 *
 * @param {string} str - Строка
 * @returns {string} Возвращает массив со строками
 */
export const capitalize = (str: string): string => (str ? str.charAt(0).toUpperCase() + str.slice(1) : str);

/**
 * Проверяет опцию в селекте или похожих структурах на пустоту
 *
 * @param {Array<object | string | number> | number | string | object} opt
 * @returns {boolean} Результат проверки опции на пустоту
 */
export const isEmpty = (opt: Array<object | string | number> | number | string | object): boolean => {
    if (opt === 0) {
        return false;
    }
    if (Array.isArray(opt) && opt.length === 0) {
        return true;
    }

    return !opt;
};

export const not = (fun: Function): (...params: Array<object | string | number>) => boolean => (...params: Array<object | string | number>) => !fun(...params);

export const includes = (str: undefined | null | boolean | string, query: string): boolean => {
    if (str === undefined) {
        str = 'undefined';
    }
    if (str === null) {
        str = 'null';
    }
    if (str === false) {
        str = 'false';
    }
    const text = str.toString().toLowerCase();

    return text.includes(query.trim());
};

export const flow = <T>(...fns: Function[]) => (x: T[]) => fns.reduce((v, f) => f(v), x);

/**
 * Вычисляет размер FormData вместе с файлами
 *
 * @returns {number} Размер в байтах
 * @param formData
 */
export const getFormDataSize = (formData: FormData): number => [...formData].reduce((size, [, value]: [string, FormDataEntryValue]) => size + (typeof value === 'string' ? value.length : value.size), 0);

export const findDuplicates = (array: number[]) => array.filter((item, index) => array.some((elem, idx) => elem === item && idx !== index));

/**
 * Форматирование длинных цифр
 *
 * @param {string | number} x - number(100000000)
 * @param {number} fractionDigits - число знаков после запятой
 * @return {string} - 100 000 000
 */
export const formatNumber = (x: string | number, fractionDigits: number = 2): string => (
    Number(x)
        .toFixed(fractionDigits)
        .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
);

export const isObject = (obj: any): boolean => obj !== null && typeof obj === 'object';

export const isEquals = (a: any, b: any): boolean => {
    if (a === b) {
        return true;
    }

    if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime();
    }

    if (!a || !b || (typeof a !== 'object' && typeof b !== 'object')) {
        return a === b;
    }

    if (isObject(a) !== isObject(b)) {
        return false;
    }

    const keys = Object.keys(a);

    if (keys.length !== Object.keys(b).length) {
        return false;
    }

    return keys.every((k) => isEquals(a[k], b[k]));
};
