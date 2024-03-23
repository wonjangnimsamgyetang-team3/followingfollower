"use client";

import React from "react";
import { supabase } from "@/supabase/supabase";
import { useRouter } from "next/navigation";
import useStoreState from "@/shared/store";

const LogOut = () => {
  const { removeUser } = useStoreState();
  const router = useRouter();
  const signOutButton = async () => {
    const session = await supabase.auth.getSession();
    const authEmail: string | undefined = session.data.session?.user.email;
    if (authEmail) {
      const { error: dbError } = await supabase
        .from("myPageAccount")
        .delete()
        .eq("email", authEmail);
    }

    alert("로그아웃이 완료됐습니다.");
    let { error } = await supabase.auth.signOut();
    localStorage.clear();
    router.replace("/");
    router.refresh();
    removeUser();

    if (error) {
      alert(error.message);
    }
  };

  return <button onClick={signOutButton}>로그아웃</button>;
};

export default LogOut;
