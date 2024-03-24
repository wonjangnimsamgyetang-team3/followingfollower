"use client";

import Image from "next/image";
import React, { ChangeEvent, FormEvent, useState, useEffect } from "react";
import { FaPhotoVideo } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { supabase } from "@/supabase/supabase";
import useStoreState from "@/shared/store";
import whiteSpinner from "../assets/whiteSpinner.svg";

const NewTodo = () => {
  //zustand
  const { userInfo } = useStoreState();
  // console.log("로그인한 유저정보", userInfo);
  const nickname = userInfo?.nickname;
  console.log(nickname);

  const userId = userInfo?.id;

  const [dragging, setDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userAvatar, setUserAvatar] = useState<string>("");
  const [userNickname, setUserNickname] = useState<string>(nickname);
  const [file, setFile] = useState<File>();
  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const files = e.target?.files;
    if (files && files[0]) {
      setFile(files[0]);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    if (e.type === "dragenter") {
      setDragging(true);
    } else if (e.type === "dragleave") {
      setDragging(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const files = e.dataTransfer?.files;
    if (files && files[0]) {
      setFile(files[0]);
      // console.log(files[0]);
    }
  };

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUserNickname(userInfo?.nickname ?? user?.user_metadata.userNickname);
      setUserAvatar(
        user?.user_metadata?.avatar ?? user?.user_metadata?.avatar_url
      );
      console.log(userInfo?.nickname);
      console.log(user?.user_metadata?.avatar);

      //로그인 안 한 상태 시
      if (!user) {
        alert("로그인 후 이용해주세요.");
        router.push("/login");
      }
    };

    getUser();
  });

  // supabase에 todo 저장
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file || isLoading) return;

    const { data: user } = await supabase.auth.getUser();
    const userEmail = user?.user?.email;
    const userId = user?.user?.id;

    if (!userId) {
      alert("로그인 후 이용해주세요.");
      return;
    }

    setIsLoading(true);

    const uuid = crypto.randomUUID();
    const filePath = `todoImage/${uuid}`;

    const formData = new FormData();
    formData.append(
      "title",
      (document.getElementById("title") as HTMLInputElement).value
    );
    formData.append(
      "contents",
      (document.getElementById("input-contents") as HTMLInputElement).value
    );
    formData.append(
      "start",
      (document.getElementById("start") as HTMLInputElement).value
    );
    formData.append(
      "end",
      (document.getElementById("end") as HTMLInputElement).value
    );
    formData.append("imageFile", file);

    const uploadImage = async (filePath: string, file: File) => {
      const { data, error } = await supabase.storage
        .from("todoImage")
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: true,
        });

      if (error) {
        console.error("업로드 오류", error.message);
        throw error;
      }

      return data;
    };
    const data = await uploadImage(filePath, file);
    const { data: imageUrl } = supabase.storage
      .from("todoImage")
      .getPublicUrl(data.path);
    const ImgDbUrl = imageUrl.publicUrl;

    // Todo 생성
    const { data: insertedData, error: insertError } = await supabase
      .from("TodoList")
      .insert([
        {
          title: formData.get("title"),
          contents: formData.get("contents"),
          start: formData.get("start"),
          end: formData.get("end"),
          imageFile: ImgDbUrl,
          email: userEmail,
          nickname: userNickname,
          userId: userId,
          avatar: userAvatar,
        },
      ]);

    if (insertError) {
      console.error("insert error", insertError);
      return;
    }
    setIsLoading(false);

    alert("등록 완료!");
    router.push("/feed");
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <section className="w-[700px] h-[900px] outline-none flex flex-col items-center justify-center mt-20 mb-20 bg-white border-2 border-solid border-subColor2 rounded-[30px] p-[40px]">
        <div className="flex items-center justify-center mb-[10px]">
          <Image
            className="w-[50px] h-[50px] mr-[15px] rounded-full"
            src={userAvatar}
            alt="유저 이미지"
            width={100}
            height={100}
          />
          <div className="text-lg text-[#fb8494] ">{userNickname}</div>
        </div>
        <form className="w-full flex flex-col mt-2" onSubmit={handleSubmit}>
          <textarea
            className="w-15 h-12 outline-none text-lg border-2 border-[#fb8494] rounded-[30px] resize-none p-[8px] pl-[15px]"
            name="title"
            id="title"
            required
            rows={1}
            placeholder="제목을 입력하세요."
            maxLength={20}
          />
          <div className="mt-[30px] mb-[30px]">
            <input
              className="hidden flex items-center flex justify-center"
              name="input"
              id="input-upload"
              type="file"
              accept="image/*"
              onChange={handleChange}
            />
            <label
              className={`w-full h-60 flex flex-col items-center justify-center rounded-[20px] ${
                !file && "border-2 rounded-[20px] border-gray-500 border-dashed"
              }`}
              htmlFor="input-upload"
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              {dragging && (
                <div className="absolute inset-0 z-10 bg-sky-500/20 pointer-events-none" />
              )}
              {!file && (
                <div className="flex flex-col items-center pointer-events-none">
                  <FaPhotoVideo className="w-20 h-20 text-gray-300 mb-[10px]" />
                  <p>클릭하여 이미지를 등록해주세요.</p>
                </div>
              )}
              {file && (
                <div className="relative w-full aspect-square">
                  <Image
                    className="object-cover"
                    src={URL.createObjectURL(file)}
                    alt="local file"
                    fill
                    sizes="650px"
                  />
                </div>
              )}
            </label>
          </div>
          <textarea
            className="h-[250px] outline-none text-lg resize-none border-2 border-[#fb8494] rounded-[30px] p-[15px] bg-[#ececec]"
            name="contents"
            id="input-contents"
            required
            rows={10}
            placeholder="할 일 자세히 입력( 100글자 이내 )"
            maxLength={100}
          />
          <div className="flex p-[10px] mt-[20px]">
            <div className="mr-[30px]">
              <label className="mr-[10px] text-[#fb8494]" htmlFor="start">
                시작일
              </label>
              <input
                id="start"
                type="date"
                name="start"
                min="1800-01-01"
                max="2200-12-31"
                required
              />
            </div>
            <div className="">
              <label className="mr-[10px] text-[#fb8494]" htmlFor="end">
                마감일
              </label>
              <input
                id="end"
                type="date"
                name="end"
                min="1800-01-01"
                max="2200-12-31"
                required
              />
            </div>
          </div>
          <button
            className="h-[50px] bg-[#fb8494] rounded-[15px] text-white font-bold mt-[30px] hover:drop-shadow transition-all duration-200 flex justify-center items-center"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="w-[50px] h-[50px]">
                <Image
                  src={whiteSpinner}
                  alt="loading"
                  width={300}
                  height={300}
                />
              </div>
            ) : (
              "할 일 등록"
            )}
          </button>
        </form>
      </section>
    </div>
  );
};

export default NewTodo;
