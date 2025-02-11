import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import Logo from '@/public/WWD-logo-long-fading-lines.svg';
import { AuthModal } from './AuthModal';

export function Navbar() {
  return (
    <div className="p-y-5 flex items-center justify-between">
      <Link href={'/'} className="flex items-baseline py-2">
        <Image src={Logo} height={50} alt="logo" />
      </Link>
      <AuthModal />
    </div>
  );
}
