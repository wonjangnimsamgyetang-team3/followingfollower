'use client';

import { useState } from 'react';
import { supabase } from '@/supabase/supabase';
import { useRouter } from 'next/navigation';

const SingUpPage = () => {
  const [userEmail, setUserEmail] = useState<string>('');
  const [userPw, setUserPw] = useState<string>('');
  const [userCkPw, setUserCkPw] = useState<string>('');
  const [userNickname, setUserNickname] = useState<string>('');
  const router = useRouter();

  // 회원가입
  const signUpHandler = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    if (!userEmail || !userPw || !userNickname) {
      alert('빈칸 없이 작성해주세요!');
      return;
    }

    if (userPw !== userCkPw) {
      alert('비밀번호가 일치하지 않습니다.');
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
            avatar: '/profile.png',
            contents: '',
          },
        },
      });

      const { data: insertData, error: insetError } = await supabase
        .from('myPageAccount')
        .insert([
          {
            email: userEmail,
          },
        ]);
    } catch (error) {
      if (error) {
        console.log(error);
        return;
      }
    }

    // if (!data.user.identities.length === 0) {
    //   alert("이미 존재하는 이메일입니다.");
    //   return;
    // }

    setUserEmail('');
    setUserPw('');
    setUserCkPw('');
    setUserNickname('');
    alert(`회원가입이 완료됐습니다. 이메일 인증 후 로그인해주세요!`);

    router.push('/login');
  };

  return (
    <div>
      <form onSubmit={signUpHandler} className="flex flex-col">
        <span>회원가입 하기</span>
        <div>
          <span>이메일</span>{' '}
          <input
            type="email"
            onChange={(e) => setUserEmail(e.target.value)}
            value={userEmail}
            className="border border-indigo-600 w-80"
          />
        </div>
        <div>
          <span>비밀번호</span>
          <input
            type="password"
            onChange={(e) => setUserPw(e.target.value)}
            value={userPw}
            className="border border-indigo-600 w-80"
          />
        </div>
        <div>
          <span>비밀번호 확인</span>
          <input
            type="password"
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

        <button type="submit">회원가입</button>
      </form>
    </div>
  );
};

export default SingUpPage;
