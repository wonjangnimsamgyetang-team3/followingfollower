"use client";
import { ChangeEvent, FormEvent, MouseEvent, useState } from "react";
import { supabase } from "@/supabase/supabase";

import {
  updateUserAccounts,
  uploadImage,
} from "@/supabase/myPage/profileImage";
import useStoreState from "@/shared/store";

import type { Edit, UserData } from "@/types/type";

const ProfileContents = ({ isEdit, setIsEdit }: Edit) => {
  const {
    userInfo,
    defaultImg,
    selectFile,
    userAccount,
    setDefaultImg,
    setUserAccount,
  } = useStoreState();

  const email = userInfo?.email;
  const id = userInfo?.id;
  const { nickname, contents, avatar }: Partial<UserData> = userAccount;

  const [editValue, setEditValue] = useState<UserData>({
    nickname,
    contents,
    email,
  });
  const editValueNickname = editValue.nickname;
  const editValueContents = editValue.contents;

  const editValueChangeHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    e.preventDefault();

    const { name, value } = e.target;
    setEditValue({ ...editValue, [name]: value });
  };

  const editContentsHandler = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsEdit(true);
    setEditValue({ nickname, contents, email });
    if (avatar) {
      setDefaultImg(avatar);
    }
  };

  // 이미지, 닉네임, 소개 편집
  const editSaveHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const editSaveCheck = window.confirm("수정내용을 저장하시겠습니까?");
    if (editSaveCheck === false) {
      alert("수정을 취소하셨습니다.");
      if (avatar) {
        setDefaultImg(avatar);
      }
      setIsEdit(false);
      return;
    }

    if (!selectFile || !defaultImg) return;

    const uuid = crypto.randomUUID();
    const filePath = `userImage/${id}+${uuid}`;

    try {
      const data = await uploadImage(filePath, selectFile);
      // 해당 콜렉션에 있는 문서 파일 url 가져오기
      if (data !== null) {
        const { data: imageUrl } = supabase.storage
          .from("userImage")
          .getPublicUrl(data.path);

        // 스토리지에 있는 blob이미지를 일반 이미지 url로 변경
        const ImgDbUrl = imageUrl.publicUrl;
        if (ImgDbUrl) {
          await updateUserAccounts({ ...editValue, avatar: ImgDbUrl });
          alert("수정이 완료됐습니다.");

          setUserAccount({ ...editValue, avatar: ImgDbUrl });
          setDefaultImg(ImgDbUrl);
        } else {
          alert("이미지 URL을 가져올 수 없습니다.");
        }
      }
    } catch (error) {
      console.error("이미지가 업로드되지 않았습니다.", error);
      alert("이미지가 업로드 되지 않았습니다. 다시 등록해 주세요.");
    }

    // DB에 저장
    const userAccountEditHandler = async () => {
      await updateUserAccounts(editValue);
    };
    userAccountEditHandler();

    setIsEdit(false);
    setEditValue({ nickname, contents, email });
  };

  const editCancelHandler = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    alert("수정을 취소하셨습니다.");
    setIsEdit(false);
    setDefaultImg(avatar ?? defaultImg);
  };

  return (
    <section>
      <div>
        <div className="flex flex-col item-center justify-center">
          {!isEdit ? (
            <article className="flex flex-col gap-[10px]">
              <div className="flex flex-col gap-[10px]">
                <div>
                  <p className="text-center text-[20px] text-subColor1 text-bold">
                    {nickname}
                  </p>
                </div>
                <div>
                  <p className="text-center text-[20px]">
                    <span>{contents}</span>
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-evenly mt-[20px]">
                <button
                  onClick={editContentsHandler}
                  className="w-[100px] border-2 grid place-items-center border-solid border-[#fb8494] p-4  h-4/5 content-center bg-subColor1 hover:drop-shadow rounded-[20px] text-white font-bold transition-all duration-100"
                >
                  수정
                </button>
              </div>
            </article>
          ) : (
            <form onSubmit={editSaveHandler} className="bg-gray-200 w-[280px]">
              <div className="bg-green-200 w-full">
                <div>
                  <input
                    name="nickname"
                    value={editValueNickname}
                    onChange={editValueChangeHandler}
                    maxLength={10}
                    placeholder={
                      editValueNickname === ""
                        ? "닉네임을 적어주세요 (10글자 이내)"
                        : editValueNickname
                    }
                    className="h-8 text-[20px] input input-bordered focus:border-1 focus:border-subColor2 focus:border-solid focus:bg-white bg-subColor4 w-full max-w-xs"
                  />
                </div>
                <textarea
                  name="contents"
                  cols={30}
                  rows={2}
                  value={editValueContents}
                  onChange={editValueChangeHandler}
                  maxLength={30}
                  placeholder={
                    editValueContents === ""
                      ? "자신을 소개해주세요 (30글자 이내)"
                      : editValueContents
                  }
                  className="w-full text-[18px] textarea textarea-bordered h-16 focus:border-1 focus:border-subColor2 focus:border-solid focus:bg-white bg-subColor4"
                ></textarea>
                <div className="flex gap-[10px]">
                  <button className="border-2 grid place-items-center border-solid border-[#fb8494] p-4  h-4/5 content-center bg-subColor2 hover:drop-shadow rounded-[15px] font-bold transition-all duration-100">
                    수정완료
                  </button>
                  <button
                    onClick={editCancelHandler}
                    className="border-2 grid place-items-center border-solid border-[#fb8494] p-4  h-4/5 content-center bg-subColor2 hover:drop-shadow rounded-[15px] font-bold transition-all duration-100"
                  >
                    수정취소
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProfileContents;
