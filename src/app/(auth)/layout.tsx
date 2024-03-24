'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/supabase/supabase';
import Loading from '@/components/Loading';

const AuthLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [session, setSession] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      console.log('mypage-유저', user);
      if (!user) {
        alert('로그인이 필요합니다. 로그인 페이지로 이동합니다.');
        localStorage.setItem('url', '/mypage');
        router.push('/login');
      } else {
        setSession(true);
      }
    };

    getUser();
  });

  if (!session) {
    return <Loading />;
  }

  return <div>{children}</div>;
};

export default AuthLayout;
