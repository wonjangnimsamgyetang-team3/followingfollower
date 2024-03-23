"use client";
import { ChangeEvent, FormEvent, MouseEvent, useState } from "react";
import { supabase } from "@/supabase/supabase";
import { useRouter } from "next/navigation";
import {
  updateUserAccounts,
  uploadImage,
} from "@/supabase/myPage/profileImage";
import type { Edit, UserData } from "@/types/type";
import useStoreState from "@/shared/store";

const ProfileContents = ({ isEdit, setIsEdit }: Edit) => {
  const router = useRouter();

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
    // 유효성;
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
    //이미지 등록
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
      console.error("이미지가 업로드되지 않았어용", error);
      alert("이미지가 업로드 되지 않았어용! 다시 등록해주세용!");
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
    if (isEdit && selectFile !== defaultImg) setDefaultImg(avatar);
    // if (isEdit && selectFile !== defaultImg) {
    //   setDefaultImg(avatar);
    // }
  };

  return (
    <section>
      <div>
        <div>
          {!isEdit ? (
            <article>
              <div>
                <div>
                  <p>{nickname}</p>
                </div>
                <div>
                  <p>
                    <span>{contents}</span>
                  </p>
                </div>
              </div>
              <div>
                <button onClick={editContentsHandler}>수정</button>
                <button onClick={() => router.replace(`feed/newtodo`)}>
                  할 일 등록
                </button>
              </div>
            </article>
          ) : (
            <form onSubmit={editSaveHandler}>
              <div>
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
                ></textarea>
                <div>
                  <button>수정완료</button>
                  <button onClick={editCancelHandler}>수정취소</button>
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
