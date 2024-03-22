"use client";

import React from "react";
import { supabase } from "@/supabase/supabase";
import { useQuery } from "@tanstack/react-query";
import profile from "@/assets/profile.png";
import Image from "next/image";

import type { Todo } from "@/app/types/type";

const LikeTop = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["todoed"],
    queryFn: async () => {
      const response = await supabase
        .from("TodoList")
        .select("*")
        .order(`likeCount`, { ascending: false })
        .range(0, 2);
      // LikeCount 가 높은 순서대로
      return response.data;
    },
  });

  const todoTopCard = data?.map((card) => {
    return (
      <section
        key={card.todoId}
        className="pb-6 flex place-items-center gap-4 border-b-2 border-solid border-subColor1"
      >
        <Image
          src={profile}
          className="rounded-full"
          alt="프로필 이미지"
          width={70}
          height={70}
        />
        <div className="flex flex-col gap-5">
          <h4>{card.nickname}</h4>
          <p>팔로우 수.. 넣을것임</p>
        </div>
      </section>
    );
  });

  if (isLoading) {
    <div>로딩 중 입니다...</div>;
  }

  if (isError) {
    <div>에러 입니다...</div>;
  }
  return (
    <article className="p-8 flex flex-col gap-6 border-solid border-2 border-subColor2 rounded-lg">
      {todoTopCard}
    </article>
  );
};

export default LikeTop;
