import { supabase } from "@/supabase/supabase";
import React, { useEffect, useState } from "react";

import type { Todo } from "../types/type";
import AllCard from "@/components/AllCard";

const MainPage = () => {
  return (
    <div>
      <div>배너</div>
      <section className="flex">
        <aside>인기 TOP3</aside>
        <div className="">
          <div>최근 올라온 글</div>
          <>
            <div>
              <h3>최신 인기 글</h3>
              <article>제목 내용1</article>
              <article>제목 내용2</article>
              {/* 아티클 : 작은 카드같은거에 쓴다 */}
            </div>
            <div>
              <h3>전체 글</h3>
              <article>제목 내용1</article>
              <AllCard />
            </div>
          </>
        </div>
      </section>
    </div>
  );
};

export default MainPage;
