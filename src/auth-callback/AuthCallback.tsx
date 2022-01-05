import React, { useEffect } from 'react';
import { useUser } from '@auth0/nextjs-auth0';
import { useRouter } from 'next/router';
import { useSetupAuth0Token } from '../auth/auth-hooks';
import { handleAuthentication } from '../auth/auth-actions';

// TODO add loading component

export const AuthCallback: () => void = () => {
  const router = useRouter();
  const auth = useUser();

  const { user ,isLoading } = auth;

  useSetupAuth0Token();

  useEffect(() => {
    if (user && user.email) {
      handleAuthentication(user.email, user.sub);
    }

    if (!isLoading) {
      router.push('/');
      // handleAuthentication();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  // NOT ADD LOADING COMPONENT HERE this must be a loading auth component
};
