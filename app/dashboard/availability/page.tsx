import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { requireUser } from '@/lib/hook';
import { prisma } from '@/lib/prisma';
import { times } from '@/lib/times';
import { notFound } from 'next/navigation';

async function getAvailability(userId: string) {
  const availability = await prisma.availability.findMany({
    where: {
      userId: userId,
    },
  });
  if (!availability) {
    return notFound();
  }
  return availability;
}

export default async function AvailabilityPage() {
  const session = await requireUser();
  const data = await getAvailability(session.user?.id as string);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Availability</CardTitle>
        <CardDescription>
          Set your availability to let people know when you are busy.
        </CardDescription>
      </CardHeader>
      <form>
        <CardContent className="flex flex-col gap-y-4">
          {data.map((item) => (
            <div
              key={item.id}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 items-center gap-4"
            >
              <div className="flex items-center gap-3">
                <Switch defaultChecked={item.isActive} />
                <p>{item.day}</p>
              </div>
              <Select defaultValue={item.fromTime}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="From Time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {times.map((time) => (
                      <SelectItem value={time.time} key={time.id}>
                        {time.time}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Select defaultValue={item.tillTime}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Till Time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {times.map((time) => (
                      <SelectItem value={time.time} key={time.id}>
                        {time.time}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          ))}
        </CardContent>
      </form>
    </Card>
  );
}
