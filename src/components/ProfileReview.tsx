"use client";
import { queryKey } from "@/query/queryKey";
import { useQuery } from "@tanstack/react-query";
import { readMyTodo } from "@/supabase/myPage/profileImage";
import type { userTodo } from "@/types/type";
import useStoreState from "@/shared/store";
import ProfileReviewTab from "./ProfileReviewTab";
import ProfileReviewLike from "./ProfileReviewLike";
import defaultImg from "@/assets/profile.png";
import HeartFillIcon from "@/icons/HeartFillIcon";
import Image from "next/image";

const ProfileReview = () => {
  const { userInfo } = useStoreState();
  const email = userInfo?.email;
  const {
    isLoading,
    isPending,
    isError,
    data: userTodo,
  } = useQuery({
    queryKey: [queryKey.TodoList],
    queryFn: readMyTodo,
  });
  const activeMyTodos: string = useStoreState((store) => store.activeCategory);
  const filterUserTodo = userTodo?.filter(
    (todo: Partial<userTodo>) => todo.email === email
  );

  if (isPending || isLoading) {
    <div>정보를 가져오고 있습니다..</div>;
  }
  if (isError) {
    // 로그인 안 되어 있으면
    // router.replace("/login")
    return <div>정보를 가져오고 있습니다...요기 로딩서클 돌아갈 예정</div>;
  }
  return (
    <section>
      {/* 내가 한 일 */}
      <ProfileReviewTab />
      <div>
        {activeMyTodos === "내가 할 일" && email !== (null || undefined) && (
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
                    <Image
                      src={imageFile}
                      className="w-[130px] h-[130px] object-fit"
                      alt="투두 이미지"
                      width={100}
                      height={100}
                    />
                  ) : (
                    <Image
                      src={defaultImg.src}
                      className="w-[130px] h-[130px] object-fit"
                      alt="투두 이미지"
                      width={100}
                      height={100}
                    />
                  )}
                  <div>{title}</div>
                  <div>{nickname ? nickname : "no name"}</div>
                  <div>
                    <p>{contents}</p>
                    <p>{contents}</p>
                  </div>
                  <div>{`${end} ~ ${start}`}</div>
                  <div>
                    {likeCount}
                    <HeartFillIcon />
                  </div>
                  <div></div>
                </div>
              );
            })}
          </article>
        )}
      </div>
      {/* 좋아요 한 일 */}
      <ProfileReviewLike userTodo={userTodo} />
    </section>
  );
};

export default ProfileReview;
