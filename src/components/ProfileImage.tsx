"use client";
import useStoreState from "@/app/shared/store";

const ProfileImage = () => {
  const thumnailImg = useStoreState((store) => store.thumnailImg);

  return (
    <div>
      <img src={thumnailImg} alt="유저이미지" />
      <input type="file" accept="image/*" id="imgFileChoice" />
    </div>
  );
};

export default ProfileImage;
