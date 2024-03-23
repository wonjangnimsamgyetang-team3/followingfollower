import AllCard from "@/components/AllCard";
import NewCard from "@/components/NewCard";
import Banner from "@/components/Banner";
import LikeTop from "@/components/LikeTop";

const MainPage = async () => {
  return (
    <main>
      <Banner />
      <article className="flex gap-10 pb-32">
        <aside className="flex flex-col place-items-center ml-7">
          <div className="m-5 flex text-2xl">인기 유저 TOP 3</div>
          <LikeTop />
        </aside>
        <section className="flex flex-col gap-6">
          <h2 className="py-4 text-2xl text-center text-white bg-subColor1 rounded-3xl">
            최신 Todo
          </h2>
          <div>
            <h3 className="text-2xl">인기순</h3>
            <NewCard />
          </div>
          <div>
            <h3 className="text-2xl">All</h3>
            <AllCard />
          </div>
        </section>
      </article>
    </main>
  );
};

export default MainPage;
