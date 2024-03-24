"use client";

import AllCard from "@/components/AllCard";
import NewCard from "@/components/NewCard";
import Banner from "@/components/Banner";
import LikeTop from "@/components/LikeTop";
import React, { useEffect } from "react";
import { supabase } from "@/supabase/supabase";
import useStoreState from "@/shared/store";

const MainPage = async () => {
  // const { addUser } = useStoreState();
  // useEffect(() => {
  //   const getUser = async () => {
  //     const {
  //       data: { user },
  //     } = await supabase.auth.getUser();
  //     console.log("home - 소셜", user);

  //     const withAvatar =
  //       user?.user_metadata.avatar_url ?? user?.user_metadata.avatar;
  //     const withEmail = user?.user_metadata.email ?? user?.user_metadata.email;
  //     const withName =
  //       user?.user_metadata.preferred_username ??
  //       user?.user_metadata.userNickname;
  //     const withContents = user?.user_metadata.contents;
  //     const authId = user?.id;
  //     addUser({
  //       avatar: withAvatar,
  //       nickname: withName,
  //       contents: "",
  //       id: authId ?? "",
  //       email: withEmail,
  //     });
  //   };
  //   getUser();
  // }, []);

  return (
    <main>
      <Banner />
      <article className="flex gap-10 pb-32">
        <aside className="flex flex-col place-items-center ml-7">
          <div className="m-5 flex text-2xl">인기 유저 TOP 3</div>
          <LikeTop />
        </aside>
        <section className="flex flex-col gap-6">
          <h2 className="py-4 text-2xl text-center text-white bg-subColor1 rounded-3xl">
            최신 Todo
          </h2>
          <div>
            <h3 className="text-2xl">인기순</h3>
            <NewCard />
          </div>
          <div>
            <h3 className="text-2xl">All</h3>
            <AllCard />
          </div>
        </section>
      </article>
    </main>
  );
};

export default MainPage;
