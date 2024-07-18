// components/ui/AccountForms/AccountToast.tsx
'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'sonner';

export default function AccountToast() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    console.log('useEffect triggered');
    const loginStatus = searchParams.get('login');
    console.log('loginStatus:', loginStatus);
    if (loginStatus === 'success') {
      toast('Welcome Back!');
      console.log('Toast triggered');
      
      // Clean up the query parameter after showing the toast
      const url = new URL(window.location.href);
      url.searchParams.delete('login');
      router.replace(url.toString());
    }
  }, [searchParams, router]);

  return null;
}
