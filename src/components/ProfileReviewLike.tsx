import { HeartIcon } from '@/icons/HeartIcon';
import Image from 'next/image';
import defaultImg from '@/assets/profile.png';
import useStoreState from '@/shared/store';
import HeartFillIcon from '@/icons/HeartFillIcon';

import type { userTodo } from '@/types/type';

export type ReviewLike = {
  userTodo: userTodo[] | null | undefined;
};

const ProfileReviewLike = ({ userTodo }: ReviewLike) => {
  const activeMyTodos: string = useStoreState((store) => store.activeCategory);
  const { userInfo } = useStoreState();
  const { id } = userInfo;

  const filterMyLikeTodoList = userTodo?.filter((todoItem: Partial<userTodo>) =>
    todoItem?.liketest?.includes(id)
  );

  if (!userTodo) {
    <div> 정보를 가져오고 있습니다..</div>;
  }

  return (
    <div className="bg-white rounded-b-[56px]">
      {id !== (null || undefined) && activeMyTodos === '좋아요한 일' && (
        <article className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-8 p-8">
          {!filterMyLikeTodoList ||
            (filterMyLikeTodoList.length === 0 && (
              <div className="text-center mt-[60px] text-[24px]">
                마음에 드는 일에 <br />
                좋아요를 눌러주세요!
              </div>
            ))}
          {filterMyLikeTodoList?.map((todoItem) => {
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
                className="flex flex-row xl:flex-row items-center justify-evenly gap-[20px] p-[1.4rem] border-2 border-solid border-subColor2 rounded-[56px] hover:transform hover:transition-[all] hover:duration-500 hover:scale-[1.02] bg-white"
              >
                <div className="flex border-[2px] border-solid border-subColor2 rounded-[34px] w-[140px] h-[140px] sm:w-[180px] sm:h-[180px] md:w-[150px] md:h-[150px] lg:w-[200px] lg:h-[200px] xl:w-[240px] xl:h-[240px] ">
                  {imageFile ? (
                    <Image
                      src={imageFile}
                      className="w-full h-full object-fit rounded-[32px]"
                      alt="투두 이미지"
                      width={100}
                      height={1}
                    />
                  ) : (
                    <Image
                      src={defaultImg.src}
                      className="w-full h-full object-fit rounded-[28px]"
                      alt="투두 이미지"
                      width={100}
                      height={1}
                    />
                  )}
                </div>
                <section className="flex flex-col w-[50%] h-full p-[0.4rem] rounded-[38px] gap-[10px]">
                  <div className="bg-subColor2 p-[0.8rem] rounded-[30px] text-center text-[18px] font-bold ">
                    {title}
                  </div>
                  <article className="flex flex-col h-full rounded-[38px] gap-[10px]">
                    <div className="bg-subColor4 rounded-[20px] w-[auto] h-full">
                      <p className="text-[20px] p-[10px] w-[auto] h-full">
                        {contents}
                      </p>
                    </div>
                    <div className="align-bottom text-[18px]">{`${end} ~ ${start}`}</div>
                    <div className="flex items-center justify-between text-[20px]">
                      <div className="text-[20px] p-[4px] border-[2px] bg-subColor2 rounded-[15px]">
                        {nickname ? nickname : 'no name'}
                      </div>
                      <div className="flex gap-[0.2rem]">
                        {liketest !== null ? liketest?.length : <div>0</div>}
                        {liketest !== null && liketest.length > 0 ? (
                          <HeartFillIcon />
                        ) : (
                          <HeartIcon />
                        )}
                      </div>
                    </div>
                  </article>
                </section>
              </div>
            );
          })}
        </article>
      )}
    </div>
  );
};

export default ProfileReviewLike;
