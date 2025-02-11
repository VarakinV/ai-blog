import Image from 'next/image';
import Link from 'next/link';
import Logo from '@/public/W-Letter-Logo-with-faiding-lines.svg';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="min-h-screen w-full grid md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
        <div className="hidden md:block border-r bg-muted/40">
          <div className="flex h-full max-h-screen flex-col gap-2">
            <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
              <Link href="/" className="flex items-center gap-2">
                <Image src={Logo} className="size-10" alt="logo" />
                <p className="text-xl font-bold">
                  <span className="text-primary">Dashboard</span>
                </p>
              </Link>
            </div>
            <div className="flex-1">
              <nav className="grid items-start px-2 lg:px-4"></nav>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
