'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ProfileContents from '@/components/ProfileContents';
import ProfileImage from '@/components/ProfileImage';
import ProfileReview from '@/components/ProfileReview';
import Calendar from '@/components/Calendar';

const MyPage = () => {
  const [isEdit, setIsEdit] = useState(false);
  const router = useRouter();

  return (
    <section className="flex flex-col items-center justify-center bg-subColor4 pt-[46px]">
      <div>
        <p className="text-subColor1 font-bold text-[30px]">마이페이지</p>
      </div>
      <article className="flex items-center justify-center gap-[50px] sm:w-[600px] lg:w-[1280px] mt-[46px] rounded-[56px]">
        {/* 프로필 */}
        <section className="flex flex-col w-[500px] sm:w-[260px] md:w-[350px] h-auto rounded-[56px] gap-10">
          <section className="flex flex-col gap-[10px] p-[2rem] py-14 bg-white border-[1px] border-solid border-subColor1 rounded-[56px] ">
            <ProfileImage isEdit={isEdit} setIsEdit={setIsEdit} />
            <ProfileContents isEdit={isEdit} setIsEdit={setIsEdit} />
          </section>
          <button
            onClick={() => router.replace(`feed/newtodo`)}
            className="w-full grid place-items-center border-2 border-solid border-subColor1 p-4  h-4/5 content-center bg-subColor1 hover:drop-shadow rounded-[15px] text-white font-bold transition-all"
          >
            할 일 등록
          </button>
        </section>
        {/* 캘린더 */}
        <section className="border-[2px] border-solid border-subColor2 rounded-[56px] bg-white md:w-[60%] md:p-[20px] lg:w-[50%]">
          <Calendar />
        </section>
      </article>
      {/* 내가 할 일, 마음에 드는 다른 일 */}
      <article className="pt-[72px] pb-[60px]">
        <ProfileReview />
      </article>
    </section>
  );
};

export default MyPage;
