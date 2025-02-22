import { conformZodMessage } from "@conform-to/zod";
import {z} from "zod";
export const onboardingSchema = z.object({
    fullName: z.string().min(3, {message: "Full name is minimum 3 characters"}).max(150, {message: "Full name must be less than 150 characters"}),
    userName: z.string().min(3, {message: "Username is minimum 3 characters"}).max(50, {message: "Username must be less than 50 characters"}).regex(/^[a-zA-Z0-9-]+$/, {message: "Username can only contain letters, numbers and -"}),
});

export function onboardingSchemaValidation(options?: {
    isUsernameUnique: () => Promise<boolean>;
}) {
    return z.object({
        userName: z.string().min(3, {message: "Username is minimum 3 characters"})
        .max(50, {message: "Username must be less than 50 characters"})
        .regex(/^[a-zA-Z0-9-]+$/, {message: "Username can only contain letters, numbers and -"})
        .pipe(
            z.string().superRefine((_, ctx) => {
                if(typeof options?.isUsernameUnique !== "function") {
                    ctx.addIssue({
                        code: 'custom',
                        message: conformZodMessage.VALIDATION_UNDEFINED,
                        fatal: true,
                    });
                    return;
                }

                return options.isUsernameUnique().then((isUnique) => {
                    if(!isUnique) {
                        ctx.addIssue({
                            code: 'custom',
                            message: "Username is already taken",
                            fatal: true,
                        });
                    }
                })
            })
        ),
        fullName: z.string().min(3, {message: "Full name is minimum 3 characters"}).max(150, {message: "Full name must be less than 150 characters"}),
    })
}

export const settingsSchema = z.object({
    fullName: z.string().min(3, {message: "Full name is minimum 3 characters"}).max(150, {message: "Full name must be less than 150 characters"}),
    profileImage: z.string(),
})

export const eventTypeSchema = z.object({
    title: z.string().min(3, {message: "Title is minimum 3 characters"}).max(150, {message: "Title must be less than 150 characters"}),
    url: z.string().min(3, {message: "URL slug is minimum 3 characters"}).max(150, {message: "URL slug must be less than 150 characters"}),
    description: z.string().min(3, {message: "Description is minimum 3 characters"}).max(300, {message: "Description must be less than 300 characters"}),
    duration: z.number().min(15, {message: "Duration is minimum 15 minutes"}).max(60, {message: "Duration must be less than 60 minutes"}),
    videoCallSoftware: z.string().min(3, {message: "Video call provider is required"}),
})
