import Image from 'next/image';
import girl from '../../assets/girl.png';
import boy from '../../assets/boy.png';
import memo from '../../assets/memo.png';
import calendar from '../../assets/calendar.png';
import comment from '../../assets/comment.png';

const AboutPage = () => {
  return (
    <div>
      <h2>Todo를 공유하며 소통할 수 있는 사이트 팔팔입니다!</h2>
      <article>
        <section>
          <Image src={girl} alt="소개하는 여자 일러스트" />
        </section>
        <section>
          <div>
            <p>“자신의 Todo를 공유해보세요!”</p>
            <Image src={memo} alt="메모지 일러스트" />
          </div>
          <div>
            <p>“캘린더로 월별 일정을 보기 편하게!”</p>
            <Image src={calendar} alt="캘린더 일러스트" />
          </div>
          <div>
            <p>“서로의 꿈과 목표를 응원해요!”</p>
            <Image src={comment} alt="댓글 일러스트" />
          </div>
        </section>
      </article>
      <article>
        <section>
          <div>
            <h1>103</h1>
            <p>개의 Todo가 공유되었어요!</p>
          </div>
          <div>
            <h1>57</h1>
            <p>개의 Todo가 완료되었어요!</p>
          </div>
          <div>
            <h1>34</h1>
            <p>명의 사람들이 이용 중이에요!</p>
          </div>
        </section>
        <section>
          <Image src={boy} alt="소개하는 남자 일러스트" />
        </section>
      </article>
    </div>
  );
};

export default AboutPage;
