"use client";
import { UserEmail, userTodo } from "@/app/types/type";
import { queryKey } from "@/query/queryKey";
import { readMyTodo } from "@/supabase/myPage/profileImage";
import { useQuery } from "@tanstack/react-query";
import defaultImg from "@/assets/profile.png";
import ProfileReviewTab from "./ProfileReviewTab";
import ProfileReviewLike from "./ProfileReviewLike";
import useStoreState from "@/app/shared/store";
import { useRouter } from "next/navigation";

const ProfileReview = ({ userEmail }: UserEmail) => {
  const router = useRouter();
  const {
    isLoading,
    isPending,
    isError,
    data: userTodo,
  } = useQuery({
    queryKey: [queryKey.usersAccounts],
    queryFn: readMyTodo,
  });
  const activeMyTodos: string = useStoreState((store) => store.activeCategory);
  const filterUserTodo = userTodo?.filter(
    (todo: Partial<userTodo>) => todo.email === userEmail
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
        {activeMyTodos === "내가 할 일" &&
          userEmail !== (null || undefined) && (
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
      </div>
      {/* 좋아요 한 일 */}
      <ProfileReviewLike userTodo={userTodo} />
    </section>
  );
};

export default ProfileReview;
