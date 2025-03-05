import { EditEventForm } from '@/components/EditEventTypeForm';
import { prisma } from '@/lib/prisma';

import { notFound } from 'next/navigation';

async function getData(eventTypeId: string) {
  const data = await prisma.eventType.findUnique({
    where: {
      id: eventTypeId,
    },
    select: {
      title: true,
      description: true,
      url: true,
      duration: true,
      videoCallSoftware: true,
      id: true,
    },
  });

  if (!data) {
    return notFound();
  }

  return data;
}

export default async function EditEvent({
  params,
}: {
  params: { eventTypeId: string };
}) {
  const resolvedParams = await params;
  const data = await getData(resolvedParams.eventTypeId);
  return (
    <EditEventForm
      callProvider={data.videoCallSoftware}
      description={data.description}
      duration={data.duration}
      title={data.title}
      url={data.url}
      id={data.id}
    />
  );
}
