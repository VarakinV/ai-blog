'use client';
import { useFormStatus } from 'react-dom';
import { Button } from './ui/button';
import GoogleLogo from '@/public/google.svg';
import GitLogo from '@/public/github.svg';
import Image from 'next/image';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface iAppProps {
  text: string;
  variant?:
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | 'link'
    | null
    | undefined;
  className?: string;
}

export function SubmitButton({ text, variant, className }: iAppProps) {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <Button disabled variant="outline" className={cn(className, 'w-full')}>
          <Loader2 className="mr-2 animate-spin size-4" />
          Please wait...
        </Button>
      ) : (
        <Button
          type="submit"
          variant={variant}
          className={cn(className, 'w-fit')}
        >
          {text}
        </Button>
      )}
    </>
  );
}

export function GoogleAuthButton() {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <Button disabled variant="outline" className="w-full">
          <Loader2 className="mr-2 animate-spin size-4" />
          Please wait...
        </Button>
      ) : (
        <Button variant="outline" className="w-full">
          <Image src={GoogleLogo} alt="google logo" className="mr-2 size-4" />
          Sign in with Google
        </Button>
      )}
    </>
  );
}

export function GitAuthButton() {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <Button disabled variant="outline" className="w-full">
          <Loader2 className="mr-2 animate-spin size-4" />
          Please wait...
        </Button>
      ) : (
        <Button variant="outline" className="w-full">
          <Image src={GitLogo} alt="github logo" className="mr-2 size-4" />
          Sign in with Google
        </Button>
      )}
    </>
  );
}
