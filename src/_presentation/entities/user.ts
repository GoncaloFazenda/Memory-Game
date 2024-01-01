import { z } from 'zod';

export const UserCredentials = z.object({
    username: z
        .string()
        .min(6, { message: 'Name must be at least 6 characters long' })
        .max(30, { message: 'Name must be at most 30 characters long' })
        .refine((value) => /^[a-zA-Z0-9_]+$/.test(value), {
            message: 'Username should not contain special characters except "_".',
        }),
});

export type User = z.infer<typeof UserCredentials>;
