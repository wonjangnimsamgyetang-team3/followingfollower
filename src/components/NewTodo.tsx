"use client";

import Image from "next/image";
import React, { ChangeEvent, FormEvent, useState, useEffect } from "react";
import { FaPhotoVideo } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { supabase } from "@/supabase/supabase";
//zustand
import useStoreState from "@/app/shared/store";

const NewTodo = () => {
  const { userInfo } = useStoreState();

  //zustand

  console.log("로그인한 유저정보", userInfo);
  const nickname = userInfo?.nickname; //닉네임 없을 경우 팔팔이
  const userImg = userInfo?.avatar; //이미지 추가 안할 경우 기본이미지 제공

  const [dragging, setDragging] = useState(false);
  const [file, setFile] = useState<File>();
  const router = useRouter();

  // 이미지 파일 업로드, 드롭
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
      console.log(files[0]);
    }
  };

  // supabase에 todo 저장
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) return;

    const uuid = crypto.randomUUID();
    const filePath = `todoImage/${uuid}`;

    const formData = new FormData();
    formData.append("title", e.currentTarget["title"].value);
    formData.append("contents", e.currentTarget["contents"].value);
    formData.append("start", e.currentTarget["start"].value);
    formData.append("end", e.currentTarget["end"].value);
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
        },
      ]);

    if (insertError) {
      console.error("insert error", insertError);
      return;
    }

    alert("등록 완료!");
    router.push("/feed");
  };

  return (
    <div className="w-full h-full flex flex-col flex items-center flex justify-center bg-[#e3e3e3]">
      <section className="w-[700px] h-[900px] outline-none flex flex-col items-center justify-center mt-20 mb-20 bg-white border-2 border-solid border-subColor2 rounded-[30px] p-[40px]">
        <div className="text-lg text-[#fb8494] mb-[20px]">{nickname}</div>

        <form className="w-full flex flex-col mt-2" onSubmit={handleSubmit}>
          <textarea
            className="w-15 h-12 outline-none text-lg border-2 border-[#fb8494] rounded-[30px] resize-none p-[8px] pl-[15px]"
            name="title"
            id="input-title"
            required
            rows={1}
            placeholder="제목을 입력하세요."
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
              />
            </div>
          </div>
          <button className="h-[50px] bg-[#fb8494] rounded-[15px] text-white font-bold mt-[30px]">
            할 일 등록
          </button>
        </form>
      </section>
      {/* 이미지 테스트용 추가 확인후 지우셔도됩니다  */}
      <img src={userImg} />
    </div>
  );
};

export default NewTodo;
