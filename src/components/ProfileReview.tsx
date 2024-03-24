'use client';
import { queryKey } from '@/query/queryKey';
import { useQuery } from '@tanstack/react-query';
import { readMyTodo } from '@/supabase/myPage/profileImage';
import type { userTodo } from '@/types/type';
import useStoreState from '@/shared/store';
import ProfileReviewTab from './ProfileReviewTab';
import ProfileReviewLike from './ProfileReviewLike';
import defaultImg from '@/assets/profile.png';
import HeartFillIcon from '@/icons/HeartFillIcon';
import Image from 'next/image';
import { HeartIcon } from '@/icons/HeartIcon';

const ProfileReview = () => {
  const { userInfo } = useStoreState();
  const email = userInfo?.email;
  console.log('email', email);
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
    <section className="flex flex-col bg-subColor4 border-[2px] border-solid border-subColor2 rounded-[56px] sm:w-[670px] md:w-[940px] lg:w-[1024px] xl:w-[1280px]">
      {/* 내가 한 일 */}
      <ProfileReviewTab />
      <div className="bg-white rounded-b-[56px]">
        {activeMyTodos === '내가 할 일' && email !== (null || undefined) && (
          <article className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-8 p-8">
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
                liketest,
              } = todoItem;
              return (
                <div
                  key={todoId}
                  className="flex flex-row xl:flex-row items-center justify-evenly gap-[20px] p-[1.4rem] border-2 border-solid border-subColor2 rounded-[56px] hover:transform hover:transition-[all] hover:duration-500 hover:scale-[1.06] bg-white"
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
                        <p className="text-[20px] p-[10px]">{contents}</p>
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
      {/* 좋아요 한 일 */}
      <ProfileReviewLike userTodo={userTodo} />
    </section>
  );
};

export default ProfileReview;
