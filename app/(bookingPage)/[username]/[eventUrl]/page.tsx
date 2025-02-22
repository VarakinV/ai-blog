import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { prisma } from '@/lib/prisma';
import { CalendarX2, Clock, VideoIcon } from 'lucide-react';
import { notFound } from 'next/navigation';

async function getData(eventUrl: string, userName: string) {
  const data = await prisma.eventType.findFirst({
    where: {
      url: eventUrl,
      User: {
        userName: userName,
      },
      active: true,
    },
    select: {
      id: true,
      title: true,
      description: true,
      duration: true,
      videoCallSoftware: true,
      User: {
        select: {
          image: true,
          name: true,
          availability: {
            select: {
              day: true,
              isActive: true,
            },
          },
        },
      },
    },
  });
  if (!data) {
    return notFound();
  }
  return data;
}

export default async function BookingPage({
  params,
}: {
  params: Promise<{ username: string; eventUrl: string }>;
}) {
  const resolvedParams = await params; // Await params before accessing properties

  const data = await getData(resolvedParams.eventUrl, resolvedParams.username);
  return (
    <div className="min-h-screen w-screen flex items-center justify-center">
      <Card className="w-full max-w-[1000px] p-5 mx-auto">
        <CardContent className="p-5 md:grid md:grid-cols-[1fr,auto,1fr,auto,1fr] md:gap-4">
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={data.User?.image as string}
              alt="Profile image of the user"
              className="size-10 rounded-full"
            />
            <p className="text-sm font-medium text-muted-foreground mt-1">
              {data.User?.name}
            </p>
            <h1 className="text-2xl font-semibold mt-2">{data.title}</h1>
            <p className="text-sm font-medium text-muted-foreground">
              {data.description}
            </p>
            <div className="mt-5 flex flex-col gap-y-3">
              <p className="flex items-center">
                <CalendarX2 className="size-4 mr-2 text-primary " />
                <span className="text-sm font-md text-muted-foreground">
                  23 Sep 2024
                </span>
              </p>
              <p className="flex items-center">
                <Clock className="size-4 mr-2 text-primary " />
                <span className="text-sm font-md text-muted-foreground">
                  {data.duration} Minutes
                </span>
              </p>
              <p className="flex items-center">
                <VideoIcon className="size-4 mr-2 text-primary " />
                <span className="text-sm font-md text-muted-foreground">
                  {data.videoCallSoftware}
                </span>
              </p>
            </div>
          </div>
          <Separator orientation="vertical" className="h-full w-[1px]" />
        </CardContent>
      </Card>
    </div>
  );
}
