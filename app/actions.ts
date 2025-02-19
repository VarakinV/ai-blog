"use server";

import { requireUser } from "@/lib/hook";
import { prisma } from "@/lib/prisma";
import {  onboardingSchemaValidation, settingsSchema } from "@/lib/zodSchemas";
import {parseWithZod} from '@conform-to/zod'
import { redirect } from "next/navigation";

export async function OnboardingAction(prevState: unknown, formData: FormData) {
    const session = await requireUser();

    const submission = await parseWithZod(formData, {
        schema: onboardingSchemaValidation({
            async isUsernameUnique() {
                const existingUsername = await prisma.user.findUnique({
                    where: {
                        userName: formData.get('userName') as string,
                    },
                });

                return !existingUsername;
            },
        }),
        async: true,
    });

    if(submission.status !== "success") {
        return submission.reply();
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const data = await prisma.user.update({
        where: {
            id: session.user?.id
        },
        data: {
            userName: submission.value.userName,
            name: submission.value.fullName,
            availability: {
                createMany: {
                    data: [
                        {
                            day: 'Monday',
                            fromTime: '09:00',
                            tillTime: '17:00',
                        },
                        {
                            day: 'Tuesday',
                            fromTime: '09:00',
                            tillTime: '17:00',
                        },
                        {
                            day: 'Wednesday',
                            fromTime: '09:00',
                            tillTime: '17:00',
                        },
                        {
                            day: 'Thursday',
                            fromTime: '09:00',
                            tillTime: '17:00',
                        },
                        {
                            day: 'Friday',
                            fromTime: '09:00',
                            tillTime: '17:00',
                        },
                        {
                            day: 'Saturday',
                            fromTime: '09:00',
                            tillTime: '17:00',
                        },
                        {
                            day: 'Sunday',
                            fromTime: '09:00',
                            tillTime: '17:00',
                        }
                    ]
                }
            }
        }
    })

    return redirect('/onboarding/grant-id');
}

export async function SettingsAction(prevState: unknown, formData: FormData) {
    const session = await requireUser();

    const submission = await parseWithZod(formData, {
        schema: settingsSchema,
    });

    if(submission.status !== "success") {
        return submission.reply();
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const user = await prisma.user.update({
        where: {
            id: session.user?.id
        },
        data: {
            name: submission.value.fullName,
            image: submission.value.profileImage,
        },
    })

    return redirect('/dashboard');
}