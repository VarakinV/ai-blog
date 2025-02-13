import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import Logo from '@/public/calendar.png';
import { AuthModal } from './AuthModal';

export function Navbar() {
  return (
    <div className="p-y-5 flex items-center justify-between">
      <Link href={'/'} className="flex items-center py-2">
        <Image src={Logo} alt="Booking App Logo" className="size-10 mr-2" />
        <h1 className="text-3xl text-primary font-bold">
          Booking <span className="text-orange-600">App</span>
        </h1>
      </Link>
      <AuthModal />
    </div>
  );
}
