'use client';

import { supabase } from '@/supabase/supabase';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import React from 'react';

import type { Todo } from '@/types/type';

const NewCard = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['todo'],
    queryFn: async () => {
      const response = await supabase
        .from('TodoList')
        .select('*')
        .order(`likeCount`, { ascending: false })
        .order(`created_at`, { ascending: false })
        .range(0, 4);
      // LikeCount 가 높은 순서대로
      return response.data;
    },
  });

  const todoNewCard = data?.map((card: any) => {
    return (
      <article
        key={card.todoId}
        className="m-3 p-6 flex flex-col gap-3 border-solid border-2 border-subColor2 rounded-lg"
      >
        <section>
          <Image
            src={card.imageFile}
            className="rounded-3xl"
            width={300}
            height={300}
            alt="todo 이미지"
          />
        </section>
        <section className="flex flex-col gap-2">
          <h3 className="text-lg">{card.title}</h3>
          <h4>{card.nickname}</h4>
          <p>{card.contents}</p>
          <h4 className="pt-2">{card.created_at}</h4>
        </section>
      </article>
    );
  });

  if (isLoading) {
    <div>로딩 중 입니다...</div>;
  }

  if (isError) {
    <div>에러 입니다...</div>;
  }

  return <div className="flex">{todoNewCard}</div>;
};

export default NewCard;
