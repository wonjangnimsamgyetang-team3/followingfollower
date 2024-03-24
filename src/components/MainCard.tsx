import { Todo } from '@/types/type';
import Image from 'next/image';

const MainCard = ({ todos }: { todos: Todo[] | undefined | null }) => {
  return (
    <div className="pt-2 grid grid-cols-5 gap-4">
      {todos?.map((todo: any) => {
        return (
          <article
            key={todo.todoId}
            className="p-6 flex flex-col justify-between gap-4 border-solid border-2 border-subColor2 rounded-lg"
          >
            <h3 className="text-center font-bold">{todo.title}</h3>
            <section>
              <Image
                src={todo.imageFile}
                className="object-cover rounded-3xl h-[200px]"
                width={300}
                height={300}
                alt="todo 이미지"
              />
            </section>
            <section className="flex flex-col gap-3">
              <h4>{todo.nickname}</h4>
              <p>{todo.contents}</p>
              <p className="text-gray-400">
                {new Date(todo.created_at).toLocaleDateString('ko-KR', {
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit',
                })}
              </p>
            </section>
          </article>
        );
      })}
    </div>
  );
};

export default MainCard;
