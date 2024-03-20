"use client";

import React from "react";
import { supabase } from "@/supabase/supabase";

const SingOutButton = () => {
  //로그아웃
  const signOutHandler = async () => {
    alert("로그아웃");
    let { error } = await supabase.auth.signOut();
    window.location.reload();
  };

  return (
    <div>
      <button onClick={signOutHandler}>로그아웃</button>
    </div>
  );
};

export default SingOutButton;
