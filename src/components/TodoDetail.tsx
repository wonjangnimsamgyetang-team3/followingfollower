import React, { useState } from 'react';
import { TodoType } from './TodoCard';
import { supabase } from '@/supabase/supabase';

type Props = {
  todo: TodoType;
};

const TodoDetail = ({ todo }: Props) => {
  const [commentData, setCommentData] = useState<TodoData[]>([]);

  async function getTestData() {
    let { data } = await supabase.from('commentList').select('*');
    setTodoData(data);
  }
  return <div>{todo}</div>;
};

export default TodoDetail;
