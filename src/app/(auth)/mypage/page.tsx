"use client";
import CalendarPage from "@/app/calendar/page";
import ProfileContents from "@/components/ProfileContents";
import ProfileImage from "@/components/ProfileImage";
import { queryKey } from "@/query/queryKey";
import { readUserInfo } from "@/supabase/myPage/profileImage";
import { useQuery } from "@tanstack/react-query";

const MyPage = () => {
  return (
    <section>
      <article>
        <ProfileImage />
      </article>
      <article>
        <ProfileContents />
      </article>
      <article>
        <CalendarPage />
      </article>
    </section>
  );
};

export default MyPage;
