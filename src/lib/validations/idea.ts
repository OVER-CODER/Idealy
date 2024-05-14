import * as z from 'zod';

export const ideaValidation = z.object({
    idea: z.string().min(3, {message: 'Minimum 3 characters'}),
    accountId: z.string(),
});

export const commentValidation = z.object({
    idea: z.string().min(3, {message: 'Minimum 3 characters'}),
});