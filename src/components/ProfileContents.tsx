"use client";
import { ChangeEvent, FormEvent, MouseEvent, useEffect, useState } from "react";
import {
  readUsersInfo,
  updateUserAccounts,
} from "@/supabase/myPage/profileImage";
import useStoreState from "@/app/shared/store";
import { Edit, UserData, UserInfo } from "@/app/types/type";

const ProfileContents = ({ isEdit, setIsEdit }: Edit) => {
  const myAccount = { email: "1234@qwer.com" };
  const userEmail = myAccount.email;

  const { nickname, contents, email } = useStoreState<Partial<UserData>>(
    (store) => store.userAccount
  );

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
    const data = await readUsersInfo();
    if (data) {
      const [filterUserData] = data.filter((item) => item.email === userEmail);
      setUserAccount(filterUserData);
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
    setEditValue({ nickname, contents, email: userEmail });
  };

  const editSaveHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // 유효성;
    const editSaveCheck = window.confirm("수정내용을 저장하시겠습니까?");
    if (
      editSaveCheck === true &&
      editValueNickname === nickname &&
      editValueContents === contents
    ) {
      alert("수정된 내용이 없습니다");
      return;
    }

    if (editSaveCheck === false) {
      alert("수정을 취소하셨습니다.");
      setIsEdit(false);
      return;
    }

    setUserAccount(editValue);

    const userAccountEditHandler = async () => {
      await updateUserAccounts(editValue);
    };
    userAccountEditHandler();
    setIsEdit(false);
  };

  const editCancelHandler = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsEdit(false);
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
                  maxLength={100}
                  placeholder={
                    editValueContents === ""
                      ? "자신을 소개해주세요 (100글자 이내)"
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
