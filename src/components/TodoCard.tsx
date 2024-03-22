import React, { useEffect, useState } from 'react';
import { supabase } from '@/supabase/supabase';
import ModalPotal from './TodoModal/ModalPortal';
import TodoModal from './TodoModal/TodoModal';
import TodoDetail from './TodoModal/TodoDetail';
import TodoBar from './TodoBar';
import { AiOutlineRetweet } from 'react-icons/ai';
import useStoreState from '@/app/shared/store';

export type TodoType = {
  contents: string;
  created_at: string;
  email: string;
  end: string;
  imageFile: string;
  likeCount: number;
  liked: boolean;
  liketest: string[];
  nickname: string;
  start: string;
  title: string;
  todoId: string;
};

const TodoCard = ({ todo }: { todo: TodoType }) => {
  const [openModal, setOpenModal] = useState(false);
  const [commentCount, setCommentCount] = useState(0);
  const { userInfo } = useStoreState();
  const { email: myEmail } = userInfo;

  useEffect(() => {
    fetchCommentCount(todo.todoId);
  }, []);

  const fetchCommentCount = async (todoId: string) => {
    const { data, error } = await supabase
      .from('commentList')
      .select('count', { count: 'exact' })
      .eq('todoId', todoId);

    if (error) {
      throw error;
    }
    setCommentCount(data[0]?.count || 0);
  };

  const followHandler = async () => {
    alert(`${todo.email}, ${myEmail}`);
    // const {data, error} = await supabase.from('userAccounts').update({}).insert([following:])
  };

  return (
    <div className="bg-white m-[15px] border-2 border-solid border-subColor2 rounded-[30px] p-[30px] flex flex-col items-center justify-center">
      <div>
        <div className="flex flex-col items-center justify-center">
          <h2 className="font-bold text-lg mb-[10px]">{todo.title}</h2>
          <img
            className="object-cover rounded-[30px] mb-[20px] cursor-pointer"
            src={todo.imageFile}
            alt="todoImage"
            sizes="650px"
            onClick={() => setOpenModal(true)}
          />
        </div>
        <div className="w-full">
          <p className="mb-[10px]">{todo.nickname}</p>
          <button onClick={followHandler}>follow</button>
          <p
            className="mb-[20px] cursor-pointer"
            onClick={() => setOpenModal(true)}
          >
            {todo.contents}
          </p>
        </div>
      </div>
      <div className="w-full">
        <TodoBar todo={todo} commentCount={commentCount} />
        {openModal && (
          <ModalPotal>
            <div>
              <TodoModal onClose={() => setOpenModal(false)}>
                <TodoDetail
                  todo={todo}
                  onCommentCountChange={setCommentCount}
                />
              </TodoModal>
            </div>
          </ModalPotal>
        )}
      </div>
    </div>
  );
};

export default TodoCard;
