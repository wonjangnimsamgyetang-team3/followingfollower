"use client";
import { supabase } from "@/supabase/supabase";
import { useEffect } from "react";

export default function Home() {
  //유저정보 가져오기
  useEffect(() => {
    const test = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      console.log("로그인여부", user);
    };
    test();
  }, []);

  return <div>hi</div>;
}
