"use client";
import { ChangeEvent, FormEvent, MouseEvent, useEffect, useState } from "react";
import {
  getLocalStorageJSON,
  updateUserAccounts,
  updateUserMetaData,
  uploadImage,
} from "@/supabase/myPage/profileImage";
import useStoreState from "@/app/shared/store";
import { Edit, UserData } from "@/app/types/type";
import { supabase } from "@/supabase/supabase";

const ProfileContents = ({ isEdit, setIsEdit }: Edit) => {
  const { email, nickname, uid, contents } = useStoreState(
    (store) => store.userAccount
  );
  const defaultImg = useStoreState((store) => store.defaultImg);
  const selectFile = useStoreState((store) => store.selectFile);
  const setSelectFile = useStoreState((store) => store.setSelectFile);
  const setDefaultImg = useStoreState((store) => store.setDefaultImg);
  const setUserAccount = useStoreState((store) => store.setUserAccount);
  const [editValue, setEditValue] = useState<Partial<UserData>>({
    nickname,
    contents,
    email,
  });

  const editValueNickname = editValue.nickname;
  const editValueContents = editValue.contents;

  useEffect(() => {
    userMyPage();
  }, []);

  const userMyPage = async () => {
    const email = "1234@qwer.com";
    const storageItem = getLocalStorageJSON();
    const uid = storageItem.user.id;
    // const email = storageItem.user.email;
    const nickname = storageItem.user.user_metadata.nickname;
    const avatar = storageItem.user.user_metadata.avatar;
    console.log(avatar);
    const userData = {
      uid,
      email,
      nickname,
      avatar,
      contents,
    };
    if (storageItem) {
      setUserAccount(userData);
    }
  };

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
  };

  const editSaveHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // 유효성;
    const editSaveCheck = window.confirm("수정내용을 저장하시겠습니까?");

    if (editSaveCheck === false) {
      alert("수정을 취소하셨습니다.");
      setIsEdit(false);
      return;
    }
    // store에 저장
    setUserAccount(editValue);

    if (selectFile === null) return;
    const uuid = crypto.randomUUID();
    const filePath = `userImage/${email}+${uuid}`;
    try {
      const data = await uploadImage(filePath, selectFile);
      console.log(data);
      // 해당 콜렉션에 있는 문서 파일 url 가져오기
      if (data !== null) {
        const { data: imageUrl } = supabase.storage
          .from("userImage")
          .getPublicUrl(data.path);
        const ImgDbUrl = imageUrl.publicUrl;
        console.log(ImgDbUrl);
        await updateUserAccounts({ ...editValue, avatar: ImgDbUrl });
        // await updateUserMetaData({ nickname, contents, avatar: ImgDbUrl });
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
  };

  const editCancelHandler = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsEdit(false);
    console.log(1);
    console.log(defaultImg);
    // setEditValue({ ...editValue, avatar: avatar !== "" ? avatar : defaultImg });
    if (isEdit && selectFile !== defaultImg) setDefaultImg(avatar);
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
