import { requireUser } from "@/lib/hook";
import { nylas, nylasConfig } from "@/lib/nylas";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {

    const session = await requireUser();

    const url = new URL(req.url);
    const code = url.searchParams.get('code');

    if(!code) {
       return Response.json('No authorization code returned from Nylas', {status: 400}); 
    }

    try {
        const response = await nylas.auth.exchangeCodeForToken({
            clientSecret: nylasConfig.apiKey,
            redirectUri: nylasConfig.redirectUri,
            code: code,
            clientId: nylasConfig.clientId,
        })

        const {grantId, email} = response;

        await prisma.user.update({
            where: {
                id: session.user?.id
            },
            data: {
                grantId: grantId,
                grantEmail: email,
            }
        })
    } catch (error) {
        console.log("Something went wrong with the Nylas API", error);
    }

    redirect('/dashboard');

}