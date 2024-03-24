"use client";
import Calendar from "@/components/Calendar";
import ProfileContents from "@/components/ProfileContents";
import ProfileImage from "@/components/ProfileImage";
import ProfileReview from "@/components/ProfileReview";
import { useState } from "react";

const MyPage = () => {
  const [isEdit, setIsEdit] = useState(false);

  return (
    <section className="flex flex-col items-center justify-center bg-subColor4 pt-[46px]">
      <div>
        <p className="text-subColor1 font-bold text-[30px]">마이페이지</p>
      </div>
      <article className="flex bg-gray-400 w-[1280px] mt-[46px]">
        {/* 프로필 */}
        <section className="flex-col w-[500px] p-[2rem]">
          <article>
            <ProfileImage isEdit={isEdit} setIsEdit={setIsEdit} />
          </article>
          <article>
            <ProfileContents isEdit={isEdit} setIsEdit={setIsEdit} />
          </article>
        </section>
        {/* 캘린더 */}
        <article className="flex-col w-[800px]">
          <Calendar />
        </article>
      </article>
      {/* 내가 할 일, 마음에 드는 다른 일 */}
      <article className="pt-[72px] pb-[60px]">
        <ProfileReview />
      </article>
    </section>
  );
};

export default MyPage;
