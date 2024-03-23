"use client";

import { supabase } from "@/supabase/supabase";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import React, { useState } from "react";

import type { Todo } from "@/types/type";
import TodoBar from "./TodoBar";

const AllCard = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["todos"],
    queryFn: async () => {
      const response = await supabase.from("TodoList").select("*").range(0, 4);
      const { data } = response;
      return data;
    },
  });

  const todoAllCard = data?.map((card: any) => {
    return (
      <article
        key={card.todoId}
        className="m-3 p-6 flex flex-col gap-4 border-solid border-2 border-subColor2 rounded-lg"
      >
        <section>
          <Image
            src={card.imageFile}
            className="rounded-3xl"
            alt="todo 이미지"
            width={300}
            height={300}
          />
        </section>
        <section className="flex flex-col gap-2">
          <h3 className="text-lg">{card.title}</h3>
          <h4>{card.nickname}</h4>
          <p>{card.contents}</p>
        </section>
      </article>
    );
  });

  if (isLoading) {
    <div>로딩 중 입니다...</div>;
  }

  if (isError) {
    <div>에러 입니다...</div>;
  }
  return <div className="flex">{todoAllCard}</div>;
};

export default AllCard;
