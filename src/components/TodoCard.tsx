'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '@/supabase/supabase';

import TodoBar from './TodoBar';
import ModalPotal from './TodoModal/ModalPortal';
import TodoModal from './TodoModal/TodoModal';
import TodoDetail from './TodoModal/TodoDetail';

export type TodoType = {
  contents: string;
  created_at: string;
  end: string;
  imageFile: string;
  likeCount: number;
  liked: boolean;
  nickname: string;
  start: string;
  title: string;
  todoId: string;
  liketest: string[];
};

const TodoCard = ({ todo }: { todo: TodoType }) => {
  const [openModal, setOpenModal] = useState(false);
  const [commentCount, setCommentCount] = useState(0);

  useEffect(() => {
    fetchCommentCount(todo.todoId);
  }, [todo.todoId]);

  const fetchCommentCount = async (todoId: string) => {
    const { data, error } = await supabase
      .from('commentList')
      .select('count', { count: 'exact' })
      .eq('todoId', todoId);

    if (error) {
      throw error;
    }

    setCommentCount(data[0]?.count || 0);
  };

  return (
    <div className="bg-white m-[15px] border-2 border-solid border-subColor2 rounded-[30px] p-[30px] flex flex-col items-center justify-center">
      <div onClick={() => setOpenModal(true)}>
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
      </div>
      <div className="w-full">
        <TodoBar todo={todo} commentCount={commentCount} />
        {openModal && (
          <ModalPotal>
            <div>
              <TodoModal onClose={() => setOpenModal(false)}>
                <TodoDetail
                  todo={todo}
                  onCommentCountChange={setCommentCount}
                />
              </TodoModal>
            </div>
          </ModalPotal>
        )}
      </div>
    </div>
  );
};

export default TodoCard;
