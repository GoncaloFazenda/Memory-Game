import { whitelistKeys } from '@/store/whitelistKeysToPresist';
import moment from 'moment';
import * as z from 'zod';

export function validationErrorWrapper(fn: Function, typeName?: string) {
    try {
        const data = fn();
        return [data, null];
    } catch (error) {
        if (error instanceof z.ZodError) return [null, error.issues[0].message];
        return [null, 'Something went wrong' + typeName && ', try a different ' + typeName + '.'];
    }
}

export function formatTime(timeinSeconds: number) {
    const duration = moment.duration(timeinSeconds, 'seconds');

    // Formating the duration moment object as hh:mm:ss
    return moment.utc(duration.asMilliseconds()).format('HH:mm:ss');
}

export function clearLocalStorageWithExeption(exeption: [string] = ['']) {
    let keysToKepp = [...whitelistKeys, ...exeption];
    for (const key in localStorage) {
        if (localStorage.hasOwnProperty(key) && !keysToKepp.includes(key)) {
            localStorage.removeItem(key);
        }
    }
}
