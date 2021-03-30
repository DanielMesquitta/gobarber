import React, { useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import { SignInResponse } from '~/hooks/auth/types';
import { getCookie } from '~/utils';

const Dashboard: React.FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const { token } = JSON.parse(getCookie('auth')) as SignInResponse;
      if (!token) {
        router.push('/sign/in');
      } else {
        setLoading(false);
      }
    } catch {
      router.push('/sign/in');
    }
  }, [router]);

  if (loading) return <h1>Loading...</h1>;

  return <h1>Dashboard</h1>;
};

export default Dashboard;
