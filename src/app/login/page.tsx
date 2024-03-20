"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "@/supabase/supabase";
import { useRouter } from "next/navigation";
import useStoreState from "../shared/store";

const SingUpPage = () => {
  const [userEmail, setUserEmail] = useState("");
  const [userPw, setUserPw] = useState("");
  const [userCkPw, setUserCkPw] = useState("");
  const [userNickname, setUserNickname] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPw, setLoginPw] = useState("");
  const [session, setSession] = useState<User | null>();
  const { addUser } = useStoreState();
  const router = useRouter();

  //유저정보 가져오기
  useEffect(() => {
    const test = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setSession(user);

      console.log("testUser", user);
    };
    test();
  }, []);

  //회원가입
  const signUpHandler = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    if (!userEmail || !userPw || !userNickname) {
      alert("빈칸 없이 작성해주세요");
      return;
    }

    if (userPw !== userCkPw) {
      alert("비밀번호 제대로 확인하세용");
      return;
    }

    let { data, error } = await supabase.auth.signUp({
      email: userEmail,
      password: userPw,
      options: {
        data: {
          userNickname: userNickname,
          avatar: "",
          contents: "",
        },
      },
    });

    const { data: insertData, error: insetError } = await supabase
      .from("usersAccounts")
      .insert([
        {
          userNickname: userNickname,
          avatar: "",
          contents: "",
          userEmail: userEmail,
        },
      ])
      .select();

    setUserEmail("");
    setUserPw("");
    setUserCkPw("");
    setUserNickname("");
    alert(`안녕하세요 ${userEmail}님!`);
  };

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

    router.push("/");
    const userInfo = {
      token: loginUser.session?.access_token,
    };
    addUser(userInfo);
  };

  // //로그아웃
  const signOut = async () => {
    alert("로그아웃");
    let { error } = await supabase.auth.signOut();
    router.replace("/");
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
        <form onSubmit={signUpHandler} className="flex flex-col">
          <span>회원가입 하기</span>
          <div>
            <span>아이디</span>{" "}
            <input
              type="text"
              onChange={(e) => {
                setUserEmail(e.target.value);
              }}
              value={userEmail}
              className="border border-indigo-600 w-80"
            />
          </div>
          <div>
            <span>비밀번호</span>
            <input
              type="text"
              onChange={(e) => setUserPw(e.target.value)}
              value={userPw}
              className="border border-indigo-600 w-80"
            />
          </div>
          <div>
            <span>비밀번호 확인</span>
            <input
              type="text"
              onChange={(e) => setUserCkPw(e.target.value)}
              value={userCkPw}
              className="border border-indigo-600 w-80"
            />
          </div>
          <div>
            <span>닉네임</span>
            <input
              type="text"
              onChange={(e) => setUserNickname(e.target.value)}
              value={userNickname}
              className="border border-indigo-600 w-80"
            />
          </div>

          <button>회원가입</button>
        </form>
      </div>
      <hr />
      <div>
        {" "}
        <button onClick={socialSignInHandler}>깃허브로 로그인</button>
      </div>
      <hr />
      <div>
        <form onSubmit={signInHandler} className="flex flex-col">
          <div>로그인 하기</div>
          <br />
          <div>
            <span> 로그인</span>
            <input
              type="text"
              onChange={(e) => {
                setLoginEmail(e.target.value);
              }}
              value={loginEmail}
              className="border border-indigo-600"
            />
          </div>
          <div>
            <span>비밀번호</span>
            <input
              type="text"
              onChange={(e) => setLoginPw(e.target.value)}
              value={loginPw}
              className="border border-indigo-600"
            />
          </div>
          <button>로그인</button>
        </form>
      </div>
      <div>{session ? <button onClick={signOut}>로그아웃</button> : ""}</div>
    </div>
  );
};

export default SingUpPage;
