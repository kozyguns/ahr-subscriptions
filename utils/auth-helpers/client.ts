'use client';

import { createClient } from '@/utils/supabase/client';
import { type Provider } from '@supabase/supabase-js';
import { getURL } from '@/utils/helpers';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { redirectToPath } from './server';

export async function handleRequest(
  e: React.FormEvent<HTMLFormElement>,
  requestFunc: (formData: FormData) => Promise<any>,
  router: AppRouterInstance | null = null
): Promise<any> {
  e.preventDefault();
  const formData = new FormData(e.currentTarget);
  const response = await requestFunc(formData);

  if (router) {
    await router.push(response.redirectUrl);
  } else {
    await redirectToPath(response.redirectUrl);
  }

  return response;
}

export async function signInWithOAuth(providerName: string) {
  const supabase = createClient();
  const redirectURL = getURL('/auth/callback');
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: providerName as Provider,
    options: { redirectTo: redirectURL }
  });

  if (error) {
    console.error('Error during OAuth sign-in:', error.message);
    throw error;
  }

  // Return full response including provider and URL
  return { data, provider: providerName, url: redirectURL };
}
