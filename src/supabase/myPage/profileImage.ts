// import { getLocalStorageJSON } from "utils/getLocalStorageJSON";

import { UserData } from "@/app/types/type";
import { supabase } from "../supabase";

export const updateUserAccount = async ({
  nickname,
  // avatar,
  contents,
}: UserData) => {
  const { data, error } = await supabase.auth.updateUser({
    data: { nickname, contents },
  });
  if (error) {
    console.error("업데이트를 다시 시도해주세요!");
  }
  return data;
};

export const setUserDatabase = async ({ nickname, contents }: UserData) => {
  const { data, error } = await supabase
    .from("usersAccounts")
    .insert([{ nickname, contents }])
    .select();
  if (!data || error) {
    console.error("데이터를 넣을 수 없습니다.");
  }

  return data;
};

export const getLoginUserInfo = async () => {
  const { data } = await supabase.auth.getUser();
  return data;
};

// export const readUserLocalAccount = async () => {
//   const data = await getLocalStorageJSON();
//   return data;
// };

// export const setUserAccount = async () => {};
export const readUserInfo = async () => {
  const { data, error } = await supabase.from("usersAccounts").select("*");
  console.log(data);

  if (error) {
    alert("오류로 인해 정보를 받아오지 못 하고 있습니다.");
  }
  return data;
};

export const readMyReview = async () => {
  const { data, error } = await supabase.from("TodoList").select("*");

  if (error) {
    alert("오류로 인해 정보를 받아오지 못 하고 있습니다.");
  }
  return data;
};

export const uploadImage = async (filePath: string, image: string) => {
  const { data, error } = await supabase.storage
    .from("userImage")
    .upload(filePath, image, {
      cacheControl: "3600",
      upsert: true,
    });

  if (error) {
    console.error("파일 업로드 오류", error.message);
    alert("정보를 받아오지 못하고 있습니다.");
  }
  return data;
};

export const downloadImage = async (filePath: string) => {
  try {
    const { data, error } = await supabase.storage
      .from("userImage")
      .download(filePath);
    if (error) {
      alert("이미지를 받아오지 못하고 있습니다. 문의해주세요.");
      return;
    }
    return data;
  } catch (error) {
    alert("이미지를 받아오지 못하고 있습니다.");
  }
};
