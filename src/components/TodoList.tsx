'use client';

import React, { useEffect, useState } from 'react';
import TodoCard from './TodoCard';
import { supabase } from '@/supabase/supabase';

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
};

const TodoList = () => {
  const [todoData, setTodoData] = useState<TodoData[]>([]);

  useEffect(() => {
    getTodoData();
  }, []);

  async function getTodoData() {
    let { data } = await supabase.from('TodoList').select('*');
    setTodoData(data);
  }

  return (
    <div className="w-[1200px] grid grid-cols-3 mb-[30px] mt-[50px]">
      {todoData.map((item, index) => (
        <TodoCard key={index} todo={item} />
      ))}
    </div>
  );
};

export default TodoList;
