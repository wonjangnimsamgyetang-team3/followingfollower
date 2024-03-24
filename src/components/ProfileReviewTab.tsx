import { MouseEvent } from 'react';
import useStoreState from '@/shared/store';

const ProfileReviewTab = () => {
  const activeMyTodos: string = useStoreState((store) => store.activeCategory);
  const setCategory = useStoreState((store) => store.setCategory);

  const activeCategoryHandler = (
    e: MouseEvent<HTMLButtonElement | HTMLLIElement>
  ) => {
    setCategory(e.currentTarget.id);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 rounded-t-[56px] ">
      <ul className="bg-subColor4 rounded-tl-[56px]  ">
        <li
          id="내가 할 일"
          onClick={activeCategoryHandler}
          className={`flex flex-col items-center justify-center h-[104px] px-5 py-4 rounded-t-[56px] cursor-pointer ${
            activeMyTodos === '내가 할 일' ? 'bg-white' : 'bg-#D9D9D9-800'
          }`}
        >
          <p className="w-full h-full flex flex-col items-center justify-center rounded-[56px] hover:bg-gray-200 text-center text-[30px] sm:text-[20px] md:text-[24px]">
            내가 할 일
          </p>
        </li>
      </ul>
      <ul className="bg-subColor4 rounded-tr-[56px]">
        <li
          id="좋아요한 일"
          onClick={activeCategoryHandler}
          className={`flex flex-col items-center justify-center h-[104px] px-5 py-4 rounded-t-[56px] cursor-pointer ${
            activeMyTodos === '좋아요한 일' ? 'bg-white' : 'bg-#D9D9D9-800'
          }`}
        >
          <p className="w-full h-full flex flex-col items-center justify-center rounded-[56px] hover:bg-gray-200 text-center text-[30px] sm:text-[20px] md:text-[24px]">
            좋아요한 일
          </p>
        </li>
      </ul>
    </div>
  );
};

export default ProfileReviewTab;
