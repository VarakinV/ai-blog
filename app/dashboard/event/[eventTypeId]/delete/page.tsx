import { DeleteEventTypeAction } from '@/app/actions';
import { SubmitButton } from '@/components/SubmitButtons';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Link from 'next/link';

export default async function DeleteEventType({
  params,
}: // eslint-disable-next-line @typescript-eslint/no-explicit-any
any) {
  const resolvedParams = await params;
  return (
    <div className="flex flex-1 items-center justify-center">
      <Card className="max-w-[450px] w-full">
        <CardHeader>
          <CardTitle>Are you sure?</CardTitle>
          <CardDescription>
            This action is irreversible and will permanently delete all data
            associated with this event type.
          </CardDescription>
        </CardHeader>
        <CardFooter className="w-full flex justify-between">
          <Button variant="secondary" asChild>
            <Link href="/dashboard">Cancel</Link>
          </Button>
          <form action={DeleteEventTypeAction}>
            <input type="hidden" name="id" value={resolvedParams.eventTypeId} />
            <SubmitButton text="Delete" variant="destructive" />
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}
