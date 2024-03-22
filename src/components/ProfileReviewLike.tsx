import React from "react";
import { UserData, userTodo } from "@/app/types/type";
import defaultImg from "@/assets/profile.png";
import useStoreState, { USER } from "@/app/shared/store";

export type ReviewLike = {
  userTodo: userTodo[];
};

const ProfileReviewLike = ({ userTodo }: ReviewLike) => {
  const activeMyTodos: string = useStoreState((store) => store.activeCategory);
  const { userInfo } = useStoreState();
  const { id } = userInfo;
  console.log(id);
  // const { id }: Partial<UserData> = useStoreState((store) => store.userAccount);
  // console.log(id);
  // const id = "15";
  // const userEmail = myAccount.email;
  // const uid = myAccount.uid;
  const filterMyLikeTodoList = userTodo?.filter((todoItem: Partial<userTodo>) =>
    todoItem?.liketest?.includes(id)
  );
  if (!userTodo) {
    <div> 정보를 가져오고 있습니다..</div>;
  }
  return (
    <div>
      {id !== (null || undefined) && activeMyTodos === "좋아요한 일" && (
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
