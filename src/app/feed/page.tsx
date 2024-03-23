"use client";

import react, { useEffect } from "react";
import PostList from "@/components/TodoList";
import Link from "next/link";
import useStoreState from "@/app/shared/store";
import { supabase } from "@/supabase/supabase";

const page = () => {
  return (
    <div className="w-full h-full flex items-center flex justify-center">
      <Link href="/feed/newTodo">newTodo</Link>
      <PostList />
    </div>
  );
};

export default page;
