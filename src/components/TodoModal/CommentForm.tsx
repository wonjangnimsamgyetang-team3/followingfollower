"use client";

import { supabase } from "@/supabase/supabase";
import { FormEvent, useState } from "react";
import { TodoType } from "../TodoCard";
import Image from "next/image";
import useStoreState from "@/shared/store";
import defaultProfile from "@/assets/profile.png";

type Props = {
  todo: TodoType;
  onCommentSuccess: () => void;
};

const CommentForm = ({ todo, onCommentSuccess }: Props) => {
  const [comment, setComment] = useState("");
  const buttonDisabled = comment.length === 0;

  const { userInfo } = useStoreState();
  const nickname = userInfo?.nickname;
  const userAvatar = userInfo?.avatar || "";

  const handleCommentSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { data: user } = await supabase.auth.getUser();
    const userEmail = user?.user?.email;
    const userId = user?.user?.id;

    if (!userId) {
      alert("로그인 후 이용해 주세요.");
      return;
    }

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
      {userAvatar ? (
        <Image
          className="w-[50px] h-[50px] mr-[15px] rounded-full"
          src={userAvatar}
          alt="userAvatar"
          height={100}
          width={100}
        />
      ) : (
        <Image
          className="w-[50px] h-[50px] mr-[15px] rounded-full"
          src={defaultProfile}
          alt="defaultProfile"
          height={100}
          width={100}
        />
      )}
      <input
        className="w-[330px] border-solid border-2 border-gray-200 rounded-[15px] p-[10px]"
        name="comment"
        type="text"
        placeholder="댓글을 작성해주세요."
        required
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        maxLength={50}
      />
      <button className="font-bold ml-2 rounded-[15px] bg-subColor1 w-[120px] h-[40px]">
        작성하기
      </button>
    </form>
  );
};

export default CommentForm;
