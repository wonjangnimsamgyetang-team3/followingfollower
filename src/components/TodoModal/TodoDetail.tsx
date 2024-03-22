import React, { useEffect, useState } from "react";
import { TodoType } from "../TodoCard";
import { supabase } from "@/supabase/supabase";
import TodoBar from "../TodoBar";
import CommentForm from "./CommentForm";
import useStoreState from "@/app/shared/store";

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
  onCommentCountChange: (count: number) => void;
  comment: CommentData;
};

const TodoDetail = ({ todo, onCommentCountChange }: Props) => {
  const [commentData, setCommentData] = useState<CommentData[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todo.title);
  const [editedContent, setEditedContent] = useState(todo.contents);

  // Zustand hook
  const { userInfo } = useStoreState();
  console.log("로그인한 유저정보", userInfo);
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
      .from("commentList")
      .select("nickname, comment, created_at, userId, email, id, avatar")
      .eq("todoId", todoId);

    if (error) {
      throw error;
    }

    setCommentData(commentList || []);
    onCommentCountChange(commentList.length);
  }

  const handleTodoDelete = async () => {
    if (window.confirm("todo를 삭제하시겠습니까?")) {
      const { error } = await supabase
        .from("TodoList")
        .delete()
        .eq("todoId", todo.todoId);
      if (error) {
        console.error("Todo 삭제 중 오류 발생:", error.message);
      } else {
        window.location.reload();
      }
    }
  };

  const handleCommentDelete = async (commentId: string) => {
    if (window.confirm("댓글을 삭제하시겠습니까?")) {
      const { error } = await supabase
        .from("commentList")
        .delete()
        .eq("id", commentId);
      if (error) {
        console.error("댓글 삭제 중 오류 발생:", error.message);
      } else {
        fetchComments(todo.todoId);
      }
    }
  };

  const handleTodoEdit = async () => {
    if (editedTitle === todo.title || editedContent === todo.contents) {
      alert("수정된 부분이 없습니다.");
      return;
    }
    const { data, error } = await supabase
      .from("TodoList")
      .update([
        {
          title: editedTitle,
          contents: editedContent,
        },
      ])
      .eq("todoId", todo.todoId)
      .select();

    if (error) {
      console.error("Todo 수정 중 오류 발생:", error.message);
    } else {
      const { data: updatedTodo } = await supabase
        .from("TodoList")
        .select("*")
        .eq("todoId", todo.todoId)
        .single();

      if (updatedTodo) {
        setEditedTitle(updatedTodo.title);
        setEditedContent(updatedTodo.contents);
        setIsEditMode(false);
      }
    }
  };

  return (
    <div>
      <div className="flex w-full h-full">
        <div className="w-[500px] h-[650px] border-solid border-r-2 border-[#fb8494] p-8 mb-5 mr-10 mt-3">
          <div className="flex items-center ml-[5px] mb-[15px]">
            <img
              className="w-[50px] h-[50px] mr-[15px]"
              src={userAvatar}
              alt="userAvatar"
            />
            <p className="font-bold text-xl ml-[5px]">
              {" "}
              {userId === todo.userId ? nickname : todo.nickname}
            </p>
          </div>
          <div>
            <img
              className="rounded-[30px] mb-[20px] w-full h-full"
              src={todo.imageFile}
              alt="todoImage"
            />
          </div>
          {isEditMode ? (
            <>
              <input
                className="font-bold text-xl pb-[20px] outline-none border-b-2 border-solid border-[#fb8494] w-full"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
              />
              <textarea
                className="outline-none pb-[20px] resize-none border-b-2 border-solid border-[#fb8494] w-full"
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
              />
            </>
          ) : (
            <div>
              <p className="font-bold text-xl pb-[20px]">{todo.title}</p>
              <p>{todo.contents}</p>
            </div>
          )}
          <div className="pt-[100px]">
            <TodoBar todo={todo} commentCount={commentData.length} />
          </div>
          {userId === todo.userId && (
            <div>
              {!isEditMode ? (
                <button
                  className="font-bold pt-2 pb-2 pl-4 pr-4 border-2 border-solid rounded-[10px] border-gray-500 mt-[30px]"
                  onClick={() => setIsEditMode(true)}
                >
                  수정
                </button>
              ) : (
                <button
                  className="font-bold pt-2 pb-2 pl-4 pr-4 border-2 border-solid rounded-[10px] border-gray-500 mt-[30px]"
                  onClick={handleTodoEdit}
                >
                  수정 완료
                </button>
              )}
              {isEditMode ? (
                <>
                  <button
                    className="font-bold pt-2 pb-2 pl-4 pr-4 border-2 border-solid rounded-[10px] border-gray-500 mt-[30px]"
                    onClick={() => setIsEditMode(false)}
                  >
                    취소
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="font-bold pt-2 pb-2 pl-4 pr-4 border-2 border-solid rounded-[10px] border-gray-500 mt-[30px]"
                    onClick={handleTodoDelete}
                  >
                    삭제
                  </button>
                </>
              )}
            </div>
          )}
        </div>
        <div className="h-[610px]">
          <ul className="flex flex-col p-5 w-[400px] h-full overflow-y-auto">
            {commentData.map((comment) => (
              <li
                className="border-b-2 border-solid border-subColor2 p-4"
                key={comment.id}
              >
                <div className="flex flex items-center">
                  <img
                    className="w-[70px] h-[70px] mr-[15px]"
                    alt="avatar"
                    src={comment.avatar}
                  />
                  <div className="flex flex-col ml-[15px] w-full">
                    <span className="mb-[10px]">
                      {userId === comment.userId ? nickname : comment.nickname}
                    </span>
                    <span className="text-lg mb-[20px]">{comment.comment}</span>
                    <div className="w-full flex justify-between">
                      <div className="text-gray-400">
                        {new Date(comment.created_at).toLocaleDateString(
                          "ko-KR",
                          {
                            year: "numeric",
                            month: "2-digit",
                            day: "2-digit",
                          }
                        )}
                      </div>
                      <div>
                        {userId === comment.userId && (
                          <button
                            onClick={() => handleCommentDelete(comment.id)}
                          >
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
          <div className="mb-[30px] w-full h-[20px]">
            <CommentForm todo={todo} onCommentSuccess={handleCommentSuccess} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoDetail;
