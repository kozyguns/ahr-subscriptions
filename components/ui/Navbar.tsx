import * as React from 'react';
import Link from 'next/link';
import { createClient } from '@/utils/supabase/server';
import { ModeToggle } from '@/components/ModeToggle';
import Logo from '@/components/icons/Logo';
import NavbarClient from './NavbarClient';

export default async function Navbar() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <nav className="sticky top-0  z-40 transition-all duration-150 h-16 md:h-20">
      <a href="#skip" className="sr-only focus:not-sr-only">
        Skip to content
      </a>
      <div className="max-w-6xl px-6 mx-auto flex justify-between items-center h-full">
        <div className="flex items-center">
          <Link
            href="/"
            aria-label="Logo"
            className="cursor-pointer rounded-full transform duration-100 ease-in-out"
          >
            <Logo />
          </Link>
          <NavbarClient user={user} />
        </div>
        <ModeToggle />
      </div>
    </nav>
  );
}
