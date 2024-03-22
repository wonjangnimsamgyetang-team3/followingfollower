'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '@/supabase/supabase';
import TodoBar from './TodoBar';
import ModalPotal from './TodoModal/ModalPortal';
import TodoModal from './TodoModal/TodoModal';
import TodoDetail from './TodoModal/TodoDetail';
import useStoreState from '@/app/shared/store';
import Image from 'next/image';

export type TodoType = {
  contents: string;
  created_at: string;
  email: string;
  end: string;
  imageFile: string;
  likeCount: number;
  liked: boolean;
  nickname: string;
  start: string;
  title: string;
  todoId: string;
  liketest: string[];
  userId: string;
};

const TodoCard = ({ todo }: { todo: TodoType }) => {
  const [openModal, setOpenModal] = useState(false);
  const [commentCount, setCommentCount] = useState(0);
  const [userId, setUserId] = useState<string | null>(null);

  //zustand
  const { userInfo } = useStoreState();
  // console.log('로그인한 유저정보', userInfo);
  const { email: myEmail } = userInfo;
  const nickname = userInfo?.nickname;

  const getUserEmail = async () => {
    const { data: user } = await supabase.auth.getUser();
    return user?.user?.id;
  };

  const isCurrentUserTodo = userId === todo.userId;

  useEffect(() => {
    getUserEmail();
  }, [userInfo]);

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

  //follow test
  const followHandler = () => {
    alert(`${todo.email}, ${myEmail}`);
  };

  return (
    <div className="bg-white m-[15px] border-2 border-solid border-subColor2 rounded-[30px] p-[30px] flex flex-col items-center justify-center">
      <div>
        <div className="flex flex-col items-center justify-center">
          <h2 className="font-bold text-lg mb-[10px]">{todo.title}</h2>
          <Image
            className="object-cover rounded-[30px] mb-[20px] cursor-pointer"
            src={todo.imageFile}
            alt="todoImage"
            onClick={() => setOpenModal(true)}
            width={300}
            height={300}
          />
        </div>
        <div className="w-full">
          <p className="mb-[10px]">
            {isCurrentUserTodo ? nickname : todo.nickname}
          </p>
          <button onClick={followHandler}>follow</button>
          <p
            className="mb-[20px] overflow-ellipsis cursor-pointer"
            onClick={() => setOpenModal(true)}
          >
            {todo.contents}
          </p>
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
