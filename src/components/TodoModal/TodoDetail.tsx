import React, { useEffect, useState } from 'react';
import { TodoType } from '../TodoCard';
import { supabase } from '@/supabase/supabase';
import TodoBar from '../TodoBar';
import CommentForm from './CommentForm';

export type CommentData = {
  nickname: string;
  comment: string;
};

type Props = {
  todo: TodoType;
  onCommentCountChange: (count: number) => void;
};

const TodoDetail = ({ todo, onCommentCountChange }: Props) => {
  const [commentData, setCommentData] = useState<CommentData[]>([]);

  useEffect(() => {
    fetchComments(todo.todoId);
  }, [todo.todoId]);

  const handleCommentSuccess = () => {
    fetchComments(todo.todoId);
  };

  async function fetchComments(todoId: string) {
    const { data: commentList, error } = await supabase
      .from('commentList')
      .select('nickname, comment')
      .eq('todoId', todoId);

    if (error) {
      throw error;
    }

    setCommentData(commentList || []);
    onCommentCountChange(commentList.length);
  }

  return (
    <div className="flex w-full h-full">
      <div className="relative basis-3/5">
        <div>
          <img alt="avatar" />
          {todo.nickname}
        </div>
        <div className="relative">
          <img
            className="object-cover rounded-[30px] mb-[20px]"
            src={todo.imageFile}
            alt="todoImage"
            sizes="650px"
          />
        </div>
        <div>
          <p className="font-bold text-xl">{todo.title}</p>
          <p>{todo.contents}</p>
        </div>
        <TodoBar todo={todo} commentCount={commentData.length} />
      </div>
      <div>
        <ul>
          {commentData.map((comment, index) => (
            <li key={index}>
              <img alt="avatar" sizes="small" />
              <div>
                <span>{comment.nickname}</span>
                <span>{comment.comment}</span>
              </div>
            </li>
          ))}
        </ul>
        <CommentForm todo={todo} onCommentSuccess={handleCommentSuccess} />
      </div>
    </div>
  );
};

export default TodoDetail;
