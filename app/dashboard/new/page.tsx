'use client';
import { createEventTypeAction } from '@/app/actions';
import { ButtonGroup } from '@/components/ButtonGroup';
import { SubmitButton } from '@/components/SubmitButtons';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { eventTypeSchema } from '@/lib/zodSchemas';
import { useForm } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';
import Link from 'next/link';
import { useActionState, useState } from 'react';

type VideoCallProvider = 'Zoom Meeting' | 'Google Meet' | 'Microsoft Teams';

export default function NewEventPage() {
  const [selectedVideoCallProvider, setSelectedVideoCallProvider] =
    useState<VideoCallProvider>('Google Meet');

  const [lastResult, action] = useActionState(createEventTypeAction, undefined);
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, {
        schema: eventTypeSchema,
      });
    },
    shouldValidate: 'onBlur',
    shouldRevalidate: 'onInput',
  });
  return (
    <div className="w-full h-full flex flex-1 items-center justify-center">
      <Card>
        <CardHeader>
          <CardTitle>Add new appointment type</CardTitle>
          <CardDescription>Create new appointment type.</CardDescription>
        </CardHeader>
        <form id={form.id} onSubmit={form.onSubmit} action={action} noValidate>
          <CardContent className="grid gap-y-5">
            <div className="flex flex-col gap-y-2">
              <Label>Title</Label>
              <Input
                name={fields.title.name}
                key={fields.title.key}
                defaultValue={fields.title.initialValue}
                placeholder="30 Minute Meeting"
              />
              <p className="text-sm text-red-500">{fields.title.errors}</p>
            </div>
            <div className="flex flex-col gap-y-2">
              <Label>URL Slug</Label>
              <div className="flex rounded-md">
                <span className="inline-flex items-center text-sm text-muted-foreground px-3 py-1.5 rounded-l-md bg-muted border-r-0 border border-muted">
                  booking.com/
                </span>
                <Input
                  name={fields.url.name}
                  key={fields.url.key}
                  defaultValue={fields.url.initialValue}
                  className="rounded-l-none"
                  placeholder="example-url-1"
                />
              </div>
              <p className="text-sm text-red-500">{fields.url.errors}</p>
            </div>
            <div className="flex flex-col gap-y-2">
              <Label>Description</Label>
              <Textarea
                name={fields.description.name}
                key={fields.description.key}
                defaultValue={fields.description.initialValue}
                placeholder="30 minute meeting with Vlad Varakin"
              />
              <p className="text-sm text-red-500">
                {fields.description.errors}
              </p>
            </div>
            <div className="flex flex-col gap-y-2">
              <Label>Duration</Label>
              <Select
                name={fields.duration.name}
                key={fields.duration.key}
                defaultValue={fields.duration.initialValue}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Duration</SelectLabel>
                    <SelectItem value="15">15 minutes</SelectItem>
                    <SelectItem value="30">30 minutes</SelectItem>
                    <SelectItem value="45">45 minutes</SelectItem>
                    <SelectItem value="60">60 minutes</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <p className="text-sm text-red-500">{fields.duration.errors}</p>
            </div>
            <div className="grid gap-y-2">
              <Label>Video call provider</Label>
              <input
                type="hidden"
                name={fields.videoCallSoftware.name}
                value={selectedVideoCallProvider}
              />
              <ButtonGroup>
                <Button
                  key="zoom"
                  type="button"
                  onClick={() => setSelectedVideoCallProvider('Zoom Meeting')}
                  className="w-full"
                  variant={
                    selectedVideoCallProvider === 'Zoom Meeting'
                      ? 'secondary'
                      : 'outline'
                  }
                >
                  Zoom
                </Button>
                <Button
                  key="google-meet"
                  type="button"
                  onClick={() => setSelectedVideoCallProvider('Google Meet')}
                  className="w-full"
                  variant={
                    selectedVideoCallProvider === 'Google Meet'
                      ? 'secondary'
                      : 'outline'
                  }
                >
                  Google Meet
                </Button>
                <Button
                  key="microsoft-teams"
                  type="button"
                  onClick={() =>
                    setSelectedVideoCallProvider('Microsoft Teams')
                  }
                  className="w-full"
                  variant={
                    selectedVideoCallProvider === 'Microsoft Teams'
                      ? 'secondary'
                      : 'outline'
                  }
                >
                  Microsoft Teams
                </Button>
              </ButtonGroup>
              <p className="text-sm text-red-500">
                {fields.videoCallSoftware.errors}
              </p>
            </div>
          </CardContent>
          <CardFooter className="w-full flex justify-between">
            <Button variant="secondary" asChild>
              <Link href="/dashboard">Cancel</Link>
            </Button>
            <SubmitButton text="Create Event Type" />
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
