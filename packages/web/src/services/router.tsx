import React, { useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import { SignInResponse } from '~/hooks/auth/types';
import { getCookie } from '~/utils';

const PrivateRouter = (
  PageComponent: React.ComponentType
): React.ComponentType => {
  const PageWrapper: React.FC = (props) => {
    const router = useRouter();

    const [user, setUser] = useState({});
    const [token, setToken] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      let auth = null as SignInResponse;
      try {
        auth = getCookie<SignInResponse>('auth');
        setToken(auth.token);
        setUser(auth.user);
      } catch {
        auth = null;
      }
      if (auth) {
        setLoading(false);
      } else {
        router.replace('/sign/in');
      }
    }, [router]);

    if (loading) return <h1>Loading...</h1>;

    return <PageComponent {...props} {...{ user, token }} />;
  };

  return PageWrapper;
};

const PublicRouter = (
  PageComponent: React.ComponentType
): React.ComponentType => {
  const PageWrapper: React.FC = (props) => {
    const router = useRouter();

    const [loading, setLoading] = useState(true);

    useEffect(() => {
      let auth = null as SignInResponse;
      try {
        auth = getCookie<SignInResponse>('auth');
      } catch {
        auth = null;
      }
      if (auth) {
        router.replace('/dashboard');
      } else {
        setLoading(false);
      }
    }, [router]);

    if (loading) return <h1>Loading...</h1>;

    return <PageComponent {...props} />;
  };

  return PageWrapper;
};

export { PrivateRouter, PublicRouter };
