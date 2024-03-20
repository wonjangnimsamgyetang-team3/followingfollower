import { supabase } from "@/supabase/supabase";
import React from "react";

const AllCard = async () => {
  const { data: TodoList, error } = await supabase.from("TodoList").select("*");

  return (
    <div>
      {TodoList?.map((card: any) => {
        return <div key={card.todoId}>{card.title}</div>;
      })}
    </div>
  );
};

export default AllCard;
