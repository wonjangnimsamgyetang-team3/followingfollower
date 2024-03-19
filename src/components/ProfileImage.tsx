"use client";
import useStoreState from "@/app/shared/store";

const ProfileImage = () => {
  const defaultImg = useStoreState((store) => store.defaultImg);

  return (
    <div>
      <img src={defaultImg} alt="유저이미지" />
      <input type="file" accept="image/*" id="imgFileChoice" />
    </div>
  );
};

export default ProfileImage;
