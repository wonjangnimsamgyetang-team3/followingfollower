"use client";
import useStoreState from "@/app/shared/store";
import { ChangeEvent, MouseEventHandler, useState } from "react";
import { setUserAccount } from "@/supabase/myPage/profileImage";
import ProfileImage from "./ProfileImage";
import { useRouter } from "next/router";

const ProfileContents = () => {
    const router = useRouter();
  const { nickname, contents, avatar } = useStoreState((store) => store.userAccount);
  const [editValue, setEditValue] = useState({
    nickname,
      contents,
    avatar
  });
  const [isEdit, setIsEdit] = useState(false);
  const editValueNickname = editValue.nickname;
  const editValueContents = editValue.contents;

  const onEditValueChange = (e : ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.preventDefault();
    const { name, value } = e.target;
    setEditValue({ ...editValue, [name]: value });
  };

  const onEditContents = (e: MouseEventHandler<HTMLButtonElement>) => {
    e.preventDefault();
    setIsEdit(true);
    setEditValue({ nickname, contents, avatar });
  };

  const onEditSave = (e) => {
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

    setInitValue(editValue);
    setAccount(editValue);

    const userAccountEdit = async () => {
      await setUserAccount(editValue);
    };
    userAccountEdit();
    setIsEdit(false);
  };

  const onEditCancel = (e : MouseEventHandler<HTMLButtonElement>) => {
    e.preventDefault();
    setIsEdit(false);
  };

  const onLogout = async () => {
    try {
      const checkSignOut = window.confirm("정말 로그아웃을 하시겠습니까?");
      if (checkSignOut === true) {
       localStorage.clear();
     
        alert("로그아웃이 완료됐습니다!");
        router.push("/");
      } else {
        alert("로그아웃을 취소하셨습니다.");
        setIsEdit(false);
        return;
      }
    } catch (error) {
      console.log(error);
      alert("로그아웃을 다시 한 번 시도해 주세용");
    }
  };
  return (
    <section>
      <div>
        <ProfileImage />
        <div>
          {!isEdit ? (
            <article>
              <div>
                <div>
                  <div>
                    <p>{nickname}</p>
                  </div>
                  <button  onClick={onLogout} />⛔ 로그아웃</button>
                </div>
                <div>
                  <p>
                    <span>{contents}</span>
                  </p>
                </div>
              </div>
              <div>
                <button
                  onClick={onEditContents}
                
                >내용 편집</button>
              </div>
              </div>
            </article>
          ) : (
            // <form onSubmit={onEditSave}>
            //   <div>
            //     <div>
            //       <input
            //         name="nickname"
            //         value={editValueNickname}
            //         onChange={onEditValueChange}
            //         maxLength={8}
            //         placeholder={
            //           editValueNickname === ""
            //             ? "닉네임을 적어주세요 (8글자 이내)"
            //             : editValueNickname
            //         }
            //       />
            //     </div>
            //     <textarea
            //       name="comment"
            //       cols="30"
            //       rows="10"
            //       value={editValueContents}
            //       onChange={onEditValueChange}
            //       maxLength={100}
            //       placeholder={
            //         editValueContents === ""
            //           ? "자신을 소개해주세요 (100글자 이내)"
            //           : editValueContents
            //       }
            //     ></textarea>
            //     <div>
            //       <button >수정완료</button>
            //       <button onClick={onEditCancel} />수정취소</button>
            //     </div>
            //   </div>
            // </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProfileContents;
