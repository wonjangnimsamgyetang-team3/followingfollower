'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/supabase/supabase';
import Loading from './Loading';
import TodoCard from './TodoCard';
import useStoreState from '@/shared/store';

export type TodoData = {
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
  email: string;
  userId: string;
  avatar: string;
};

const TodoList = () => {
  const [todoData, setTodoData] = useState<TodoData[]>([]);
  const [sortedBy, setSortedBy] = useState<string>('created_at');
  const router = useRouter();

  useEffect(() => {
    getRecentTodo();
  }, []);

  async function getMostLikedTodo() {
    let { data } = await supabase.from('TodoList').select('*');
    if (data) {
      data.sort(
        (a, b) => (b.liketest?.length || 0) - (a.liketest?.length || 0)
      );
      setSortedBy('liketest');
      setTodoData([...data]);
    }
  }

  async function getRecentTodo() {
    let { data } = await supabase.from('TodoList').select('*');
    if (data) {
      data.sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
      setSortedBy('created_at');
      setTodoData([...data]);
    }
  }

  const handleSortChange = async (sortBy: string) => {
    if (sortBy === 'liketest') {
      await getMostLikedTodo();
    } else {
      await getRecentTodo();
    }
  };

  const handleNewTodoClick = () => {
    router.push('/feed/newTodo');
  };

  if (todoData.length === 0) {
    return (
      <div className="mb-[30px] mt-[10px]">
        <Loading />
      </div>
    );
  }

  return (
    <div>
      <div className="mt-[30px] flex justify-between pl-[30px] pr-[30px]">
        <details className="dropdown">
          <summary className="m-1 btn w-[120px] p-3">▼ 투두 정렬</summary>
          <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-full">
            <li onClick={() => handleSortChange('created_at')}>
              <a>최신 순</a>
            </li>
            <li onClick={() => handleSortChange('liketest')}>
              <a>좋아요 순</a>
            </li>
          </ul>
        </details>
        <button
          className="border-2 grid place-items-center border-solid border-subColor1 p-4  h-4/5 content-center bg-subColor2 rounded-box hover:drop-shadow font-bold transition-all"
          onClick={handleNewTodoClick}
        >
          Todo 등록
        </button>
      </div>
      <div className="grid grid-cols-3 mb-[30px] mt-[10px] w-[1200px]">
        {todoData.map((item, index) => (
          <TodoCard key={index} todo={item} />
        ))}
      </div>
    </div>
  );
};

export default TodoList;
