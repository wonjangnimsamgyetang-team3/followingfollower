import React, { useState } from 'react';
import ToggleButton from './ToggleButton';
import HeartFillIcon from '../icons/HeartFillIcon';
import { HeartIcon } from '@/icons/HeartIcon';
import { supabase } from '@/supabase/supabase';

interface TodoType {
  contents: string;
  created_at: string;
  end: string;
  imageFile: string;
  likeCount: number;
  liked: boolean;
  liketest: string[];
  nickname: string;
  start: string;
  title: string;
  todoId: string;
}

const TodoCard = ({ todo }: { todo: TodoType }) => {
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
    <div className="bg-white m-[15px] border-2 border-solid border-subColor2 rounded-[30px] p-[30px] flex flex-col items-center justify-center">
      <div className="flex flex-col items-center flex justify-center">
        <h2 className="font-bold text-lg mb-[10px]">{todo.title}</h2>
        <img
          className="object-cover rounded-[30px] mb-[20px]"
          src={todo.imageFile}
          alt="todoImage"
          sizes="650px"
        />
      </div>
      <div className="w-full">
        <p className="mb-[10px]">{todo.nickname}</p>
        <p className="mb-[20px]">{todo.contents}</p>
      </div>
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
        </div>
      </div>
    </div>
  );
};

export default TodoCard;
