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
