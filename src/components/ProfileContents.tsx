"use client";
import {
  ChangeEvent,
  FormEvent,
  MouseEvent,
  PropsWithChildren,
  useEffect,
  useState,
} from "react";
import useStoreState from "@/app/shared/store";
import {
  readUserInfo,
  setUserDatabase,
  updateUserAccounts,
} from "@/supabase/myPage/profileImage";
import { useQuery } from "@tanstack/react-query";
import { UserData, UserInfo } from "@/app/types/type";
import { queryKey } from "@/query/queryKey";
import { useInsert } from "@/query/mutation";
import ProfileImage from "./ProfileImage";
import { supabase } from "@/supabase/supabase";

const ProfileContents = () => {
  const myAccount = { email: "1234@qwer.com" };
  const userEmail = myAccount.email;

  // const [userInfo, setUserInfo] = useState<UserData[]>([]);
  // const insertMutation = useInsert(readUserInfo, queryKey.usersAccounts);
  const { nickname, contents } = useStoreState((store) => store.userAccount);
  console.log(nickname, contents);
  const setUserAccount = useStoreState((store) => store.setUserAccount);
  const [editValue, setEditValue] = useState({
    nickname,
    contents,
    email: userEmail,
  });
  const [isEdit, setIsEdit] = useState(false);
  const editValueNickname = editValue.nickname;
  const editValueContents = editValue.contents;
  useEffect(() => {
    test();
  }, []);

  const test = async () => {
    const data = await readUserInfo();
    const [filterUserData] = data?.filter((item) => item.email === userEmail);
    setUserAccount(filterUserData);
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

  const onEditSave = (e: FormEvent<HTMLFormElement>) => {
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

    const userAccountEdit = async () => {
      await updateUserAccounts(editValue);
    };
    userAccountEdit();
    setIsEdit(false);
  };

  const onEditCancel = (e: MouseEvent<HTMLButtonElement>) => {
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
            <form onSubmit={onEditSave}>
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
                  <button onClick={onEditCancel}>수정취소</button>
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
