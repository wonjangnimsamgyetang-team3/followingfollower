"use client";
import useStoreState from "@/app/shared/store";
import { Edit } from "@/app/types/type";
import Image from "next/image";
import { ChangeEvent, useRef } from "react";

const ProfileImage = ({ isEdit, setIsEdit }: Edit) => {
  const imgRef = useRef<HTMLInputElement>(null);
  const defaultImg = useStoreState((store) => store.defaultImg);
  const selectFile = useStoreState((store) => store.selectFile);
  const setSelectFile = useStoreState((store) => store.setSelectFile);
  const setDefaultImg = useStoreState((store) => store.setDefaultImg);

  // 이미지 미리보기
  const addImgHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files !== null) {
      const imgFile = e.target.files[0];

      if (imgFile) {
        const imgUrl = URL.createObjectURL(imgFile);
        console.log(imgFile);
        console.log(imgUrl);
        setSelectFile(imgUrl);
        setDefaultImg(imgUrl);
      } else {
        console.log("이미지 파일이 선택되지 않았습니다");
      }
    }
  };

  return (
    <div className="bg-subColor4">
      <label htmlFor="imgFileChoice">
        <div>
          <Image
            src={defaultImg || selectFile}
            alt="유저이미지"
            width={130}
            height={0}
            sizes="130px"
            className="rounded-full"
          />
        </div>
      </label>
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
