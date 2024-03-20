"use client";
import { TabName, UserEmail } from "@/app/types/type";
import { queryKey } from "@/query/queryKey";
import { readMyReview, readUserInfo } from "@/supabase/myPage/profileImage";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import defaultImg from "@/assets/profile.png";
const ProfileReview = ({ userEmail }: UserEmail) => {
  const {
    isPending,
    isError,
    data: userTodo,
  } = useQuery({
    queryKey: [queryKey.usersAccounts],
    queryFn: readMyReview,
  });
  const tabName: TabName = {
    myTodos: "내가 한 일",
    likeTodos: "좋아요한 할 일",
  };
  const [tab, setTab] = useState<TabName>(tabName);
  const { myTodos, likeTodos } = tab;
  const filterUserTodo = userTodo?.filter((todo) => todo.email === userEmail);
  console.log(filterUserTodo);
  if (isPending) {
    <div>정보를 가져오고 있습니다..</div>;
  }
  return (
    <section>
      <div>
        <button>
          <div>{myTodos}</div>
        </button>
        <button>
          <div>{likeTodos}</div>
        </button>
      </div>
      {/* 내가 한 일 */}
      {userEmail !== (null || undefined) && (
        <article>
          {filterUserTodo?.map((todoItem) => {
            const {
              todoId,
              imageFile,
              title,
              nickname,
              contents,
              start,
              end,
              likeCount,
            } = todoItem;
            return (
              <div key={todoId}>
                {imageFile ? (
                  <img
                    src={imageFile}
                    className="w-[130px] h-[130px] object-fit"
                  />
                ) : (
                  <img
                    src={defaultImg.src}
                    className="w-[130px] h-[130px] object-fit"
                  />
                )}
                <div>{title}</div>
                <div>{nickname ? nickname : "no name"}</div>
                <div>
                  <p>{contents}</p>
                  <p>{contents}</p>
                </div>
                <div>{`${end} ~ ${start}`}</div>
                <div>{likeCount}❤</div>
                <div>댓</div>
              </div>
            );
          })}
        </article>
      )}
      {/* 좋아요 한 일 */}
    </section>
  );
};

export default ProfileReview;
