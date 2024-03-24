'use client';

import { supabase } from '@/supabase/supabase';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import profile from '@/assets/profile.png';

const LikeTop = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['todoed'],
    queryFn: async () => {
      const response = await supabase
        .from('TodoList')
        .select('*')
        .order(`liketest`, { ascending: false })
        .range(0, 2);
      return response.data;
    },
  });

  const todoTopCard = data?.map((card) => {
    return (
      <section
        key={card.todoId}
        className="px-8 pb-4 text-center border-b-2 border-solid border-subColor1"
      >
        <Image
          src={profile}
          className="rounded-full pb-2"
          alt="프로필 이미지"
          width={100}
          height={100}
        />
        <h4>{card.nickname}</h4>
      </section>
    );
  });

  if (isLoading) {
    <div>로딩 중 입니다...</div>;
  }

  if (isError) {
    <div>에러 입니다...</div>;
  }
  return (
    <article className="p-6 flex flex-col gap-6 border-solid border-2 border-subColor2 rounded-lg">
      <div className="text-center font-bold text-subColor1">
        인기 유저 TOP 3
      </div>
      {todoTopCard}
    </article>
  );
};

export default LikeTop;
