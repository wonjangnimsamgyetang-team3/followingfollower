import React from "react";
import { userTodo } from "@/types/type";
import defaultImg from "@/assets/profile.png";
import useStoreState from "@/shared/store";
import Image from "next/image";
import HeartFillIcon from "@/icons/HeartFillIcon";
import { HeartIcon } from "@/icons/HeartIcon";

export type ReviewLike = {
  userTodo: userTodo[];
};

const ProfileReviewLike = ({ userTodo }: ReviewLike) => {
  const activeMyTodos: string = useStoreState((store) => store.activeCategory);
  const { userInfo } = useStoreState();
  const { id } = userInfo;
  console.log(id);
  const filterMyLikeTodoList = userTodo?.filter((todoItem: Partial<userTodo>) =>
    todoItem?.liketest?.includes(id)
  );
  if (!userTodo) {
    <div> 정보를 가져오고 있습니다..</div>;
  }
  return (
    <div className="bg-white rounded-b-[56px]">
      {id !== (null || undefined) && activeMyTodos === "좋아요한 일" && (
        <article className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8 sm:gap-8 md:gap-8 lg:gap-8 xl:gap-10 p-8">
          {filterMyLikeTodoList?.map((todoItem: Partial<userTodo>) => {
            const {
              todoId,
              imageFile,
              title,
              nickname,
              contents,
              start,
              end,
              likeCount,
              liketest,
            } = todoItem;
            return (
              <div
                key={todoId}
                className="lex flex-col items-center justify-center border-2 border-solid border-subColor2 rounded-[56px] hover:transform hover:transition-[all] hover:duration-500 hover:scale-[1.06] bg-white"
              >
                <div className="w-300px">
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
                  </div>
                  <div>{`${end} ~ ${start}`}</div>
                  <div>
                    {liketest?.length}
                    {liketest && liketest.length > 0 ? (
                      <HeartFillIcon />
                    ) : (
                      <HeartIcon />
                    )}
                  </div>
                  <div>댓</div>
                  <div>❤</div>
                </div>
              </div>
            );
          })}
        </article>
      )}
    </div>
  );
};

export default ProfileReviewLike;
