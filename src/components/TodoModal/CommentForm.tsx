'use client';

import { supabase } from '@/supabase/supabase';
import React, { FormEvent, useState } from 'react';
import { TodoType } from '../TodoCard';

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
        className="mb-[30px] w-[250px] h-[40px] border-solid border-2 border-gray-200 rounded-[10px] p-[10px]"
        name="comment"
        type="text"
        placeholder="댓글을 작성해주세요."
        required
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button className="font-bold ml-2 rounded-[15px] bg-[#fb8494] w-[120px] h-[40px]">
        작성하기
      </button>
    </form>
  );
};

export default CommentForm;
