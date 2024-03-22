import React, { useEffect, useState } from 'react';
import { TodoType } from '../TodoCard';
import { supabase } from '@/supabase/supabase';
import TodoBar from '../TodoBar';
import CommentForm from './CommentForm';
import useStoreState from '@/app/shared/store';

export type CommentData = {
  nickname: string;
  comment: string;
  created_at: string;
  userId: string;
  email: string;
  id: string;
};

type Props = {
  todo: TodoType;
  onCommentCountChange: (count: number) => void;
  comment: CommentData;
};

const TodoDetail = ({ todo, onCommentCountChange }: Props) => {
  const [commentData, setCommentData] = useState<CommentData[]>([]);
  // const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  // const [commentId, setCommentId] = useState<string | null>(null);

  // Zustand hook
  const { userInfo } = useStoreState();
  console.log('로그인한 유저정보', userInfo);
  const nickname = userInfo?.nickname;
  const userAvatar = userInfo?.avatar;

  const getUserId = async () => {
    const { data: user } = await supabase.auth.getUser();
    return user?.user?.id;
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const id = await getUserId();
      setUserId(id);
    };

    fetchUserData();
  }, [userInfo]);

  useEffect(() => {
    fetchComments(todo.todoId);
  }, [todo.todoId]);

  const handleCommentSuccess = () => {
    fetchComments(todo.todoId);
  };

  async function fetchComments(todoId: string) {
    const { data: commentList, error } = await supabase
      .from('commentList')
      .select('nickname, comment, created_at, userId, email, id')
      .eq('todoId', todoId);

    if (error) {
      throw error;
    }

    setCommentData(commentList || []);
    onCommentCountChange(commentList.length);
  }

  const handleTodoDelete = async () => {
    if (window.confirm('todo를 삭제하시겠습니까?')) {
      const { error } = await supabase
        .from('TodoList')
        .delete()
        .eq('todoId', todo.todoId);
      if (error) {
        console.error('Todo 삭제 중 오류 발생:', error.message);
      } else {
        alert('Todo가 삭제되었습니다.');
        window.location.reload();
      }
    }
  };

  const handleCommentDelete = async (commentId: string) => {
    if (window.confirm('댓글을 삭제하시겠습니까?')) {
      const { error } = await supabase
        .from('commentList')
        .delete()
        .eq('id', commentId);
      if (error) {
        console.error('댓글 삭제 중 오류 발생:', error.message);
      } else {
        alert('댓글이 삭제되었습니다.');
        fetchComments(todo.todoId);
      }
    }
  };

  return (
    <div>
      <div className="flex w-full h-full">
        <div className="relative w-[500px] h-[650px] border-solid border-r-2 border-[#fb8494] p-8 mt-5 mb-5 mr-10">
          <div className="flex items-center ml-[15px] mb-[15px]">
            <img src={userAvatar} alt="userAvatar" />
            <p className="font-bold text-xl ml-[15px]">
              {' '}
              {userId === todo.userId ? nickname : todo.nickname}
            </p>
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
          <div>
            <button onClick={handleTodoDelete}>삭제</button>
          </div>
          <div className="pt-[160px]">
            <TodoBar todo={todo} commentCount={commentData.length} />
          </div>
        </div>
        <div className="h-[650px]">
          <ul className="flex flex-col  p-5 w-full h-full overflow-y-auto">
            {commentData.map((comment) => (
              <li
                className="border-b-2 border-solid border-subColor2 p-4"
                key={comment.id}
              >
                <div className="flex">
                  <img alt="avatar" />
                  <div className="flex flex-col ml-[15px]">
                    <span className="mb-[10px]">
                      {userId === comment.userId ? nickname : comment.nickname}
                    </span>
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
                    <button onClick={() => handleCommentDelete(comment.id)}>
                      삭제
                    </button>
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
