'use client';

import { supabase } from '@/supabase/supabase';
import React, { FormEvent, useState } from 'react';
import { TodoType } from './TodoCard';

type Props = {
  todo: TodoType;
  onCommentSuccess: () => void;
};

const CommentForm = ({ todo, onCommentSuccess }: Props) => {
  const [comment, setComment] = useState('');
  const buttonDisabled = comment.length === 0;
  const handleCommentSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('comment', comment);
    // onTodoComment(comment);
    const { data } = await supabase.from('commentList').insert([
      {
        comment: comment,
        todoId: todo.todoId,
      },
    ]);
    onCommentSuccess();
    setComment('');
  };
  return (
    <form onSubmit={handleCommentSubmit}>
      <input
        name="comment"
        type="text"
        placeholder="댓글을 작성해주세요."
        required
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button
        disabled={buttonDisabled}
        className={`font-bold ml-2 bg-gray-500 ${
          buttonDisabled ? 'text-sky-300' : 'text-sky-500'
        }`}
      >
        작성하기
      </button>
    </form>
  );
};

export default CommentForm;
