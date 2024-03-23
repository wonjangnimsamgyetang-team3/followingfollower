import TodoList from "@/components/TodoList";

const FeedPage = async () => {
  return (
    <div className="w-full h-full grid grid-cols-1 place-items-center">
      <TodoList />
    </div>
  );
};

export default FeedPage;
