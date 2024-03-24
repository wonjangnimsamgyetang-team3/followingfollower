import { User } from '@supabase/auth-helpers-nextjs';
import Link from 'next/link';
import Image from 'next/image';
import FFlogo from '@/assets/FF3.jpg';
import LogOut from './LogOut';
const NavBar = ({ user }: { user: User | null }) => {
  return (
    <nav>
      <div className="p-2 flex items-center justify-between">
        <Link href="/">
          <Image src={FFlogo} alt="" width={60} height={40} />
        </Link>
        <div className="pr-6 text-xl flex gap-10">
          <Link href="/about">서비스 소개</Link>
          <Link href="/feed">88피드</Link>
          <Link href="/mypage">마이페이지</Link>
          {!user ? <Link href="/login">로그인</Link> : <LogOut />}
        </div>
      </div>
      <div className="w-full h-2 bg-gradient-to-b from-subColor2"></div>
    </nav>
  );
};
export default NavBar;
