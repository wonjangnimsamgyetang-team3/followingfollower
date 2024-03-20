'use client';

import Image from 'next/image';
import React, { ChangeEvent, FormEvent, useState } from 'react';
import { FaPhotoVideo } from 'react-icons/fa';
import { createClient } from '@supabase/supabase-js';
import { Database } from 'database.types';
import { useRouter } from 'next/navigation';

const NewTodo = () => {
  const [dragging, setDragging] = useState(false);
  const [file, setFile] = useState<File>();
  const router = useRouter();

  //이미지 파일 업로드, 드랍
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const files = e.target?.files;
    if (files && files[0]) {
      setFile(files[0]);
    }
  };
  const handleDrag = (e: React.DragEvent) => {
    if (e.type === 'dragenter') {
      setDragging(true);
    } else if (e.type === 'dragleave') {
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
    }
  };

  //supabase에 todo 저장
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    //'value' 속성이 'string' 형식에 없습니다. 'valueOf'을(를) 사용하시겠습니까?라는 오류가 나는데 뭐가 문제인지 잘 모르겠음.
    formData.append('title', e.currentTarget['title'].value);
    formData.append('contents', e.currentTarget['contents'].value);
    formData.append('start', e.currentTarget['start'].value);
    formData.append('end', e.currentTarget['end'].value);
    formData.append('file', file);

    const todoData = {
      title: formData.get('title') as string,
      contents: formData.get('contents') as string,
      start: formData.get('start') as string,
      end: formData.get('end') as string,
    };

    const { data } = await supabase.from('TodoList').insert([todoData]);

    alert('등록 완료!');
    router.push('/feed');
  };

  const supabase = createClient<Database>(
    'https://jcsjtjiqolsewkoutsag.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impjc2p0amlxb2xzZXdrb3V0c2FnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTA4MzEyOTMsImV4cCI6MjAyNjQwNzI5M30.Mm1I1g_5qrNONvPK8gsK_3xDBim04lX01cQAX1yXVB0'
  );

  return (
    <div className="w-full h-full flex flex-col flex items-center flex justify-center bg-[#e3e3e3]">
      <section className="w-[700px] h-[900px] outline-none flex flex-col items-center justify-center mt-20 mb-20 bg-white border-2 border-[#fb8494] rounded-[30px] p-[40px]">
        <div className="text-lg text-[#fb8494] mb-[20px]">username</div>
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
                !file && 'border-2 rounded-[20px] border-gray-500 border-dashed'
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
    </div>
  );
};

export default NewTodo;
