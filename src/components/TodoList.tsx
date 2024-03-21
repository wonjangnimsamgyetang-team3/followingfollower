"use client";

import React, { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { Database } from "../../database.types";
import TodoCard from "./TodoCard";

const supabase = createClient<Database>(
  "https://jcsjtjiqolsewkoutsag.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impjc2p0amlxb2xzZXdrb3V0c2FnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTA4MzEyOTMsImV4cCI6MjAyNjQwNzI5M30.Mm1I1g_5qrNONvPK8gsK_3xDBim04lX01cQAX1yXVB0"
);

interface TodoData {
  contents: string;
  created_at: string;
  end: string;
  imageFile: string;
  likeCount: number;
  liked: boolean;
  nickname: string;
  start: string;
  title: string;
  todoId: string;
}

const TodoList = () => {
  const [todoData, setTodoData] = useState<TodoData[]>([]);

  useEffect(() => {
    getTestData();
  }, []);

  async function getTestData() {
    let { data } = await supabase.from("TodoList").select("*");
    setTodoData(data);
  }

  return (
    <div className="grid grid-cols-3 mb-[30px] bg-sky-500 mt-[50px]">
      {todoData.map((item, index) => (
        <TodoCard key={index} todo={item} />
      ))}
    </div>
  );
};

export default TodoList;
