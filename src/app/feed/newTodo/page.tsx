'use client';

import NewTodo from '../../../components/NewTodo';
import { queryKey } from '@/query/queryKey';
import { readUserInfo } from '@/supabase/myPage/profileImage';
import { supabase } from '@/supabase/supabase';
import { useQuery } from '@tanstack/react-query';

const NewPostPage = () => {
  const {
    isPending,
    isError,
    data: userInfo,
  } = useQuery({
    queryKey: [queryKey.usersAccounts],
    queryFn: readUserInfo,
  });

  const currentUser = supabase.auth.getUser();

  console.log(userInfo);
  console.log('현재 로그인한 사용자 정보:', currentUser);

  console.log(userInfo);
  return (
    <div>
      <NewTodo />
    </div>
  );
};

export default NewPostPage;
