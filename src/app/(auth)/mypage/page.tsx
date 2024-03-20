"use client";
import Calendar from "@/components/Calendar";
import ProfileContents from "@/components/ProfileContents";
import ProfileImage from "@/components/ProfileImage";
import { queryKey } from "@/query/queryKey";
import { readUserInfo } from "@/supabase/myPage/profileImage";
import { useQuery } from "@tanstack/react-query";

const MyPage = () => {
  const myAccount = { email: "1234@qwer.com" };
  const userEmail = myAccount.email;
  const {
    isPending,
    isError,
    data: userInfo,
  } = useQuery({
    queryKey: [queryKey.usersAccounts],
    queryFn: readUserInfo,
  });
  console.log(userInfo);
  // const { nickname, contents } = userInfo;
  // const [FilterData] = data.filter((item) => item.email === userEmail);
  // console.log(FilterData);
  // const [data] = userInfo;
  // console.log(data);
  return (
    <section>
      <article>
        <ProfileImage />
      </article>
      <article>
        <ProfileContents />
      </article>
      <article>
        <Calendar />
      </article>
    </section>
  );
};

export default MyPage;
