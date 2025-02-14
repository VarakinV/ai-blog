import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import React from 'react';
import VideoGif from '@/public/work-is-almost-over-happy.gif';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { CalendarCheck2 } from 'lucide-react';

export default function OnboardingRouteTwo() {
  return (
    <div className="min-h-screen w-screen flex items-center justify-center">
      <Card>
        <CardHeader>
          <CardTitle>
            <h1>Your are almost done!</h1>
          </CardTitle>
          <CardDescription>
            Please, connect your calendar to your account.
          </CardDescription>
          <Image
            src={VideoGif}
            alt="Video - Almost finished"
            className="w-full rounded-lg"
          />
        </CardHeader>
        <CardContent>
          <Button asChild className="w-full">
            <Link href="/api/auth">
              <CalendarCheck2 className="size-4 mr-2" />
              Connect Calendar
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
