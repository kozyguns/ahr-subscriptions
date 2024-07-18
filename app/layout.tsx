import { Metadata } from 'next';
import Footer from '@/components/ui/Footer';
import Navbar from '@/components/ui/Navbar';
import { PropsWithChildren, Suspense } from 'react';
import { getURL } from '@/utils/helpers';
import 'styles/main.css';
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/sonner"

// const title = 'Next.js Subscription Starter';
// const description = 'Brought to you by Vercel, Stripe, and Supabase.';

// export const metadata: Metadata = {
//   metadataBase: new URL(getURL()),
//   title: title,
//   description: description,
//   openGraph: {
//     title: title,
//     description: description
//   }
// };

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
        <Navbar />
        
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
