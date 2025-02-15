'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { SubmitButton } from '@/components/SubmitButtons';
import { useActionState, useState } from 'react';
import { SettingsAction } from '@/app/actions';
import { useForm } from '@conform-to/react';
import { settingsSchema } from '@/lib/zodSchemas';
import { parseWithZod } from '@conform-to/zod';
import { X } from 'lucide-react';
import { Button } from './ui/button';
import { UploadDropzone } from '@/lib/uploadthing';
import { toast } from 'sonner';

interface iAppProps {
  fullName: string;
  email: string;
  profileImage: string;
}

export function SettingsForm({ email, fullName, profileImage }: iAppProps) {
  const [lastResult, action] = useActionState(SettingsAction, undefined);
  const [currentProfileImage, setCurrentProfileImage] = useState(profileImage);
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, {
        schema: settingsSchema,
      });
    },

    shouldValidate: 'onBlur',
    shouldRevalidate: 'onInput',
  });

  const handleDeleteImage = () => {
    setCurrentProfileImage('');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Settings</CardTitle>
        <CardDescription>Manage your settings</CardDescription>
      </CardHeader>
      <form id={form.id} onSubmit={form.onSubmit} action={action} noValidate>
        <CardContent className="flex flex-col gap-y-4">
          <div className="flex flex-col gap-y-2">
            <Label>Full Name</Label>
            <Input
              name={fields.fullName.name}
              key={fields.fullName.key}
              defaultValue={fullName}
              placeholder="Your Name"
            />
            <p className="text-sm text-red-500">{fields.fullName.errors}</p>
          </div>
          <div className="flex flex-col gap-y-2">
            <Label>Email</Label>
            <Input defaultValue={email} placeholder="Your Email" disabled />
          </div>
          <div className="grid gap-y-5">
            <Label>Profile Image</Label>
            <input
              type="hidden"
              name={fields.profileImage.name}
              key={fields.profileImage.key}
              value={currentProfileImage}
            />
            {currentProfileImage ? (
              <div className="relative size-16">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={currentProfileImage}
                  alt="Profile Image"
                  className="size-16 rounded-lg"
                />
                <Button
                  onClick={handleDeleteImage}
                  className="absolute -top-3 -right-3"
                  variant="destructive"
                  size="icon"
                  type="button"
                >
                  <X className="size-4" />
                </Button>
              </div>
            ) : (
              <UploadDropzone
                onClientUploadComplete={(res) => {
                  setCurrentProfileImage(res[0].ufsUrl);
                  toast.success('Image uploaded successfully');
                }}
                onUploadError={(error) => {
                  console.log('Something went wrong with Uploadthing', error);
                  toast.error(error.message);
                }}
                endpoint="imageUploader"
              />
            )}
            <p className="text-sm text-red-500">{fields.profileImage.errors}</p>
          </div>
        </CardContent>
        <CardFooter>
          <SubmitButton text="Save Changes" />
        </CardFooter>
      </form>
    </Card>
  );
}
