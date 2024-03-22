"use client";
import { ChangeEvent, FormEvent, MouseEvent, useEffect, useState } from "react";
import {
  readUsersInfo,
  updateUserAccounts,
  uploadImage,
} from "@/supabase/myPage/profileImage";
import useStoreState from "@/app/shared/store";
import { Edit, UserData } from "@/app/types/type";
import { supabase } from "@/supabase/supabase";
import { useRouter } from "next/navigation";

const ProfileContents = ({ isEdit, setIsEdit }: Edit) => {
  const router = useRouter();
  const { userInfo, defaultImg, selectFile, setDefaultImg, setUserAccount } =
    useStoreState();
  const { email, id } = userInfo;
  const { nickname, contents, avatar } = useStoreState(
    (store) => store.userAccount
  );

  const [editValue, setEditValue] = useState<UserData>({
    nickname,
    contents,
    email,
  });
  const editValueNickname = editValue.nickname;
  const editValueContents = editValue.contents;

  const userMyPage = async () => {
    // DB - myPageAccount
    const userDatas = await readUsersInfo(email);
    // 현재 유저 정보
    const datas = userDatas?.find((item: UserData) => item.email === email);
    const nickname = datas.nickname || "";
    const avatar = datas.avatar || "";
    const contents = datas.contents || "";
    const userData: UserData = {
      id,
      nickname,
      email,
      avatar,
      contents,
    };
    console.log(id, email, nickname, avatar, contents);
    if (userInfo) {
      setUserAccount(userData);
      updateUserAccounts(userData);

      setDefaultImg(avatar);
    }
  };
  useEffect(() => {
    userMyPage();
  }, [nickname, contents, avatar]);

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
    console.log({});
    setEditValue({ nickname, contents, email });
  };

  const editSaveHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // 유효성;
    const editSaveCheck = window.confirm("수정내용을 저장하시겠습니까?");

    if (editSaveCheck === false) {
      alert("수정을 취소하셨습니다.");
      setIsEdit(false);
      setDefaultImg(avatar ? avatar : defaultImg);
      return;
    }
    // store에 저장
    setUserAccount(editValue);

    if (selectFile === null) return;
    const uuid = crypto.randomUUID();
    const filePath = `userImage/${id}+${uuid}`;
    try {
      const data = await uploadImage(filePath, defaultImg);
      // 해당 콜렉션에 있는 문서 파일 url 가져오기
      if (data !== null) {
        const { data: imageUrl } = supabase.storage
          .from("userImage")
          .getPublicUrl(data.path);
        const ImgDbUrl = imageUrl.publicUrl;
        await updateUserAccounts({ ...editValue, avatar: ImgDbUrl });
        if (!imageUrl) {
          alert("사진을 등록해주세요!");
        } else {
          alert("사진 등록이 완료됐습니다.");
        }
        setUserAccount({ avatar: ImgDbUrl });
      }
    } catch (error) {
      console.error("이미지가 업로드되지 않았어용", error);
      alert("이미지가 업로드 되지 않았어용! 다시 등록해주세용!");
      return null;
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
    setIsEdit(false);
    console.log(1);
    setDefaultImg(avatar ? avatar : defaultImg);
    // if (isEdit && selectFile !== defaultImg) {
    //   setDefaultImg(avatar ? avatar : defaultImg);
    // } else {
    //   setDefaultImg(defaultImg);
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
