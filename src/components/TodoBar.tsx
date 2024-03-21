'use Client';

import ToggleButton from './ToggleButton';
import HeartFillIcon from '../icons/HeartFillIcon';
import { HeartIcon } from '@/icons/HeartIcon';
import { supabase } from '@/supabase/supabase';
import { TodoType } from './TodoCard';
import { useState } from 'react';
import { FaRegCommentDots } from 'react-icons/fa';

type Props = {
  todo: TodoType;
  commentCount: number;
};

const TodoBar = ({ todo, commentCount }: Props) => {
  const [likes, setLikes] = useState(todo.liked);
  const [liketest, setLiketest] = useState<string[]>(todo.liketest);

  const handleLikeToggle = async () => {
    const userId = '15';
    if (likes) {
      await removeLikedUser(todo.todoId);
      if (liketest !== null) {
        setLiketest((updatedLiketest) =>
          updatedLiketest.filter((id) => id !== userId)
        );
      }
    } else {
      await addLikedUser(todo.todoId);
      if (liketest !== null) {
        setLiketest((updatedLiketest) => [...updatedLiketest, userId]);
      } else {
        setLiketest([userId]);
      }
    }
    setLikes(!likes);
  };
  const addLikedUser = async (todoId: string) => {
    const userId = '15';
    const { data, error } = await supabase
      .from('TodoList')
      .update({ liketest: [...liketest, userId] })
      .eq('todoId', todoId)
      .select();

    if (error) {
      throw error;
    }
  };

  const removeLikedUser = async (todoId: string) => {
    const userId = '15';
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
          toggled={likes}
          onToggle={handleLikeToggle}
          onIcon={<HeartFillIcon />}
          offIcon={<HeartIcon />}
        />
        <p className="ml-[5px]">{`${liketest?.length ?? 0}`}</p>
        <div className="flex">
          <FaRegCommentDots className="ml-[5px]" />
          <p className="ml-[5px]">{`${commentCount ?? 0}`}</p>
        </div>
      </div>
    </div>
  );
};

export default TodoBar;
