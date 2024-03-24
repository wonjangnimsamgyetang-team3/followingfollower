'use client';

import { supabase } from '@/supabase/supabase';
import { useQuery } from '@tanstack/react-query';
import MainCard from './MainCard';

const NewCard = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['todo'],
    queryFn: async () => {
      const response = await supabase
        .from('TodoList')
        .select('*')
        .order(`liketest`, { ascending: true })
        .order(`created_at`, { ascending: false })
        .range(0, 4);
      const { data } = response;
      return data;
    },
  });

  if (isLoading) {
    <div>로딩 중 입니다...</div>;
  }

  if (isError) {
    <div>에러 입니다...</div>;
  }

  return <MainCard todos={data} />;
};

export default NewCard;
