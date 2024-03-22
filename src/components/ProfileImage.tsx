"use client";
import useStoreState from "@/app/shared/store";
import { Edit } from "@/app/types/type";
import Image from "next/image";
import { ChangeEvent, useRef } from "react";

const ProfileImage = ({ isEdit, setIsEdit }: Edit) => {
  const imgRef = useRef<HTMLInputElement>(null);
  const { userInfo, defaultImg, selectFile, setSelectFile, setDefaultImg } =
    useStoreState();
  const { avatar } = userInfo;
  // 이미지 미리보기
  const addImgHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (!isEdit) return;
    if (e.target.files !== null) {
      const imgFile = e.target.files[0];

      if (imgFile) {
        const imgUrl = URL.createObjectURL(imgFile);
        setSelectFile(imgUrl);
        setDefaultImg(imgUrl);

        if (!isEdit) setDefaultImg(defaultImg);
        //'blob:http://localhost:3000/329cda24-452f-4d4e-9954-bdeade2b2c23'
        // console.log(imgFile.name); //'6db4f811-2968-4d4b-87d8-b9a955e64193.png'
      } else {
        console.log("이미지 파일이 선택되지 않았습니다");
      }
    }
  };

  return (
    <div className="bg-subColor4">
      {isEdit ? (
        <label htmlFor="imgFileChoice">
          <div>
            <Image
              src={`${defaultImg}`}
              alt="유저이미지"
              width={130}
              height={0}
              sizes="130px"
              className="rounded-full"
            />
          </div>
        </label>
      ) : (
        <div>
          <Image
            src={`${defaultImg}`}
            alt="유저이미지"
            width={130}
            height={0}
            sizes="130px"
            className="rounded-full"
          />
        </div>
      )}
      <input
        type="file"
        accept="image/*"
        id="imgFileChoice"
        ref={imgRef}
        onChange={addImgHandler}
        className="hidden"
      />
    </div>
  );
};

export default ProfileImage;
