import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import NewTodo from '../../../components/NewTodo';

export const metadata: Metadata = {
  title: 'New Todo',
  description: 'Create a new post',
};

const NewPostPage = async () => {
  // const session = await supabase.auth.getSession();
  // if (!session) {
  //   redirect('/auth/signin');
  // }
  return (
    <div>
      <NewTodo />
    </div>
  );
};

export default NewPostPage;
