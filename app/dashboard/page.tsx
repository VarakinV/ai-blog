/* eslint-disable @typescript-eslint/no-unused-vars */
import { requireUser } from '@/lib/hook';
import { prisma } from '@/lib/prisma';

async function getData(userId: string) {
  const data = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      userName: true,
    },
  });

  return data;
}

export default async function DashboardPage() {
  const session = await requireUser();

  return <h1>Welcome to Dashboard</h1>;
}
