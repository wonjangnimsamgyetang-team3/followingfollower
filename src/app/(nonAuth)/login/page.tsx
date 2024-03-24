"use client";

import React, { useState } from "react";
import { FaGithub } from "react-icons/fa6";
import { SiKakaotalk } from "react-icons/si";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/supabase/supabase";
import useStoreState from "@/shared/store";
import PasswordModal from "@/components/FindPassword/PasswordModal";
import PasswordPotal from "@/components/FindPassword/PasswordPotal";
import PasswordDetail from "@/components/FindPassword/PasswordDetail";

const LoginPage = () => {
  const [loginEmail, setLoginEmail] = useState<string>("");
  const [loginPw, setLoginPw] = useState<string>("");
  //모달오픈 관리
  const [pwOpenModal, setPwOpenModal] = useState(false);
  const router = useRouter();
  const { addUser } = useStoreState();

  //로그인
  const signInHandler = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    //간단한 유효성 검사
    if (!loginEmail || !loginPw) {
      alert("빈칸 없이 작성해주세요");
      return;
    }

    //로그인 로직
    let { data: loginUser, error } = await supabase.auth.signInWithPassword({
      email: loginEmail,
      password: loginPw,
    });

    //오류발생
    if (error) {
      alert("아이디나 비밀번호를 확인해주세요");
      return;
    }

    //로그인 했을 경우
    if (loginUser) {
      const session = await supabase.auth.getSession();
      const authNickname =
        session.data.session?.user.user_metadata.userNickname;
      alert(`안녕하세요. ${authNickname}님!`);
    }

    //만약 마이페이지에 먼저 접근했을 경우-> 로그인 후 다시 마이페이지로 이동
    if (loginUser) {
      const url = localStorage.getItem("url");
      // const path = url?.split("/").slice(3).join("/");
      if (url === "/mypage") {
        alert("마이페이지로 이동합니다!");

        router.push("/mypage");
        router.refresh();
      } else {
        router.push("/");
        router.refresh();
      }
      localStorage.removeItem;
    }
  };

  //소셜 로그인
  //깃허브
  const githubSignInHandler = async () => {
    try {
      const { data: git, error } = await supabase.auth.signInWithOAuth({
        provider: "github",
        options: {
          queryParams: {
            access_type: "offline",
            prompt: "consent",
          },
          redirectTo: `${location.origin}/auth/callback`,
        },
      });
    } catch (error) {
      if (error) console.log(error);
      return;
    }
  };

  //카카오톡
  const kakaoSignInHandler = async () => {
    let { data: kakao, error } = await supabase.auth.signInWithOAuth({
      provider: "kakao",
      options: {
        queryParams: {
          access_type: "offline",
          prompt: "consent",
        },
        redirectTo: `${location.origin}/auth/callback`,
      },
    });
  };

  //비밀번호 찾기
  const findPasswordHandler = () => {
    //버튼 클릭 시 모달 오픈
    setPwOpenModal(true);
  };
  return (
    <div className="w-screen h-screen bg-subColor4 flex items-center flex justify-center ">
      <div className="  w-1/3 h-4/5 py-4 bg-white caret-pink-500 border-2 border-solid border-subColor1 rounded-[50px]">
        <div className="h-1/5 content-center ">
          <p className="flex justify-center text-4xl text-subColor1/100">
            로그인
          </p>
        </div>
        <form onSubmit={signInHandler} className="h-2/5 content-center">
          <div className="h-2/6 flex justify-center">
            <input
              type="email"
              onChange={(e) => {
                setLoginEmail(e.target.value);
              }}
              value={loginEmail}
              className="w-10/12 h-4/5 pl-4 content-center border border-solid border-subColor1 rounded-[15px]"
              placeholder="이메일"
            />
          </div>
          <div className="h-2/6 flex justify-center">
            {" "}
            <input
              type="text"
              onChange={(e) => setLoginPw(e.target.value)}
              value={loginPw}
              className="w-10/12 h-4/5 pl-4 content-center border border-solid border-subColor1 rounded-[15px]"
              placeholder="비밀번호"
            />
          </div>
          <div className="h-2/6 flex justify-center">
            {" "}
            <button
              className="w-10/12 h-4/5 content-center bg-subColor2 rounded-xl hover:drop-shadow rounded-[15px]"
              type="submit"
            >
              <p className="font-semibold text-lg ">로그인</p>
            </button>
          </div>
        </form>
        <div className="h-2/5 content-center ">
          <div className="h-1/6 flex justify-center">
            <p className="content-center text-lg">
              <button onClick={findPasswordHandler}>
                <p className="text-subColor3/100">비밀번호를 잊으셨나요?</p>
              </button>
            </p>
          </div>
          <div className="h-4/6 flex justify-center">
            <div className="w-2/4 content-center flex justify-end">
              <button
                onClick={githubSignInHandler}
                className="mr-4 justify-self-end "
              >
                <FaGithub size={100} />
              </button>
            </div>
            <div className="w-2/4 content-center">
              <button onClick={kakaoSignInHandler} className="ml-4">
                <SiKakaotalk size={100} />
              </button>
            </div>
          </div>
          <div className="h-1/6 flex justify-center">
            <p className="content-center text-lg">
              {" "}
              <Link href="/join">
                <p className="font-semibold text-subColor1/100">회원가입</p>
              </Link>
            </p>
          </div>
        </div>
      </div>
      {/**모달 창 */}

      {pwOpenModal && (
        <PasswordPotal>
          <div>
            <PasswordModal onClose={() => setPwOpenModal(false)}>
              <PasswordDetail />
            </PasswordModal>
          </div>
        </PasswordPotal>
      )}
    </div>
  );
};

export default LoginPage;
