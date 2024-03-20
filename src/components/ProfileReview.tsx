"use client";
import { UserEmail } from "@/app/types/type";
import { queryKey } from "@/query/queryKey";
import { readMyReview, readUserInfo } from "@/supabase/myPage/profileImage";
import { useQuery } from "@tanstack/react-query";
import React from "react";
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
  console.log(userEmail);
  console.log(userTodo);
  const filterUserTodo = userTodo?.filter((todo) => todo.email === userEmail);
  console.log(filterUserTodo);
  if (isPending) {
    <div>정보를 가져오고 있습니다..</div>;
  }
  return (
    <section>
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
    </section>
  );
};

export default ProfileReview;
