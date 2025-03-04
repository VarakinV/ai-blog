import { RenderCalendar } from '@/components/bookingForm/RenderCalendar';
import { TimeTable } from '@/components/bookingForm/TimeTable';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { prisma } from '@/lib/prisma';
import { Label } from '@/components/ui/label';
import { CalendarX2, Clock, VideoIcon } from 'lucide-react';
import { notFound } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { SubmitButton } from '@/components/SubmitButtons';
import { CreateMeetingAction } from '@/app/actions';

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

// interface BookingPageProps {
//   params: { username: string; eventUrl: string };
//   searchParams: { date?: string };
// }

export default async function BookingPage({
  params,
  searchParams,
}: // eslint-disable-next-line @typescript-eslint/no-explicit-any
any) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;

  const selectedDate = resolvedSearchParams?.date
    ? new Date(`${resolvedSearchParams.date}T00:00:00`)
    : new Date();

  const data = await getData(resolvedParams.eventUrl, resolvedParams.username);

  // Force the date to be treated as UTC and format it correctly
  const formattedDate = selectedDate.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC', // Ensures no local timezone shift
  });

  const showForm = !!resolvedSearchParams.date && !!resolvedSearchParams.time;

  return (
    <div className="min-h-screen w-screen flex items-center justify-center">
      {showForm ? (
        <Card className="max-w-[600px] w-full">
          <CardContent className="p-5 md:grid md:grid-cols-[1fr,auto,1fr] md:gap-4">
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
                    {formattedDate}
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
            <form
              action={CreateMeetingAction}
              className="flex flex-col gap-y-4"
            >
              <input
                type="hidden"
                name="fromTime"
                value={resolvedSearchParams.time}
              />
              <input
                type="hidden"
                name="eventDate"
                value={resolvedSearchParams.date}
              />
              <input type="hidden" name="metingLength" value={data.duration} />
              <input
                type="hidden"
                name="provider"
                value={data.videoCallSoftware}
              />
              <input
                type="hidden"
                name="username"
                value={resolvedParams.username}
              />
              <input type="hidden" name="eventTypeId" value={data.id} />
              <div className="flex flex-col gap-y-2">
                <Label>Your Name</Label>
                <Input name="name" type="text" placeholder="Your Name" />
              </div>
              <div className="flex flex-col gap-y-2">
                <Label>Your Email</Label>
                <Input name="email" type="email" placeholder="Your Email" />
              </div>
              <SubmitButton className="w-full mt-5" text="Book Now" />
            </form>
          </CardContent>
        </Card>
      ) : (
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
                    {formattedDate}
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
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            <RenderCalendar availability={data.User?.availability as any} />
            <Separator orientation="vertical" className="h-full w-[1px]" />
            <TimeTable
              selectedDate={selectedDate}
              userName={resolvedParams.username}
              duration={data.duration}
            />
          </CardContent>
        </Card>
      )}
    </div>
  );
}
