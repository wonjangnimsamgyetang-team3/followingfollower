'use client';

import Image from 'next/image';
import Link from 'next/link';
import youtubeIcon from '@/assets/youtube-icon.png';
import githubIcon from '@/assets/github-icon.png';

const Footer = () => {
  const moveToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="footer footer-center p-10 border-t-2 border-solid border-subColor2">
      <aside>
        <p className="text-2xl pb-4">
          “The secret of getting ahead is getting started”
        </p>
        <p className="leading-7">
          명확한 계획과 일정은 우리를 효율적으로 이끌어주며, 목표에 도달하는 데
          필요한 단계를 명확히 하고 집중할 수 있도록 돕습니다.
          <br />
          저희는 이러한 계획의 가치를 믿으며, 여러분들이 FF 88을 통해 모든 꿈을
          이루시기를 응원하겠습니다.
        </p>
      </aside>
      <div className="grid grid-flow-col gap-4">
        <Link href="https://www.youtube.com/" target="_blank">
          <Image src={youtubeIcon} alt="유튜브 아이콘" width={40} height={40} />
        </Link>
        <Link
          href="https://github.com/wonjangnimsamgyetang-team3/followingfollower"
          target="_blank"
        >
          <Image src={githubIcon} alt="깃허브 아이콘" width={40} height={40} />
        </Link>
        <button
          className="w-10 h-10 text-base text-white bg-subColor1 rounded-full"
          onClick={moveToTop}
        >
          ⬆️
        </button>
      </div>
      <p className="text-subColor3">© 2024 FF. All right reserved.</p>
    </footer>
  );
};

export default Footer;
