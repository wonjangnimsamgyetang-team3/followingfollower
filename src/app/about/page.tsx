import Image from "next/image";
import girl from "../../assets/girl.png";
import boy from "../../assets/boy.png";
import memo from "../../assets/memo.png";
import calendar from "../../assets/calendar.png";
import comment from "../../assets/comment.png";
import { supabase } from "@/supabase/supabase";

export const revalidate = 10;

const AboutPage = async () => {
  const { data: todos } = await supabase.from("TodoList").select("*");
  const { data: users } = await supabase.from("usersAccounts").select("*");
  const today = new Date();
  const deadline = new Date(today.setDate(today.getDate() - 1));

  const todosNum = todos?.length;
  const usersNum = users?.length;
  const doneTodos = todos?.filter((todo) => new Date(todo.end) < deadline);
  const doneTodosNum = doneTodos?.length;

  return (
    <main className="p-7 flex flex-col place-items-center">
      <h2 className="p-3 text-4xl text-subColor1 border-b-2 border-solid border-subColor1">
        Todo를 공유하며 소통할 수 있는 사이트 팔팔입니다!
      </h2>
      <article className="pt-14 flex place-items-center gap-14">
        <section>
          <Image
            src={girl}
            width={240}
            height={240}
            alt="소개하는 여자 일러스트"
          />
        </section>
        <section className="flex flex-col gap-7">
          <div className="flex place-items-center justify-between gap-20">
            <p>“자신의 Todo를 공유해보세요!”</p>
            <Image src={memo} width={100} height={100} alt="메모지 일러스트" />
          </div>
          <div className="flex place-items-center justify-between">
            <p>“캘린더로 월별 일정을 보기 편하게!”</p>
            <Image
              src={calendar}
              width={100}
              height={100}
              alt="캘린더 일러스트"
            />
          </div>
          <div className="flex place-items-center justify-between">
            <p>“서로의 꿈과 목표를 응원해요!”</p>
            <Image src={comment} width={100} height={100} alt="댓글 일러스트" />
          </div>
        </section>
      </article>
      <article className="pt-14 flex place-items-center gap-14">
        <section className="flex flex-col place-items-end gap-7">
          <div className="flex place-items-center justify-center gap-4">
            <h1 className="text-8xl text-subColor1 [text-shadow:_3px_3px_0_var(--mainColor2)]">
              {todosNum}
            </h1>
            <p>개의 Todo가 공유되었어요!</p>
          </div>
          <div className="flex place-items-center justify-center gap-4">
            <h1 className="text-8xl text-subColor1 [text-shadow:_3px_3px_0_var(--mainColor2)]">
              {doneTodosNum}
            </h1>
            <p>개의 Todo가 완료되었어요!</p>
          </div>
          <div className="flex place-items-center justify-center gap-4">
            <h1 className="text-8xl text-subColor1 [text-shadow:_3px_3px_0_var(--mainColor2)]">
              {usersNum}
            </h1>
            <p>명의 사람들이 이용 중이에요!</p>
          </div>
        </section>
        <section>
          <Image
            width={240}
            height={240}
            src={boy}
            alt="소개하는 남자 일러스트"
          />
        </section>
      </article>
      <article className="pt-14">
        <h3 className="px-10 py-3 bg-subColor2 rounded-full">
          팔팔 프로젝트에 함께한 사람들
        </h3>
      </article>
    </main>
  );
};

export default AboutPage;
