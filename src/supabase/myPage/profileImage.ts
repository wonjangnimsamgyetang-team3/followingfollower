import { supabase } from "../supabase";
import type { UserData, UserInfo } from "@/types/type";

// DB - myPageAccount 테이블 업데이트
export const updatemyPageAccount = async ({
  id,
  nickname,
  contents,
  email,
  avatar,
}: UserData) => {
  const { data, error } = await supabase
    .from("myPageAccount")
    .update({ uid: id, nickname, contents, avatar })
    .eq("email", `${email}`)
    .select("*");

  if (error) {
    console.error("업데이트를 다시 시도해 주세요.");
  }
  return data;
};

export const updateUserAccounts = async ({
  id,
  nickname,
  contents,
  email,
}: UserData) => {
  const { data, error } = await supabase
    .from("usersAccounts")
    .update({ uid: id, nickname, contents })
    .eq("email", `${email}`)
    .select("*");

  if (error) {
    console.error("업데이트를 다시 시도해 주세요.");
  }
  return data;
};

export const setUserDatabase = async ({
  nickname,
  contents,
  email,
}: UserInfo) => {
  const { data, error } = await supabase
    .from("myPageAccount")
    .insert([{ nickname, contents, email }])
    .select("*");
  if (!data || error) {
    console.error("데이터를 넣을 수 없습니다.");
  }

  return data;
};

export const readUsersInfo = async (email: string) => {
  const { data, error } = await supabase
    .from("myPageAccount")
    .select()
    .eq("email", email);
  if (data !== (null || undefined)) {
    return data;
  }
  if (error) {
    console.error("오류로 인해 정보를 받아오지 못하고 있습니다.");
  }
  return data;
};

export const readMyTodo = async () => {
  const { data, error } = await supabase.from("TodoList").select("*");

  if (error) {
    alert("오류로 인해 정보를 받아오지 못하고 있습니다.");
  }
  return data;
};

export const uploadImage = async (
  filePath: string,
  image: string | Blob | File | Uint8Array | ArrayBuffer
) => {
  const { data, error } = await supabase.storage
    .from("userImage")
    .upload(filePath, image, {
      cacheControl: "3600",
      upsert: true,
    });

  if (error) {
    console.error("파일 업로드 오류", error.message);
    alert("오류로 인해 정보를 받아오지 못하고 있습니다.");
  }
  return data;
};

export const downloadImage = async (filePath: string) => {
  try {
    const { data, error } = await supabase.storage
      .from("userImage")
      .download(filePath);
    if (error) {
      alert("오류로 인해 이미지를 받아오지 못하고 있습니다.");
      return;
    }
    return data;
  } catch (error) {
    alert("오류로 인해 이미지를 받아오지 못하고 있습니다.");
  }
};

export const getLoginUserInfo = async () => {
  const { data } = await supabase.auth.getUser();

  if (!data) {
    console.error("오류로 인해 정보를 불러오지 못 하고 있습니다.");
  }
  return data;
};

export const updateUserMetaData = async ({
  nickname,
  contents,
}: Pick<UserData, "nickname" | "avatar" | "contents">) => {
  const { data, error } = await supabase.auth.updateUser({
    data: { userNickname: nickname, contents },
  });

  if (error) {
    console.error("업데이트를 다시 시도해 주세요.");
  }
  return data;
};
