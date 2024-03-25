"use client";

import { ChangeEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  readUsersInfo,
  updateUserAccounts,
  updateUserMetaData,
  updatemyPageAccount,
} from "@/supabase/myPage/profileImage";
import { useStoreState } from "@/shared/store";
import noAvatar from "@/assets/profile.png";
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
      const { email } = datas;

      const userData: UserData = {
        id,
        nickname,
        email,
        avatar,
        contents,
      };

      setUserAccount(userData);
      updatemyPageAccount(userData);
      updateUserAccounts(userData);
      updateUserMetaData({ nickname, contents });
      if (avatar) {
        setDefaultImg(avatar);
      }

      // if (!userInfo || !avatar) {
      //   alert("로그인 후 이용해 주세요.");
      //   <LogOut />;
      //   router.replace("/");
      // }
    }
  };
  // 마이페이지 프로필 렌더링
  useEffect(() => {
    userMyPage();
  }, []);
  // 이미지 미리보기
  const addImgHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (selectFile === null) return;

    if (e.target.files !== null) {
      const imgFile = e.target.files[0];
      if (!imgFile) return;
      if (imgFile) {
        setSelectFile(selectFile ? imgFile : defaultImg);

        const imgUrl = URL.createObjectURL(imgFile);
        setDefaultImg(selectFile ? imgUrl : defaultImg);
      } else {
        console.error("이미지 파일이 선택되지 않았습니다");
      }
    }
  };

  return (
    <div className=" w-full flex justify-center rounded-t-[56px]">
      {isEdit ? (
        <label htmlFor="imgFileChoice">
          {isEdit && avatar ? (
            <div className="w-[280px] sm:w-auto flex justify-center object-fit">
              <Image
                src={defaultImg}
                alt="유저이미지"
                width={130}
                height={130}
                sizes="(max-width: 639px) 50vw, 130px"
                className="rounded-full object-cover"
              />
            </div>
          ) : (
            <div className="w-[280px] sm:w-auto flex justify-center object-fit">
              <Image
                src={defaultImg}
                alt="유저이미지"
                width={130}
                height={130}
                sizes="(max-width: 639px) 50vw, 130px"
                className="rounded-full object-cover"
              />
            </div>
          )}
        </label>
      ) : (
        <div>
          {isEdit && selectFile ? (
            <Image
              src={noAvatar}
              alt="유저이미지"
              width={130}
              height={130}
              sizes="280px"
              className="rounded-full object-cover"
            />
          ) : (
            <Image
              src={defaultImg}
              alt="유저이미지"
              width={130}
              height={130}
              sizes="280px"
              className="rounded-full object-cover"
            />
          )}
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
