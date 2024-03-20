"use client";

import React from "react";
import Link from "next/link";
import SingOutButton from "./SignOutBtn";
import useStoreState from "@/app/shared/store";

const NavBar = () => {
  const { userInfo } = useStoreState();
  const tk = userInfo?.token;

  return (
    <nav className="flex justify-center">
      <div className="flex">
        <Link href="/" className="p-4">
          FF
        </Link>
        <Link href="/about" className="p-4">
          사이트 소개
        </Link>
        <Link href="/feed" className="p-4">
          88피드
        </Link>
        <Link href="/mypage" className="p-4">
          마이페이지
        </Link>
        {!tk ? (
          <Link href="/login" className="p-4">
            로그인
          </Link>
        ) : (
          <Link href="/" className="p-4">
            <SingOutButton />
          </Link>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
