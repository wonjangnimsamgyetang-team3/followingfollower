'use client';

import { useEffect } from 'react';
import { supabase } from '@/supabase/supabase';
import useStoreState from '@/shared/store';
import AllCard from '@/components/AllCard';
import NewCard from '@/components/NewCard';
import Banner from '@/components/Banner';
import LikeTop from '@/components/LikeTop';

const MainPage = () => {
  const { addUser } = useStoreState();

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      const withAvatar =
        user?.user_metadata.avatar_url ?? user?.user_metadata.avatar;
      const withEmail = user?.user_metadata.email ?? user?.user_metadata.email;
      const withName =
        user?.user_metadata.preferred_username ??
        user?.user_metadata.userNickname;
      const withContents = user?.user_metadata.contents;
      const authId = user?.id;
      addUser({
        avatar: withAvatar,
        nickname: withName,
        contents: '',
        id: authId ?? '',
        email: withEmail,
      });
    };
    getUser();
  }, []);

  return (
    <main className="mb-20">
      <Banner />
      <div className="h-2 mb-10 bg-gradient-to-b from-subColor2"></div>
      <article className="mx-10 flex gap-10">
        <aside>
          <LikeTop />
        </aside>
        <section className="flex flex-col gap-6">
          <h2 className="py-3 text-center text-xl font-bold text-white bg-subColor1 rounded-2xl">
            최신 Todo
          </h2>
          <div>
            <h3 className="pl-2 text-xl font-bold text-subColor1">인기순</h3>
            <NewCard />
          </div>
          <div>
            <h3 className="pl-2 text-xl font-bold text-subColor1">All</h3>
            <AllCard />
          </div>
        </section>
      </article>
    </main>
  );
};

export default MainPage;
