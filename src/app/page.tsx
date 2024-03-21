import { supabase } from '@/supabase/supabase';
import React, { useEffect, useState } from 'react';
import AllCard from '@/components/AllCard';
import NewCard from '@/components/NewCard';
import Banner from '@/components/Banner';

const MainPage = () => {
  return (
    <main>
      <Banner />
      <section className="flex">
        <aside>인기 TOP3</aside>
        <div className="">
          <div>최근 올라온 글</div>
          <>
            <div>
              <h3>최신 인기 글</h3>
              <NewCard />
            </div>
            <div>
              <h3>전체 글</h3>
              <AllCard />
            </div>
          </>
        </div>
      </section>
    </main>
  );
};

export default MainPage;
