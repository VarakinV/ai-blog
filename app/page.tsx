import { Cta } from '@/components/lp/Cta';
import { Features } from '@/components/lp/Features';
import { Hero } from '@/components/lp/Hero';
import { Logos } from '@/components/lp/Logos';
import { Testimonials } from '@/components/lp/Testimonials';
import { Navbar } from '@/components/Navbar';
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function Home() {
  const session = await auth();

  if (session?.user) {
    return redirect('/dashboard');
  }
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Navbar />
      <Hero />
      <Logos />
      <Features />
      <Testimonials />
      <Cta />
    </div>
  );
}
