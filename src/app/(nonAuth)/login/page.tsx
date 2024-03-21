"use client";

import React, { useEffect, useState } from "react";
import { FaGithub } from "react-icons/fa6";
import Link from "next/link";
import { useRouter } from "next/navigation";

import type { Database } from "database.types";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const LoginPage = () => {
  const [loginEmail, setLoginEmail] = useState<string>("");
  const [loginPw, setLoginPw] = useState<string>("");
  const [user, setUser] = useState<any | null>(null);
  const supabase = createClientComponentClient<Database>();
  const router = useRouter();

  // //유저정보 가져오기
  useEffect(() => {
    const test = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setUser(user);
        console.log("user", user);
      }
    };

    test();
  }, []);

  //로그인
  const signInHandler = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    let { data: loginUser, error } = await supabase.auth.signInWithPassword({
      email: loginEmail,
      password: loginPw,
    });

    if (!loginEmail || !loginPw) {
      alert("빈칸 없이 작성해주세요");
      return;
    }
    if (error) {
      alert(error);
      return;
    }

    alert(`로그인 성공`);
    setLoginEmail("");
    setLoginPw("");

    const session = await supabase.auth.getSession();
    const authAvatar = session.data.session?.user.user_metadata.avatar;
    const authContents = session.data.session?.user.user_metadata.contents;
    const authNickname = session.data.session?.user.user_metadata.nickname;
    const authEmail = session.data.session?.user.email;

    const { data: insertData, error: insetError } = await supabase
      .from("usersAccounts")
      .insert([
        {
          avatar: authAvatar,
          contents: authContents,
          nickname: authNickname,
          email: authEmail,
        },
      ])
      .select();
    //현재 페이지를 새로고침
    router.push("/");
    router.refresh();
  };

  // //로그아웃
  const signOut = async () => {
    const session = await supabase.auth.getSession();
    const authEmail: string | undefined = session.data.session?.user.email;
    if (authEmail) {
      const { error: dbError } = await supabase
        .from("usersAccounts")
        .delete()
        .eq("email", authEmail);
    }

    alert("로그아웃");
    let { error } = await supabase.auth.signOut();
    router.replace("/");
    router.refresh();
  };

  //소셜 로그인
  const socialSignInHandler = async () => {
    let { data, error } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: "http://localhost:3000",
      },
    });
  };

  return (
    <div>
      <div>
        {" "}
        <button onClick={socialSignInHandler}>
          <FaGithub size={50} />
        </button>
      </div>
      <hr />
      <div>
        <form onSubmit={signInHandler} className="flex flex-col">
          <div>로그인 하기</div>
          <br />
          <div>
            <input
              type="email"
              onChange={(e) => {
                setLoginEmail(e.target.value);
              }}
              value={loginEmail}
              className="border border-indigo-600"
              placeholder="아이디"
            />
          </div>
          <div>
            <input
              type="text"
              onChange={(e) => setLoginPw(e.target.value)}
              value={loginPw}
              className="border border-indigo-600"
              placeholder="비밀번호"
            />
          </div>
          <button>로그인</button>
        </form>
      </div>
      <div>
        <button onClick={signOut}>로그아웃</button>
      </div>

      <span>
        <Link href="/join">회원가입하러가기</Link>
      </span>
    </div>
  );
};

export default LoginPage;
