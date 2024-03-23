"use client";
import Calendar from "@/components/Calendar";
import ProfileContents from "@/components/ProfileContents";
import ProfileImage from "@/components/ProfileImage";
import ProfileReview from "@/components/ProfileReview";
import { queryKey } from "@/query/queryKey";
import { readUsersInfo } from "@/supabase/myPage/profileImage";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { User } from "@supabase/auth-helpers-nextjs";

const MyPage = ({ user }: { user: User | null }) => {
  console.log("mypage", user);
  const myAccount = { email: "1234@qwer.com" };
  const userEmail = myAccount.email;
  const [isEdit, setIsEdit] = useState(false);

  const {
    isPending,
    isError,
    data: userInfo,
  } = useQuery({
    queryKey: [queryKey.usersAccounts],
    queryFn: readUsersInfo,
  });

  return (
    <section>
      <article>
        <ProfileImage isEdit={isEdit} setIsEdit={setIsEdit} />
      </article>
      <article>
        <ProfileContents isEdit={isEdit} setIsEdit={setIsEdit} />
      </article>
      <article>
        <Calendar />
      </article>
      <article>
        <ProfileReview />
      </article>
    </section>
  );
};

export default MyPage;
