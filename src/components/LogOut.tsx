"use client";

import React from "react";
import { supabase } from "@/supabase/supabase";
import { useRouter } from "next/navigation";

const LogOut = () => {
  const router = useRouter();
  const signOutButton = async () => {
    const session = await supabase.auth.getSession();
    const authEmail: string | undefined = session.data.session?.user.email;
    if (authEmail) {
      const { error: dbError } = await supabase
        .from("usersAccounts")
        .delete()
        .eq("email", authEmail);
    }

    alert("로그아웃이 완료됐습니다.");
    let { error } = await supabase.auth.signOut();
    router.replace("/");
    router.refresh();

    localStorage.clear();
  };

  return <button onClick={signOutButton}>로그아웃</button>;
};

export default LogOut;
