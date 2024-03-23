import React, { useEffect, useState } from "react";
import { supabase } from "@/supabase/supabase";
import TodoCard from "./TodoCard";
import Link from "next/link";

export type TodoData = {
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
  liketest: string[];
  email: string;
  userId: string;
};

const TodoList = () => {
  const [todoData, setTodoData] = useState<TodoData[]>([]);
  const [sortedBy, setSortedBy] = useState<string>("created_at");

  useEffect(() => {
    getRecentTodo();
  }, []);

  async function getMostLikedTodo() {
    let { data } = await supabase.from("TodoList").select("*");
    data.sort((a, b) => (b.liketest?.length || 0) - (a.liketest?.length || 0));
    setSortedBy("liketest");
    setTodoData([...data]);
  }

  async function getRecentTodo() {
    let { data } = await supabase.from("TodoList").select("*");
    data.sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
    setSortedBy("created_at");
    setTodoData([...data]);
  }

  const handleSortChange = async (sortBy: string) => {
    if (sortBy === "liketest") {
      await getMostLikedTodo();
    } else {
      await getRecentTodo();
    }
  };

  const handleDropdownClick = () => {
    console.log("현재 정렬 기준:", sortedBy);
  };

  return (
    <div>
      <div className="mt-[30px] flex justify-between w-full pl-[30px] pr-[30px]">
        <details className="dropdown" onClick={handleDropdownClick}>
          <summary className="m-1 btn w-[100px] p-3">▼ 최신 순</summary>
          <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-full">
            <li onClick={() => handleSortChange("created_at")}>
              <a>최신 순</a>
            </li>
            <li onClick={() => handleSortChange("liketest")}>
              <a>좋아요 순</a>
            </li>
          </ul>
        </details>
        <Link
          href="/feed/newTodo"
          className="border-2 grid place-items-center border-solid border-[#fb8494] p-4  h-4/5 content-center bg-subColor2 rounded-xl hover:drop-shadow rounded-[15px] font-bold transition-all duration-100"
        >
          투두 작성하기
        </Link>
      </div>
      <div className="grid grid-cols-3 mb-[30px] mt-[10px]">
        {todoData.map((item, index) => (
          <TodoCard key={index} todo={item} />
        ))}
      </div>
    </div>
  );
};

export default TodoList;
