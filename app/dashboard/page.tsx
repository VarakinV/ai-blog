import { EmptyState } from '@/components/EmptyState';
import { requireUser } from '@/lib/hook';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';

async function getData(userId: string) {
  const data = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      userName: true,
      eventType: {
        select: {
          id: true,
          active: true,
          title: true,
          url: true,
          duration: true,
        },
      },
    },
  });

  if (!data) {
    return notFound();
  }

  return data;
}

export default async function DashboardPage() {
  const session = await requireUser();
  const data = await getData(session.user?.id as string);

  return (
    <>
      {data.eventType.length === 0 ? (
        <EmptyState
          title="No events found."
          description="Please, create event type."
          buttonText="Create Event Type"
          href="/dashboard/new"
        />
      ) : (
        <p>Event type found</p>
      )}
    </>
  );
}
