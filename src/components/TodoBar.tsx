"use Client";
import ToggleButton from "./ToggleButton";
import HeartFillIcon from "../icons/HeartFillIcon";
import { HeartIcon } from "@/icons/HeartIcon";
import { supabase } from "@/supabase/supabase";
import { TodoType } from "./TodoCard";
import { useEffect, useState } from "react";
import { AiOutlineComment } from "react-icons/ai";
import useStoreState from "@/app/shared/store";

type Props = {
  todo: TodoType;
  commentCount: number;
};

const TodoBar = ({ todo, commentCount }: Props) => {
  const { userInfo } = useStoreState();
  const { id } = userInfo || "";
  console.log(id);
  const [likes, setLikes] = useState(todo.liked);
  const [liketest, setLiketest] = useState<string[]>(todo.liketest || []);

  useEffect(() => {
    setLikes(todo.liked);
    setLiketest(todo.liketest);
  }, [todo.liked, todo.liketest]);

  console.log(todo.liked);

  const handleLikeToggle = async () => {
    // const userId = id;
    // const userId = "15";
    const getUserId = async () => {
      const { data: user } = await supabase.auth.getUser();
      return user?.user?.id;
    };
    const userId = await getUserId();

    if (likes) {
      await removeLikedUser(todo.todoId);
      setLiketest((prevLiketest) => prevLiketest.filter((id) => id !== userId));
    } else {
      await addLikedUser(todo.todoId);
      setLiketest((prevLiketest) => [...prevLiketest, userId]);
    }
    setLikes(!likes);
  };

  const addLikedUser = async (todoId: string) => {
    // const userId = '15';
    const getUserId = async () => {
      const { data: user } = await supabase.auth.getUser();
      return user?.user?.id;
    };
    const userId = await getUserId();
    const { data, error } = await supabase
      .from("TodoList")
      .update({ liketest: [...liketest, userId] })
      .eq("todoId", todoId)
      .select();

    if (error) {
      throw error;
    }
  };

  const removeLikedUser = async (todoId: string) => {
    // const userId = '15';
    const getUserId = async () => {
      const { data: user } = await supabase.auth.getUser();
      return user?.user?.id;
    };
    const userId = await getUserId();
    const { data, error } = await supabase
      .from("TodoList")
      .update({ liketest: liketest.filter((id) => id !== userId) })
      .eq("todoId", todoId)
      .select();

    if (error) {
      throw error;
    }
  };

  return (
    <div className="flex w-full justify-between">
      <p className="text-gray-400">
        {new Date(todo.created_at).toLocaleDateString("ko-KR", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })}
      </p>
      <div className="flex">
        <ToggleButton
          toggled={likes}
          onToggle={handleLikeToggle}
          onIcon={<HeartFillIcon />}
          offIcon={<HeartIcon />}
        />
        <p className="ml-[5px]">{`${liketest?.length ?? 0}`}</p>
        <div className="flex">
          <AiOutlineComment className="ml-[10px]" />
          <p className="ml-[5px]">{`${commentCount ?? 0}`}</p>
        </div>
      </div>
    </div>
  );
};

export default TodoBar;
