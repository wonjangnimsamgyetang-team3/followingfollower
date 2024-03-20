import CalendarPage from '@/components/Calendar';
import ProfileContents from '@/components/ProfileContents';
import ProfileImage from '@/components/ProfileImage';
import { queryKey } from '@/query/queryKey';
import { readUserInfo } from '@/supabase/myPage/profileImage';
import { useQuery } from '@tanstack/react-query';

const MyPage = () => {
  // const {
  //   isPending,
  //   isError,
  //   data: userInfo,
  // } = useQuery({
  //   queryKey: [queryKey.usersAccounts],
  //   queryFn: readUserInfo,
  // });

  // console.log(userInfo);
  return (
    <section>
      <article>
        <ProfileImage />
      </article>
      <article>
        <ProfileContents />
      </article>
      <article>
        <CalendarPage />
      </article>
    </section>
  );
};

export default MyPage;
