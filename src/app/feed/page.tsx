"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import useStoreState from "@/shared/store";
import { supabase } from "@/supabase/supabase";
import TodoList from "@/components/TodoList";

const FeedPage = () => {
  const { addUser } = useStoreState();
  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      const withAvatar =
        user?.user_metadata.avatar_url ?? user?.user_metadata.avatar;
      const withEmail = user?.user_metadata.email ?? user?.user_metadata.email;
      const withName =
        user?.user_metadata.preferred_username ??
        user?.user_metadata.userNickname;
      const withContents = user?.user_metadata.contents;
      const authId = user?.id; //authId 생성해주시면 됩니당
      addUser({
        avatar: withAvatar,
        nickname: withName,
        contents: "",
        id: authId,
        email: withEmail,
      });

      if (user) {
        const { data: insertData, error: insetError } = await supabase
          .from("usersAccounts")
          .insert([
            {
              avatar: withAvatar,
              contents: withContents,
              nickname: withName,
              email: withEmail,
            },
          ])
          .select();
      }
    };
    getUser();
  });

  return (
    <div className="w-full h-full grid grid-cols-1 place-items-center">
      <TodoList />
    </div>
  );
};

export default FeedPage;
