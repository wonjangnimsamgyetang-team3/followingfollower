"use client";

import { supabase } from "@/supabase/supabase";
import React from "react";
import { useQuery } from "@tanstack/react-query";

import type { Todo } from "@/app/types/type";

const NewCard = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["todos"],
    queryFn: async () => {
      const response = await supabase.from("TodoList").select("*");
      return response.data;
    },
  });

  console.log(data);

  if (isLoading) {
    <div>로딩 중 입니다...</div>;
  }

  if (isError) {
    <div>에러 입니다...</div>;
  }
  return <div>gld</div>;
};

export default NewCard;
