import { Metadata } from 'next';
import Footer from '@/components/ui/Footer';
import NavbarClient from '@/components/ui/NavbarClient';
import { PropsWithChildren, Suspense } from 'react';
import { getURL } from '@/utils/helpers';
import 'styles/main.css';
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/sonner"

export default async function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body className="">
      <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
        <NavbarClient />
        
        <main
          id="skip"
          className="min-h-[calc(100dvh-4rem)] md:min-h[calc(100dvh-5rem)]"
        >
          {children}
        </main>
          <Toaster />
        </ThemeProvider>

        
      </body>
    </html>
  );
}
