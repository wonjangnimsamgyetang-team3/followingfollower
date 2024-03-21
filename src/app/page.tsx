import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

export default async function Home() {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({
    cookies: () => cookieStore,
  });

  // const {
  //   data: { user },
  // } = await supabase.auth.getUser();
  // console.log("home - user", user?.user_metadata);
  // const test = user?.user_metadata.avatar;

  return <div>{/* <img src={test} /> */}hi</div>;
}
