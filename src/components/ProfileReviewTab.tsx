import React, { MouseEvent } from "react";
import useStoreState from "@/app/shared/store";

const ProfileReviewTab = () => {
  const activeMyTodos: string = useStoreState((store) => store.activeCategory);
  const setCategory = useStoreState((store) => store.setCategory);

  const activeCategoryHandler = (
    e: MouseEvent<HTMLButtonElement | HTMLLIElement>
  ) => {
    setCategory(e.currentTarget.id);
  };
  return (
    <div>
      <ul>
        <li
          id="내가 할 일"
          onClick={activeCategoryHandler}
          className={`px-4 py-2 mr-2 cursor-pointer ${
            activeMyTodos === "내가 할 일" ? "bg-white" : "bg-gray-200"
          }`}
        >
          내가 할 일
        </li>
      </ul>
      <ul>
        <li
          id="좋아요한 일"
          onClick={activeCategoryHandler}
          className={`px-4 py-2 cursor-pointer ${
            activeMyTodos === "좋아요한 일" ? "bg-white" : "bg-gray-200"
          }`}
        >
          좋아요한 일
        </li>
      </ul>
    </div>
  );
};

export default ProfileReviewTab;
