"use client";

import { useState } from "react";
import { supabase } from "@/supabase/supabase";
import { useRouter } from "next/navigation";

const SingUpPage = () => {
  const [userEmail, setUserEmail] = useState<string>("");
  const [userPw, setUserPw] = useState<string>("");
  const [userCkPw, setUserCkPw] = useState<string>("");
  const [userNickname, setUserNickname] = useState<string>("");
  const router = useRouter();

  // 회원가입
  const signUpHandler = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    if (!userEmail || !userPw || !userNickname) {
      alert("빈칸 없이 작성해주세요!");
      return;
    }

    if (userPw !== userCkPw) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      let { data, error } = await supabase.auth.signUp({
        email: userEmail,
        password: userPw,
        options: {
          emailRedirectTo: `${location.origin}/auth/callback`,
          data: {
            userNickname: userNickname,
            //디폴트 이미지
            avatar: "/profile.png",
            contents: "",
          },
        },
      });
      //로그인 중복 가입 방지
      if (data?.user?.identities?.length === 0) {
        alert("이미 존재하는 아이디입니다.");
      }

      const {
        data: { session },
      } = await supabase.auth.getSession();

      console.log(session);

      alert(`회원가입이 완료됐습니다. 이메일 인증 후 로그인해주세요!`);
    } catch (insetError) {
      if (insetError) {
        console.log(insetError);
        alert(insetError);
        return;
      }
    }

    setUserEmail("");
    setUserPw("");
    setUserCkPw("");
    setUserNickname("");
    router.push("/login");
  };

  const singInHandler = () => {
    router.push("/login");
  };

  return (
    <div className="w-screen h-screen bg-subColor4 flex items-center flex justify-center ">
      <div className="  w-1/3 h-4/5 py-4 bg-white caret-pink-500 border-2 border-solid border-subColor1 rounded-[50px]">
        <div className="content-center h-1/6 ">
          <p className="flex justify-center text-4xl">회원가입</p>
        </div>
        <form onSubmit={signUpHandler} className="  h-4/6 flex flex-col ">
          <div className="flex justify-center h-1/4">
            <input
              className="w-10/12 h-4/5 content-center border border-solid border-subColor1 rounded-[15px]"
              type="email"
              onChange={(e) => setUserEmail(e.target.value)}
              value={userEmail}
              placeholder="이메일"
            />
          </div>
          <div className=" flex justify-center h-1/4">
            {" "}
            <input
              className="w-10/12 h-4/5 content-center border border-solid border-subColor1 rounded-[15px]"
              type="password"
              onChange={(e) => setUserPw(e.target.value)}
              value={userPw}
              placeholder="비밀번호"
            />
          </div>
          <div className="flex justify-center h-1/4">
            {" "}
            <input
              className="w-10/12 h-4/5 content-center border border-solid border-subColor1 rounded-[15px]"
              type="password"
              onChange={(e) => setUserCkPw(e.target.value)}
              value={userCkPw}
              placeholder="비밀번호 확인"
            />
          </div>
          <div className="flex justify-center h-1/4">
            {" "}
            <input
              className=" w-10/12 h-4/5 content-center border border-solid border-subColor1 rounded-[15px]"
              type="text"
              onChange={(e) => setUserNickname(e.target.value)}
              value={userNickname}
              placeholder="닉네임"
            />
          </div>
          <div className="flex justify-center h-1/4 ">
            {" "}
            <button
              className=" w-10/12 h-4/5 content-center bg-subColor2 rounded-xl hover:drop-shadow rounded-[15px]"
              type="submit"
            >
              <p className="text-lg">회원가입</p>
            </button>
          </div>
        </form>
        <div className="content-center flex justify-center h-1/6 ">
          <button
            className=" w-10/12 h-4/5 content-center  rounded-xl rounded-[15px]"
            type="submit"
            onClick={singInHandler}
          >
            <p className="text-lg">로그인</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingUpPage;
