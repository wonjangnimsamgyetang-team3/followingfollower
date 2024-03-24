import React, { useEffect, useState } from 'react';
import { TodoType } from '../TodoCard';
import { supabase } from '@/supabase/supabase';
import TodoBar from '../TodoBar';
import CommentForm from './CommentForm';
import useStoreState from '@/shared/store';
import Image from 'next/image';
import defaultProfile from '../../assets/profile.png';

export type CommentData = {
  nickname: string;
  comment: string;
  created_at: string;
  userId: string;
  email: string;
  id: string;
  avatar: string;
};

type Props = {
  todo: TodoType;
  editedTodo: TodoType;
  onCommentCountChange: (count: number) => void;
  onDetailContentChange: (editedTitle: string, editedContent: string) => void;
};

const TodoDetail = ({
  todo,
  editedTodo,
  onCommentCountChange,
  onDetailContentChange,
}: Props) => {
  const [commentData, setCommentData] = useState<CommentData[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todo.title);
  const [editedContent, setEditedContent] = useState(todo.contents);

  // Zustand hook
  const { userInfo } = useStoreState();
  // console.log("로그인한 유저정보", userInfo);
  const nickname = userInfo?.nickname;
  const userAvatar = userInfo?.avatar;

  const getUserId = async () => {
    const { data: user } = await supabase.auth.getUser();
    return user?.user?.id;
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const id = await getUserId();
      setUserId(id || '');
    };
    fetchUserData();
  }, [userInfo]);

  useEffect(() => {
    fetchComments(todo.todoId);
  });

  const handleCommentSuccess = () => {
    fetchComments(todo.todoId);
  };

  async function fetchComments(todoId: string) {
    const { data: commentList, error } = await supabase
      .from('commentList')
      .select('nickname, comment, created_at, userId, email, id, avatar')
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
        console.error('todo삭제 오류:', error.message);
      } else {
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
        console.error('댓글 삭제 오류:', error.message);
      } else {
        fetchComments(todo.todoId);
      }
    }
  };

  const handleTodoEdit = async () => {
    if (editedTitle === todo.title && editedContent === todo.contents) {
      alert('수정된 부분이 없습니다.');
      return;
    }

    try {
      const { data, error } = await supabase
        .from('TodoList')
        .update([
          {
            title: editedTitle,
            contents: editedContent,
          },
        ])
        .eq('todoId', todo.todoId)
        .select();

      if (error) {
        console.error('Todo 수정 오류:', error.message);
      } else {
        setEditedTitle(editedTitle);
        setEditedContent(editedContent);
        onDetailContentChange(editedTitle, editedContent);
        todo.title = editedTitle;
        todo.contents = editedContent;
        setIsEditMode(false);
      }
    } catch (error) {
      console.error('Todo 수정 오류');
    }
  };

  const handleCancelEdit = () => {
    setEditedTitle(editedTodo.title);
    setEditedContent(editedTodo.contents);
    setIsEditMode(false);
  };

  return (
    <div className="flex w-full h-full gap-4">
      <div className="flex flex-col justify-between w-1/2 p-3 pr-6 border-solid border-r-2 border-subColor1">
        <section className="grow">
          <div className="flex items-center ml-[5px] mb-[15px]">
            {userId === todo.userId ? (
              userAvatar ? (
                <Image
                  className="mr-[15px] rounded-full"
                  src={userAvatar}
                  alt="userAvatar"
                  height={50}
                  width={50}
                />
              ) : (
                <Image
                  className="mr-[15px] rounded-full"
                  src={defaultProfile}
                  alt="defaultProfile"
                  height={50}
                  width={50}
                />
              )
            ) : (
              <Image
                className="mr-[15px] rounded-full"
                src={todo.avatar}
                alt="todoAvatar"
                height={50}
                width={50}
              />
            )}
            <p className="font-bold text-xl ml-[5px]">
              {userId === todo.userId ? nickname : todo.nickname}
            </p>
          </div>
          <div className="relative w-full h-1/2 mb-4 object-fit rounded-[30px]">
            {todo.imageFile ? (
              <Image
                className="object-cover rounded-[30px] mb-[20px]"
                src={todo.imageFile}
                alt="todoImage"
                fill
              />
            ) : null}
          </div>
          {isEditMode ? (
            <>
              <textarea
                className="font-bold text-xl outline-none resize-none border-2 border-solid border-subColor1 w-full h-[45px] p-[5px] mb-[5px] rounded-[10px]"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                maxLength={20}
              />
              <textarea
                className="outline-none resize-none border-2 border-solid border-subColor1 w-full h-1/6 p-[5px] rounded-[10px]"
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
                maxLength={100}
              />
            </>
          ) : (
            <div>
              <p className="font-bold text-xl h-[45px] p-[5px]">
                {editedTitle}
              </p>
              <p className="h-1/4 p-[5px]">{editedContent}</p>
            </div>
          )}
        </section>
        <section>
          <div className="pt-[20px]">
            <TodoBar todo={todo} commentCount={commentData.length} />
          </div>
          {userId === todo.userId && (
            <div className="flex items-center justify-center pt-[20px]">
              {!isEditMode ? (
                <button
                  className="font-bold pt-3 pb-3 pl-8 pr-8 border-2 border-solid rounded-[10px] border-subColor2 bg-subColor2 flex items-center justify-center hover:drop-shadow mr-[80px]"
                  onClick={() => setIsEditMode(true)}
                >
                  수정
                </button>
              ) : (
                <button
                  className="font-bold pt-3 pb-3 pl-8 pr-8 border-2 border-solid rounded-[10px] border-subColor2 hover:drop-shadow bg-white mr-[50px]"
                  onClick={handleTodoEdit}
                >
                  수정 완료
                </button>
              )}
              {isEditMode ? (
                <>
                  <button
                    className="font-bold pt-3 pb-3 pl-8 pr-8 border-2 border-solid rounded-[10px] border-subColor3 bg-white hover:drop-shadow"
                    onClick={handleCancelEdit}
                  >
                    취소
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="font-bold pt-3 pb-3 pl-8 pr-8 border-2 border-solid rounded-[10px] border-subColor3 bg-white hover:drop-shadow"
                    onClick={handleTodoDelete}
                  >
                    삭제
                  </button>
                </>
              )}
            </div>
          )}
        </section>
      </div>
      <div className="flex flex-col justify-between">
        <ul className="flex flex-col overflow-y-auto ">
          {commentData.map((comment) => (
            <li
              className="border-b-2 border-solid border-subColor2 p-4"
              key={comment.id}
            >
              <div className="flex items-center">
                {comment.avatar ? (
                  <Image
                    className="mr-[15px] rounded-full"
                    src={comment.avatar}
                    alt="avatar"
                    height={70}
                    width={70}
                  />
                ) : null}
                <div className="flex flex-col ml-[15px] w-full">
                  <span className="mb-[10px]">
                    {userId === comment.userId ? nickname : comment.nickname}
                  </span>
                  <span className="text-lg mb-[20px]">{comment.comment}</span>
                  <div className="w-full flex justify-between">
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
                    <div>
                      {userId === comment.userId && (
                        <button onClick={() => handleCommentDelete(comment.id)}>
                          삭제
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <div>
          <CommentForm todo={todo} onCommentSuccess={handleCommentSuccess} />
        </div>
      </div>
    </div>
  );
};

export default TodoDetail;
