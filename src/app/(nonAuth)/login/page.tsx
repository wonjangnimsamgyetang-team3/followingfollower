'use client';

import React, { useEffect, useState } from 'react';
import { FaGithub } from 'react-icons/fa6';
import { SiKakaotalk } from 'react-icons/si';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { supabase } from '@/supabase/supabase';
import useStoreState from '@/shared/store';

const LoginPage = () => {
  const [loginEmail, setLoginEmail] = useState<string>('');
  const [loginPw, setLoginPw] = useState<string>('');
  const router = useRouter();
  const { addUser } = useStoreState();

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
      alert('빈칸 없이 작성해주세요');
      return;
    }

    if (loginUser) {
      const session = await supabase.auth.getSession();
      const authAvatar = session.data.session?.user.user_metadata.avatar;
      const authContents = session.data.session?.user.user_metadata.contents;
      const authNickname =
        session.data.session?.user.user_metadata.userNickname;
      const authEmail = session.data.session?.user.email;
      const authId = session.data.session?.user.id;

      localStorage.setItem('avatar', authAvatar);
      localStorage.setItem('contents', authContents);
      localStorage.setItem('nickname', authNickname);

      addUser({
        avatar: authAvatar,
        nickname: authNickname,
        contents: authContents,
        id: authId,
        email: authEmail,
      });

      const { data: insertData, error: insetError } = await supabase
        .from('usersAccounts')
        .insert([
          {
            avatar: authAvatar,
            contents: authContents,
            nickname: authNickname,
            email: authEmail,
          },
        ])
        .select();

      alert(`안녕하세요. ${authNickname}님!`);
    }
    //현재 페이지를 새로고침
    if (loginUser) {
      router.push('/');
      router.refresh();
    }
  };

  //소셜 로그인
  const githubSignInHandler = async () => {
    try {
      const { data: git, error } = await supabase.auth.signInWithOAuth({
        provider: 'github',
        options: {
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
          redirectTo: `${location.origin}/auth/callback`,
        },
      });
    } catch (error) {
      if (error) console.log(error);
    }
  };

  const kakaoSignInHandler = async () => {
    let { data: kakao, error } = await supabase.auth.signInWithOAuth({
      provider: 'kakao',
      options: {
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
        redirectTo: `${location.origin}/auth/callback`,
      },
    });
  };

  //비밀번호 찾기
  const findPasswordHandler = async () => {
    if (!loginEmail) {
      alert('이메일을 입력해주세요!');
      return;
    }
    let { data, error } = await supabase.auth.resetPasswordForEmail(loginEmail);
    alert('비밀번호 복구 메일이 발송됐습니다!');
  };
  return (
    <div>
      <div>
        <button onClick={githubSignInHandler}>
          <FaGithub size={50} />
        </button>
        <button onClick={kakaoSignInHandler}>
          <SiKakaotalk size={50} />
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
              placeholder="이메일"
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
          <button>로그인하기</button>
        </form>
      </div>
      <div>
        <button onClick={findPasswordHandler}>비밀번호 찾기</button>
      </div>
      <br />
      <span>
        <Link href="/join">회원가입하러가기</Link>
      </span>
    </div>
  );
};

export default LoginPage;
