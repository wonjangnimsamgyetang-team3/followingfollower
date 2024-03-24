"use client";

import { ChangeEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  readUsersInfo,
  updateUserAccounts,
} from "@/supabase/myPage/profileImage";
import { useStoreState } from "@/shared/store";
import Image from "next/image";
import LogOut from "./LogOut";

import type { Edit, UserData } from "@/types/type";

const ProfileImage = ({ isEdit, setIsEdit }: Edit) => {
  const router = useRouter();
  const {
    userInfo,
    userAccount,
    defaultImg,
    selectFile,
    setSelectFile,
    setDefaultImg,
    setUserAccount,
  } = useStoreState();

  const email = userInfo?.email;
  const id = userInfo?.id;
  const { nickname, contents, avatar } = userAccount;

  const userMyPage = async () => {
    // DB - myPageAccount
    const userDatas = await readUsersInfo(email);
    // 현재 유저 정보
    const datas = userDatas?.find((item: UserData) => item.email === email);

    if (datas) {
      const { nickname, avatar, contents } = datas;

      const userData: UserData = {
        id,
        nickname,
        email,
        avatar,
        contents,
      };
      setUserAccount(userData);
      updateUserAccounts(userData);
      setDefaultImg(avatar);

      if (!userInfo || !avatar) {
        alert("로그인 후 이용해 주세요.");
        <LogOut />;
        router.replace("/");
      }
    }
  };
  // 마이페이지 프로필 렌더링
  useEffect(() => {
    userMyPage();
  }, [nickname, contents, avatar]);
  // 이미지 미리보기
  const addImgHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (selectFile === null) return;

    if (e.target.files !== null) {
      const imgFile = e.target.files[0];
      if (!imgFile) return;
      if (imgFile) {
        setSelectFile(imgFile);

        const imgUrl = URL.createObjectURL(imgFile);
        setDefaultImg(imgUrl);
      } else {
        console.error("이미지 파일이 선택되지 않았습니다");
      }
    }
  };

  return (
    <div className=" w-full flex justify-center rounded-t-[56px]">
      {isEdit ? (
        <label htmlFor="imgFileChoice">
          <div className="w-[280px] sm:w-auto flex justify-center">
            <Image
              src={defaultImg}
              alt="유저이미지"
              width={130}
              height={130}
              sizes="(max-width: 639px) 50vw, 130px"
              className="rounded-full"
            />
          </div>
        </label>
      ) : (
        <div>
          <Image
            src={defaultImg}
            alt="유저이미지"
            width={130}
            height={130}
            sizes="280px"
            className="rounded-full"
          />
        </div>
      )}
      <input
        type="file"
        accept="image/*"
        id="imgFileChoice"
        onChange={addImgHandler}
        className="hidden"
      />
    </div>
  );
};

export default ProfileImage;
