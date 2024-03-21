// 'use client';

// import React, { useEffect, useState } from 'react';
// import { FaGithub } from 'react-icons/fa6';
// import Link from 'next/link';
// import { useRouter } from 'next/navigation';

// import type { Database } from 'database.types';

// import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

// const LoginPage = () => {
//   const [loginEmail, setLoginEmail] = useState<string>('');
//   const [loginPw, setLoginPw] = useState<string>('');
//   const [user, setUser] = useState<any | null>(null);
//   const supabase = createClientComponentClient<Database>();
//   const router = useRouter();

//   // //유저정보 가져오기
//   useEffect(() => {
//     const test = async () => {
//       const {
//         data: { user },
//       } = await supabase.auth.getUser();

//       if (!user) {
//         setUser(user);
//         console.log('user', user);
//       }
//     };

//     test();
//   }, []);

//   //로그인
//   const signInHandler = async (
//     e: React.FormEvent<HTMLFormElement>
//   ): Promise<void> => {
//     e.preventDefault();

//     let { data: loginUser, error } = await supabase.auth.signInWithPassword({
//       email: loginEmail,
//       password: loginPw,
//     });

//     if (!loginEmail || !loginPw) {
//       alert('빈칸 없이 작성해주세요');
//       return;
//     }
//     if (error) {
//       alert(error);
//       return;
//     }

//     alert(`로그인 성공`);
//     setLoginEmail('');
//     setLoginPw('');

//     const session = await supabase.auth.getSession();
//     const authAvatar = session.data.session?.user.user_metadata.avatar;
//     const authContents = session.data.session?.user.user_metadata.contents;
//     const authNickname = session.data.session?.user.user_metadata.nickname;
//     const authEmail = session.data.session?.user.email;

//     const { data: insertData, error: insetError } = await supabase
//       .from('usersAccounts')
//       .insert([
//         {
//           avatar: authAvatar,
//           contents: authContents,
//           nickname: authNickname,
//           email: authEmail,
//         },
//       ])
//       .select();
//     //현재 페이지를 새로고침
//     router.push('/');
//     router.refresh();
//   };

//   // //로그아웃
//   const signOut = async () => {
//     const session = await supabase.auth.getSession();
//     const authEmail: string | undefined = session.data.session?.user.email;
//     if (authEmail) {
//       const { error: dbError } = await supabase
//         .from('usersAccounts')
//         .delete()
//         .eq('email', authEmail);
//     }

//     alert('로그아웃');
//     let { error } = await supabase.auth.signOut();
//     router.replace('/');
//     router.refresh();
//   };

//   //소셜 로그인
//   const socialSignInHandler = async () => {
//     let { data, error } = await supabase.auth.signInWithOAuth({
//       provider: 'github',
//       options: {
//         redirectTo: `${location.origin}/auth/callback`,
//       },
//     });
//   };

//   return (
//     <div>
//       <div>
//         {' '}
//         <button onClick={socialSignInHandler}>
//           <FaGithub size={50} />
//         </button>
//       </div>
//       <hr />
//       <div>
//         <form onSubmit={signInHandler} className="flex flex-col">
//           <div>로그인 하기</div>
//           <br />
//           <div>
//             <input
//               type="email"
//               onChange={(e) => {
//                 setLoginEmail(e.target.value);
//               }}
//               value={loginEmail}
//               className="border border-indigo-600"
//               placeholder="아이디"
//             />
//           </div>
//           <div>
//             <input
//               type="text"
//               onChange={(e) => setLoginPw(e.target.value)}
//               value={loginPw}
//               className="border border-indigo-600"
//               placeholder="비밀번호"
//             />
//           </div>
//           <button>로그인</button>
//         </form>
//       </div>
//       <div>
//         <button onClick={signOut}>로그아웃</button>
//       </div>

//       <span>
//         <Link href="/join">회원가입하러가기</Link>
//       </span>
//     </div>
//   );
// };

// export default LoginPage;

'use client';

import React, { useEffect, useState } from 'react';
import { FaGithub } from 'react-icons/fa6';
import { SiKakaotalk } from 'react-icons/si';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { supabase } from '@/supabase/supabase';
import useStoreState from '@/app/shared/store';

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
    let { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });
  };

  const kakaoSignInHandler = async () => {
    let { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'kakao',
      options: {
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
        {' '}
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
