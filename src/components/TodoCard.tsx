"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "@/supabase/supabase";
import TodoBar from "./TodoBar";
import ModalPotal from "./TodoModal/ModalPortal";
import TodoModal from "./TodoModal/TodoModal";
import TodoDetail from "./TodoModal/TodoDetail";
import useStoreState from "@/shared/store";
import Image from "next/image";

export type TodoType = {
  contents: string;
  created_at: string;
  email: string;
  end: string;
  imageFile: string;
  likeCount: number;
  liked: boolean;
  nickname: string;
  start: string;
  title: string;
  todoId: string;
  liketest: string[];
  userId: string;
};

const TodoCard = ({ todo }: { todo: TodoType }) => {
  const [openModal, setOpenModal] = useState(false);
  const [commentCount, setCommentCount] = useState(0);
  const [userId, setUserId] = useState<string | null>(null);
  const [editedTodo, setEditedTodo] = useState<TodoType>(todo);

  console.log("todo.contents:", todo.contents);
  console.log("todo.title:", todo.title);
  console.log("editedTodo.title:", editedTodo.title);
  console.log("editedTodo.contents", editedTodo.contents);

  //zustand
  const { userInfo } = useStoreState();
  // console.log('로그인한 유저정보', userInfo);
  const nickname = userInfo?.nickname;
  const myEmail = userInfo?.email;

  const getUserEmail = async () => {
    const { data: user } = await supabase.auth.getUser();
    return user?.user?.id;
  };

  const isCurrentUserTodo = userId === todo.userId;

  useEffect(() => {
    getUserEmail();
  }, [userInfo]);

  useEffect(() => {
    fetchCommentCount(todo.todoId);
  }, [todo.todoId]);

  const fetchCommentCount = async (todoId: string) => {
    const { data, error } = await supabase
      .from("commentList")
      .select("count", { count: "exact" })
      .eq("todoId", todoId);

    if (error) {
      throw error;
    }

    setCommentCount(data[0]?.count || 0);
  };

  //follow test
  const followHandler = () => {
    alert(`${todo.email}, ${myEmail}`);
  };

  const handleDetailContentChange = (
    editedTitle: string,
    editedContent: string
  ) => {
    setEditedTodo({
      ...editedTodo,
      title: editedTitle,
      contents: editedContent,
    });
  };

  return (
    <div className="bg-white m-[15px] border-2 border-solid border-subColor2 rounded-[30px] p-[30px] flex flex-col items-center justify-center">
      <div>
        <div className="flex flex-col items-center justify-center">
          <h2 className="font-bold text-lg mb-[10px]">{editedTodo.title}</h2>
          {todo.imageFile ? (
            <Image
              src={todo.imageFile}
              alt="todoImage"
              className="object-cover rounded-[30px] mb-[20px] cursor-pointer"
              onClick={() => setOpenModal(true)}
              height={300}
              width={300}
            />
          ) : null}
        </div>
        <div className="w-full">
          <p className="mb-[10px]">
            {isCurrentUserTodo ? nickname : todo.nickname}
          </p>
          <button onClick={followHandler}>follow</button>
          <p
            className="mb-[20px] overflow-ellipsis cursor-pointer"
            onClick={() => setOpenModal(true)}
          >
            {editedTodo.contents}
          </p>
        </div>
      </div>
      <div className="w-full">
        <TodoBar todo={todo} commentCount={commentCount} />
        {openModal && (
          <ModalPotal>
            <div>
              <TodoModal onClose={() => setOpenModal(false)}>
                <TodoDetail
                  todo={todo}
                  editedTodo={editedTodo}
                  onCommentCountChange={setCommentCount}
                  onDetailContentChange={handleDetailContentChange}
                />
              </TodoModal>
            </div>
          </ModalPotal>
        )}
      </div>
    </div>
  );
};

export default TodoCard;
