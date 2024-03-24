'use Client';

import { HeartIcon } from '@/icons/HeartIcon';
import { supabase } from '@/supabase/supabase';
import { TodoType } from './TodoCard';
import { useEffect, useState } from 'react';
import { AiOutlineComment } from 'react-icons/ai';

import ToggleButton from './ToggleButton';
import HeartFillIcon from '../icons/HeartFillIcon';
import useStoreState from '@/shared/store';

type Props = {
  todo: TodoType;
  commentCount: number;
};

const TodoBar = ({ todo, commentCount }: Props) => {
  const { userInfo } = useStoreState();
  const { id } = userInfo || {};
  const [likes, setLikes] = useState<boolean | null>(null);
  const [liketest, setLiketest] = useState<string[]>([]);

  useEffect(() => {
    const likedStatus = async () => {
      const { data: likedUser, error } = await supabase
        .from('TodoList')
        .select('liketest')
        .eq('todoId', todo.todoId)
        .single();

      if (error) {
        console.error('정보를 가져오지 못 하고 있습니다.', error);
        return;
      }

      if (likedUser?.liketest && likedUser.liketest.includes(id)) {
        setLikes(true);
      } else {
        setLikes(false);
      }
      setLiketest(likedUser?.liketest || []);
    };

    likedStatus();
  }, [id, todo.todoId]);

  const handleLikeToggle = async () => {
    const { data: user } = await supabase.auth.getUser();
    const userId = user?.user?.id;

    if (!userId) {
      alert('로그인 후 이용해주세요.');
      return;
    }

    if (likes) {
      await removeLikedUser(todo.todoId, userId);
      setLikes(false);
      setLiketest((prevLiketest) => prevLiketest.filter((id) => id !== userId));
    } else {
      await addLikedUser(todo.todoId, userId);
      setLikes(true);
      setLiketest((prevLiketest) => [...prevLiketest, userId]);
    }
    setLikes(!likes);
  };

  const addLikedUser = async (todoId: string, userId: string) => {
    const { data, error } = await supabase
      .from('TodoList')
      .update({ liketest: [...liketest, userId] })
      .eq('todoId', todoId)
      .select();

    if (error) {
      throw error;
    }
  };

  const removeLikedUser = async (todoId: string, userId: string) => {
    const { data, error } = await supabase
      .from('TodoList')
      .update({ liketest: liketest.filter((id) => id !== userId) })
      .eq('todoId', todoId)
      .select();

    if (error) {
      throw error;
    }
  };

  return (
    <div className="flex w-full justify-between">
      <p className="text-gray-400">
        {new Date(todo.created_at).toLocaleDateString('ko-KR', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        })}
      </p>
      <div className="flex">
        <ToggleButton
          toggled={likes ?? false}
          onToggle={handleLikeToggle}
          onIcon={<HeartFillIcon />}
          offIcon={<HeartIcon />}
        />
        <p className="ml-[5px]">{`${liketest?.length ?? 0}`}</p>
        <div className="flex">
          <AiOutlineComment className="ml-[10px]" />
          <p className="ml-[5px]">{`${commentCount ?? 0}`}</p>
        </div>
      </div>
    </div>
  );
};

export default TodoBar;
