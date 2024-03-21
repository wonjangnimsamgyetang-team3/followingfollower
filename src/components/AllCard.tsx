"use client";

import { supabase } from "@/supabase/supabase";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const AllCard = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["todos"],
    queryFn: async () => {
      const response = await supabase.from("TodoList").select("*");
      return response.data;
    },
  });

  const todoAllCard = data?.map((card: any) => {
    return (
      <article key={card.todoId}>
        {card.title} | {card.nickname} | {card.contents} | {card.start} /
        {/* 아티클 : 작은 카드같은거에 쓴다 */}
      </article>
    );
  });

  if (isLoading) {
    <div>로딩 중 입니다...</div>;
  }

  if (isError) {
    <div>에러 입니다...</div>;
  }
  return <div>{todoAllCard}</div>;
};

export default AllCard;
