import NewTodo from "../../../components/NewTodo";
import { supabase } from "@/supabase/supabase";
const NewPostPage = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  console.log("newTodo", user);

  return (
    <div>
      <NewTodo />
    </div>
  );
};

export default NewPostPage;
