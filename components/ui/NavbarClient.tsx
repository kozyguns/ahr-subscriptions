'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { SignOut } from '@/utils/auth-helpers/server';
import { handleRequest } from '@/utils/auth-helpers/client';
import { createClient } from '@/utils/supabase/client';
import { ModeToggle } from '@/components/ModeToggle';
import Logo from '@/components/icons/Logo';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuIndicator,
  NavigationMenuViewport
} from '@/components/ui/navigation-menu';
import { Button } from './button';
import { User } from '@supabase/supabase-js';

const NavbarClient: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = React.useState<User | null>(null);

  React.useEffect(() => {
    const fetchUser = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    fetchUser();
  }, []);

  return (
    <nav className="sticky top-0 z-40 transition-all duration-150 h-16 md:h-20">
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
          <div className="flex items-center">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Menu</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-1">
                      <li>
                        <NavigationMenuLink asChild>
                          <Link
                            href="/"
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none">
                              Pricing
                            </div>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      {user && (
                        <li>
                          <NavigationMenuLink asChild>
                            <Link
                              href="/account"
                              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                            >
                              <div className="text-sm font-medium leading-none">
                                Account
                              </div>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      )}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
              <NavigationMenuIndicator />
              <NavigationMenuViewport />
            </NavigationMenu>
            <div className="flex items-center space-x-4 ml-4">
              {user ? (
                <form onSubmit={(e) => handleRequest(e, SignOut, router)}>
                  <input type="hidden" name="pathName" value={pathname} />
                  <Button
                    type="submit"
                    variant="linkHover2"
                    className="inline-flex items-center leading-6 font-medium transition ease-in-out duration-75 cursor-pointer rounded-md p-1 hover:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50"
                  >
                    Sign out
                  </Button>
                </form>
              ) : (
                <Link
                  href="/signin"
                  className="inline-flex items-center leading-6 font-medium transition ease-in-out duration-75 cursor-pointer rounded-md p-1 hover:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50"
                >
                  <Button variant="linkHover2">Sign In</Button>
                </Link>
              )}
            </div>
          </div>
        </div>
        <ModeToggle />
      </div>
    </nav>
  );
};

export default NavbarClient;