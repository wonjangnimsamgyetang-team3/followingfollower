"use client"
import useStoreState from "@/app/shared/store";
import React, { useState } from "react";

const ProfileContents = () => {
    const [isEdit, setIsEdit] = useState(false);
 
  return (
    <div>
      <div>
        <div>
          {!isEdit ? (
            <div>
              <div>
                <div>
                  <span>냠냠박사</span>
                </div>
                <p>
                  <span>안녕하세요, 냠냠박사입니다</span>
                </p>
              </div>
             
            </div>
          ) : (
            <div>
              <div>
                <p>
                  <span>이메일&nbsp;EMAIL</span>
                </p>
                <p>
                  <span>{email}</span>
                </p>
              </p>
              <div>
                <label htmlFor="nickname">
                  닉네임&nbsp;NICKNAME
                </label>
                <input
                  type="text"
                  id="nickname"
                  name="nickname"
                  value={editValueNickname}
                  onChange={onChange}
                  minLength={6}
                  maxLength={10}
                  placeholder="닉네임 (6자~10자 이내)"
                />
              </div>
            </div>
          )}
        </div>
        {!isEdit ? (
          <div>
            <button onClick={onEditContentsHandler}>수정</button>
          </div>
        ) : (
          <div>
            <button onClick={onSubmitHandler}>완료</button>
            <button onClick={onEditCancelHandler}>취소</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileContents;
