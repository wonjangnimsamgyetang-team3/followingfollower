import { User } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";

const NavBar = ({ user }: { user: User | null }) => {
  return (
    <nav className="flex justify-center">
      <div className="flex">
        <Link href="/" className="p-4">
          FF
        </Link>
        <Link href="/about" className="p-4">
          서비스 소개
        </Link>
        <Link href="/feed" className="p-4">
          88피드
        </Link>
        {!user ? (
          <Link href="/login" className="p-4">
            마이페이지
          </Link>
        ) : (
          <Link href="/mypage" className="p-4">
            마이페이지
          </Link>
        )}

        {user ? (
          <Link href="/login" className="p-4">
            로그아웃
          </Link>
        ) : (
          <Link href="/login" className="p-4">
            로그인
          </Link>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
