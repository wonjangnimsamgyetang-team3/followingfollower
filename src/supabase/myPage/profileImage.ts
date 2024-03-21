// import { getLocalStorageJSON } from "utils/getLocalStorageJSON";

import { UserData, UserInfo } from "@/app/types/type";
import { supabase } from "../supabase";

export const updateUserMetaData = async ({
  nickname,
  avatar,
}: Pick<UserData, "nickname" | "avatar">) => {
  const { data, error } = await supabase.auth.updateUser({
    data: { nickname, avatar },
  });
  if (error) {
    console.error("업데이트를 다시 시도해주세요!");
  }
  return data;
};

export const updateUserAccounts = async ({
  nickname,
  contents,
  email,
  avatar,
}: UserData) => {
  const { data, error } = await supabase
    .from("usersAccounts")
    .update({ nickname, contents, email, avatar })
    .eq("email", `${email}`)
    .select();

  if (error) {
    console.error("업데이트를 다시 시도해주세요!");
  }
  return data;
};

export const setUserDatabase = async ({
  nickname,
  contents,
  email,
}: UserInfo) => {
  const { data, error } = await supabase
    .from("usersAccounts")
    .insert([{ nickname, contents, email }])
    .select();
  if (!data || error) {
    console.error("데이터를 넣을 수 없습니다.");
  }

  return data;
};

export const getLoginUserInfo = async () => {
  const { data } = await supabase.auth.getUser();

  if (!data) {
    console.error("정보를 불러오지 못 하고 있습니다.");
  }
  return data;
};

export const getLocalStorageJSON = () => {
  const localStorageKey = localStorage.key(0);
  if (localStorageKey !== null) {
    const localStorageValue = localStorage.getItem(localStorageKey);
    const resultObj = JSON.parse(localStorageValue ?? "null") || [];
    return resultObj;
  } else {
    console.error("로컬 스토리지에 저장된 값이 없습니다.");
    return [];
  }
};

export const readUsersInfo = async () => {
  const { data, error } = await supabase.from("usersAccounts").select("*");
  if (data !== (null || undefined)) {
    return data;
  }
  if (error) {
    console.error("오류로 인해 정보를 받아오지 못 하고 있습니다.");
  }
  return data;
};

export const readMyTodo = async () => {
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
  console.log(data);

  if (error) {
    console.error("파일 업로드 오류", error.message);
    // alert("정보를 받아오지 못하고 있습니다.");
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
