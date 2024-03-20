'use client';

import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Database } from 'database.types';
import ToggleButton from './ToggleButton';
import HeartFillIcon from '../icons/HeartFillIcon';
import { HeartIcon } from '@/icons/HeartIcon';
import Image from 'next/image';

const supabase = createClient<Database>(
  'https://jcsjtjiqolsewkoutsag.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impjc2p0amlxb2xzZXdrb3V0c2FnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTA4MzEyOTMsImV4cCI6MjAyNjQwNzI5M30.Mm1I1g_5qrNONvPK8gsK_3xDBim04lX01cQAX1yXVB0'
);

interface TestData {
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
}

interface TodoType {
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
}

const TodoCard = ({ todo }: { todo: TodoType }) => {
  const [likes, setLikes] = useState(false);
  const [testData, setTestData] = useState<TestData[]>([]);

  if (!todo) {
    return <div>데이터 없음</div>;
  }

  const { title, nickname, contents, created_at, imageFile } = todo;

  const formattedDate = new Date(created_at).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });

  return (
    <div className="bg-white m-[15px]">
      <h2>{title}</h2>
      <img
        className="object-cover"
        src={`${imageFile}`}
        alt="todoImage"
        sizes="650px"
      />
      <p>{nickname}</p>
      <p>{contents}</p>
      <p>{formattedDate}</p>
      <div>
        <ToggleButton
          toggled={likes}
          onToggle={setLikes}
          onIcon={<HeartFillIcon />}
          offIcon={<HeartIcon />}
        />
      </div>
    </div>
  );
};

export default TodoCard;
