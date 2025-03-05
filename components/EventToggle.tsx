'use client';
import { useActionState, useEffect, useTransition } from 'react';
import { Switch } from './ui/switch';
import { UpdateEventToggle } from '@/app/actions';
import { toast } from 'sonner';

export function EventToggle({
  initialChecked,
  eventTypeId,
}: {
  initialChecked: boolean;
  eventTypeId: string;
}) {
  const [state, action] = useActionState(UpdateEventToggle, undefined);

  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (state?.status === 'success') {
      toast.success(state.message);
    } else if (state?.status === 'error') {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <Switch
      disabled={isPending}
      defaultChecked={initialChecked}
      onCheckedChange={(isChecked) => {
        startTransition(() => {
          action({
            eventTypeId: eventTypeId,
            isChecked: isChecked,
          });
        });
      }}
    />
  );
}
