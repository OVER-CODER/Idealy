import * as z from 'zod';

export const userSchema = z.object({
    profile_photo: z.string().url().min(1),
    // id: z.string(),
    // objectId: z.string(),
    username: z.string().min(3).max(30),
    name: z.string().min(3).max(30),
    bio: z.string().min(10).max(100),
    // image: z.string(),
});