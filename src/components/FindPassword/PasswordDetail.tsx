'use client';

import { useState } from 'react';
import { supabase } from '@/supabase/supabase';
import Link from 'next/link';
import Image from 'next/image';
import FFlogo from '@/assets/FF2.png';

const PasswordDetail = () => {
  const [findEmail, setFindEmail] = useState<string>('');

  const passwordFindHandler = async () => {
    const isValidEmail = (email: string) => {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    if (!findEmail) {
      alert('이메일을 입력해 주세요.');
      return;
    }
    if (!isValidEmail(findEmail)) {
      alert('이메일을 정확한 형식으로 입력해 주세요.');
      return;
    }

    let { data, error } = await supabase.auth.resetPasswordForEmail(findEmail);

    if (error) {
      alert(error.message);
    }

    alert('비밀번호 복구 메일이 발송됐습니다.');
    setFindEmail('');
  };

  return (
    <div className="h-3/5 ">
      <div className="flex justify-center  h-2/6 ">
        <Link href="/">
          <Image src={FFlogo} alt="" width={180} height={40} />
        </Link>
      </div>
      <div className="flex justify-center h-10 ">
        <p className="content-center">
          비밀번호를 찾고자 하는 이메일을 입력해주세요
        </p>
      </div>
      <div className="flex justify-center  h-[5rem] ">
        <input
          type="text"
          placeholder="FF 이메일 또는 소셜 로그인 이메일"
          value={findEmail}
          onChange={(e) => setFindEmail(e.target.value)}
          className="content-center w-10/12 h-16 pl-20 border border-solid border-subColor1 rounded-[15px]"
        />
      </div>
      <div className="flex justify-center h-1/5 ">
        <button
          onClick={passwordFindHandler}
          className="w-10/12 h-16 content-center bg-subColor2 hover:drop-shadow rounded-[15px]"
        >
          <p className="font-semibold">비밀번호 찾기</p>
        </button>
      </div>
    </div>
  );
};

export default PasswordDetail;
