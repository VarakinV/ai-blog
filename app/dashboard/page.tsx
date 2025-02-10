/* eslint-disable @typescript-eslint/no-unused-vars */
import { requireUser } from '@/lib/hook';

export default async function DashboardPage() {
  const session = await requireUser();

  return <h1>Welcome to Dashboard</h1>;
}
