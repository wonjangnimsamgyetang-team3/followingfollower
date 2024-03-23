"use client";

import { supabase } from "@/supabase/supabase";
import React, { FormEvent, useState } from "react";
import { TodoType } from "../TodoCard";
import useStoreState from "@/shared/store";
import Image from "next/image";

type Props = {
  todo: TodoType;
  onCommentSuccess: () => void;
};

const CommentForm = ({ todo, onCommentSuccess }: Props) => {
  const [comment, setComment] = useState("");
  const buttonDisabled = comment.length === 0;

  //zustand
  const { userInfo } = useStoreState();
  console.log("로그인한 유저정보", userInfo);
  const nickname = userInfo?.nickname;
  const userAvatar = userInfo?.avatar || "";
  // const email = userinfo?.email;
  // const id = userInfo?.id;
  console.log("userAvatar:", userAvatar);

  const handleCommentSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { data: user } = await supabase.auth.getUser();
    const userEmail = user?.user?.email;
    const userId = user?.user?.id;

    const formData = new FormData();
    formData.append("comment", comment);
    const { data } = await supabase.from("commentList").insert([
      {
        nickname: nickname,
        comment: comment,
        todoId: todo.todoId,
        email: userEmail,
        userId: userId,
        avatar: userAvatar,
      },
    ]);
    onCommentSuccess();
    setComment("");
  };

  return (
    <form className="flex items-center" onSubmit={handleCommentSubmit}>
      <Image
        className="w-[50px] h-[50px] mr-[10px]"
        alt="avatar"
        src={userAvatar}
        width={100}
        height={100}
      />
      <input
        className="w-[250px] h-[40px] border-solid border-2 border-gray-200 rounded-[10px] p-[10px]"
        name="comment"
        type="text"
        placeholder="댓글을 작성해주세요."
        required
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        maxLength={50}
      />
      <button className="font-bold ml-2 rounded-[15px] bg-[#fb8494] w-[120px] h-[40px]">
        작성하기
      </button>
    </form>
  );
};

export default CommentForm;
