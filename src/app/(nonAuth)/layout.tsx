"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "@/supabase/supabase";
import { useRouter } from "next/navigation";

const NonAuthlayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const router = useRouter();
  //state
  const [session, setSession] = useState<boolean>(false);

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      //로그인 한 상태 시
      if (user) {
        alert("이미 로그인 상태입니다. 홈으로 이동합니다.");
        router.push("/");
      } else {
        setSession(true);
      }
    };

    getUser();
  });

  return (
    <div>
      {/*로그아웃 필수 페이지*/}
      {children}
    </div>
  );
};

export default NonAuthlayout;
