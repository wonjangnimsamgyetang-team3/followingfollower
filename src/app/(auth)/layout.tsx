"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "@/supabase/supabase";
import { useRouter } from "next/navigation";
import Loading from "@/components/Loading";

const AuthLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [session, setSession] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        alert("로그인이 필요합니다. 로그인 페이지로 이동합니다.");
        localStorage.setItem("url", "/mypage");
        router.push("/login");
      } else {
        setSession(true);
      }
    };

    getUser();
  });

  // 세션 데이터가 없으면 자식 컴포넌트(children)를 렌더링하지 않습니다.
  if (!session) {
    return <Loading />;
  }

  return (
    <div>
      {/*로그인 필수 페이지*/}
      {children}
    </div>
  );
};

export default AuthLayout;
