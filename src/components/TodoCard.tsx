'use client';

import React, { useState } from 'react';
import ToggleButton from './ToggleButton';
import HeartFillIcon from '../icons/HeartFillIcon';
import { HeartIcon } from '@/icons/HeartIcon';
import ModalPotal from './ModalPortal';
import TodoModal from './TodoModal';
import TodoDetail from './TodoDetail';

interface TestData {
  contents: string;
  created_at: string;
  end: string;
  imageFile: string;
  likeCount: number;
  liked: string[];
  nickname: string;
  start: string;
  title: string;
  todoId: string;
}

export type TodoType = {
  contents: string;
  created_at: string;
  end: string;
  imageFile: string;
  likeCount: number;
  liked: string[];
  nickname: string;
  start: string;
  title: string;
  todoId: string;
};

const TodoCard = ({ todo }: { todo: TodoType }) => {
  const [likes, setLikes] = useState(false);
  const [testData, setTestData] = useState<TestData[]>([]);
  const [openModal, setOpenModal] = useState(false);

  if (!todo) {
    return <div>데이터 없음</div>;
  }

  const { title, nickname, contents, created_at, imageFile, liked } = todo;

  const formattedDate = new Date(created_at).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });

  return (
    <div
      onClick={() => setOpenModal(true)}
      className="bg-white m-[15px] 'border-2 rounded-[20px] border-gray-500 border-dashed' rounded-[30px] p-[30px] flex flex-col items-center justify-center"
    >
      <div className="flex flex-col items-center flex justify-center">
        <h2 className="font-bold text-lg mb-[10px]">{title}</h2>
        <img
          className="object-cover rounded-[30px] mb-[20px]"
          src={`${imageFile}`}
          alt="todoImage"
          sizes="650px"
        />
      </div>
      <div className="w-full">
        <p className="mb-[10px]">{nickname}</p>
        <p className="mb-[20px]">{contents}</p>
      </div>
      <div className="flex w-full justify-between">
        <p className="text-gray-400">{formattedDate}</p>
        <div>
          <ToggleButton
            toggled={likes}
            onToggle={setLikes}
            onIcon={<HeartFillIcon />}
            offIcon={<HeartIcon />}
          />
          <p>{`${liked?.length ?? 0}`}</p>
        </div>
      </div>
      {/* {openModal && (
        <ModalPotal>
          <div>
            <TodoModal onClose={() => setOpenModal(false)}>
              <TodoDetail todo={todo} />
            </TodoModal>
          </div>
        </ModalPotal>
      )} */}
    </div>
  );
};

export default TodoCard;
