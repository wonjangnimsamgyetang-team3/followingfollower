import React, { useEffect, useState } from 'react';
import { TodoType } from '../TodoCard';
import { supabase } from '@/supabase/supabase';
import TodoBar from '../TodoBar';
import CommentForm from './CommentForm';

export type CommentData = {
  nickname: string;
  comment: string;
  created_at: string;
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
      .select('nickname, comment, created_at')
      .eq('todoId', todoId);

    if (error) {
      throw error;
    }

    setCommentData(commentList || []);
    onCommentCountChange(commentList.length);
  }

  return (
    <div>
      <div className="flex w-full h-full">
        <div className="relative w-[500px] h-[650px] border-solid border-r-2 border-[#fb8494] p-8 mt-5 mb-5 mr-10">
          <div className="flex items-center ml-[15px] mb-[15px]">
            <img alt="avatar" />
            <p className="font-bold text-xl ml-[15px]">{todo.nickname}</p>
          </div>
          <div className="relative">
            <img
              className="rounded-[30px] mb-[20px] w-full h-full"
              src={todo.imageFile}
              alt="todoImage"
            />
          </div>
          <div>
            <p className="font-bold text-xl pb-[20px]">{todo.title}</p>
            <p className="pb-[15px]">{todo.contents}</p>
          </div>
          <div className="pt-[160px]">
            <TodoBar todo={todo} commentCount={commentData.length} />
          </div>
        </div>
        <div className="h-[650px]">
          <ul className="flex flex-col  p-5 w-full h-full overflow-y-auto">
            {commentData.map((comment, index) => (
              <li
                className="border-b-2 border-solid border-subColor2 p-4"
                key={index}
              >
                <div className="flex">
                  <img alt="avatar" />
                  <div className="flex flex-col ml-[15px]">
                    <span className="mb-[10px]">{comment.nickname}</span>
                    <span className="text-lg mb-[10px]">{comment.comment}</span>
                    <div className="text-gray-400">
                      {new Date(comment.created_at).toLocaleDateString(
                        'ko-KR',
                        {
                          year: 'numeric',
                          month: '2-digit',
                          day: '2-digit',
                        }
                      )}
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div className="mb-[30px] w-full h-[20px]">
            <CommentForm todo={todo} onCommentSuccess={handleCommentSuccess} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoDetail;
