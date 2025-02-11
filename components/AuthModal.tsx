import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Logo from '@/public/W-Letter-Logo-with-faiding-lines.svg';
import { signIn } from '@/lib/auth';
import { GitAuthButton, GoogleAuthButton } from './SubmitButtons';

export function AuthModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Login</Button>
      </DialogTrigger>
      <DialogContent className="sm:m-w-[360px]">
        <DialogHeader className="flex items-center gap-2">
          <Image src={Logo} className="size-10" alt="logo" />
          <DialogTitle>Sign In</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col mt-5 gap-3">
          <form
            action={async () => {
              'use server';
              await signIn('google');
            }}
            className="w-full"
          >
            <GoogleAuthButton />
          </form>

          <form
            action={async () => {
              'use server';
              await signIn('github');
            }}
            className="w-full"
          >
            <GitAuthButton />
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
