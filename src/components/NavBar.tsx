import { User } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import Image from "next/image";
import FFlogo from "@/assets/FF2.png";
import LogOut from "./LogOut";
const NavBar = ({ user }: { user: User | null }) => {
  return (
    <nav className="flex flex-col place-items-center text-xl">
      <div className="flex items-center justify-between w-full">
        <Link href="/" className="p-4">
          <Image src={FFlogo} alt="" width={60} height={40} />
        </Link>
        <div>
          <Link href="/about" className="p-4">
            서비스 소개
          </Link>
          <Link href="/feed" className="p-4">
            88피드
          </Link>
          <Link href="/mypage" className="p-4">
            마이페이지
          </Link>
          {!user ? (
            <Link href="/login" className="p-4">
              로그인
            </Link>
          ) : (
            <LogOut />
          )}
        </div>
      </div>
      <div className="w-full h-2 bg-gradient-to-b from-subColor2"></div>
    </nav>
  );
};
export default NavBar;
