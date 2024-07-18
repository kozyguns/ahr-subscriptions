// components/ui/AuthForms/OauthSignIn.tsx
'use client';

import { Button } from '@/components/ui/button';
import { signInWithOAuth } from '@/utils/auth-helpers/client';
import { type Provider } from '@supabase/supabase-js';
import { PersonIcon } from '@radix-ui/react-icons';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

type OAuthProviders = {
  name: Provider;
  displayName: string;
  icon: JSX.Element;
};

export default function OauthSignIn() {
  const router = useRouter();
  const oAuthProviders: OAuthProviders[] = [
    {
      name: 'google',
      displayName: 'Google',
      icon: <PersonIcon className="h-5 w-5" />
    }
  ];
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const providerName = form.provider.value;
    setIsSubmitting(true);
    console.log('Attempting to sign in with OAuth provider:', providerName);
    await signInWithOAuth(providerName);
    setIsSubmitting(false);

    // Redirect to account page with a query parameter indicating success
    const accountUrl = new URL('/account', window.location.origin);
    accountUrl.searchParams.set('login', 'success');
    router.push(accountUrl.toString());
  };

  return (
    <div className="mt-8">
      {oAuthProviders.map((provider) => (
        <form
          key={provider.name}
          className="pb-2"
          onSubmit={handleSubmit}
        >
          <input type="hidden" name="provider" value={provider.name} />
          <Button
            variant="ringHover"
            type="submit"
            className="w-full"
            loading={isSubmitting}
          >
            <span className="mr-2">{provider.icon}</span>
            <span>{provider.displayName}</span>
          </Button>
        </form>
      ))}
    </div>
  );
}
