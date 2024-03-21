import React from "react";
import { userTodo } from "@/app/types/type";
import defaultImg from "@/assets/profile.png";
import useStoreState from "@/app/shared/store";

export type ReviewLike = {
  userTodo: Partial<userTodo>;
};

const ProfileReviewLike = ({ userTodo }: ReviewLike) => {
  const activeMyTodos: string = useStoreState((store) => store.activeCategory);

  const myAccount = { email: "1234@qwer.com", uid: "15" };
  const userEmail = myAccount.email;
  const uid = myAccount.uid;
  const filterMyLikeTodoList = userTodo?.filter((todoItem: Partial<userTodo>) =>
    todoItem?.liketest?.includes(uid)
  );
  //   console.log(filterMyLikeTodoList);
  if (!userTodo) {
    <div> 정보를 가져오고 있습니다..</div>;
  }
  return (
    <div>
      {uid !== (null || undefined) && activeMyTodos === "좋아요한 일" && (
        <article>
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
  );
};

export default ProfileReviewLike;
