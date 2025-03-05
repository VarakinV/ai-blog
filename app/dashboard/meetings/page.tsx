import { CancelMeetingAction } from '@/app/actions';
import { EmptyState } from '@/components/EmptyState';
import { SubmitButton } from '@/components/SubmitButtons';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { requireUser } from '@/lib/hook';
import { nylas } from '@/lib/nylas';
import { prisma } from '@/lib/prisma';
import { format, fromUnixTime } from 'date-fns';
import { Video } from 'lucide-react';

async function getData(userId: string) {
  const userData = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      grantId: true,
      grantEmail: true,
    },
  });

  if (!userData) {
    throw new Error('User not found');
  }

  const data = await nylas.events.list({
    identifier: userData.grantId as string,
    queryParams: {
      calendarId: userData.grantEmail as string,
    },
  });

  return data;
}
export default async function MeetingsPage() {
  const session = await requireUser();
  const data = await getData(session.user?.id as string);

  return (
    <>
      {data.data.length < 1 ? (
        <EmptyState
          title="No meetings found"
          description="You have no meetings scheduled."
          buttonText="Schedule a meeting"
          href="/dashboard/new"
        />
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Bookings</CardTitle>
            <CardDescription>Upcoming Meetings</CardDescription>
          </CardHeader>
          <CardContent>
            {data.data.map((item) => (
              <form action={CancelMeetingAction} key={item.id}>
                <input type="hidden" name="eventId" value={item.id} />
                <div className="grid grid-cols-3 justify-between items-center">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {format(fromUnixTime(item.when.startTime), 'EEE, dd MMM')}
                    </p>
                    <p className="text-muted-foreground text-xs pt-1">
                      {format(fromUnixTime(item.when.startTime), 'h:mm a')} -{' '}
                      {format(fromUnixTime(item.when.endTime), 'h:mm a')}
                    </p>
                    <div className="mt-1 flex items-center">
                      {item.conferencing?.details?.url ? (
                        <>
                          <Video className="mr-2 size-4 text-primary" />
                          <a
                            className="text-xs text-primary underline underline-offset-4"
                            target="_blank"
                            href={item.conferencing.details.url}
                          >
                            Join Meeting
                          </a>
                        </>
                      ) : (
                        <p className="text-xs text-muted-foreground">
                          No meeting link
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col items-start">
                    <h2 className="text-sm font-medium">{item.title}</h2>
                    {item.participants[0]?.name ? (
                      <p className="text-sm text-muted-foreground">
                        You and {item.participants[0].name}
                      </p>
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        No participants
                      </p>
                    )}
                  </div>
                  <SubmitButton
                    text="Cancel Event"
                    variant="destructive"
                    className="w-fit flex ml-auto"
                  />
                </div>
                <Separator className="my-4" />
              </form>
            ))}
          </CardContent>
        </Card>
      )}
    </>
  );
}
