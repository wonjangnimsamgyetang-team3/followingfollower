import Image from "next/image";
import redSpinner from "../assets/redSpinner.svg";

const Loading = () => {
  return (
    <section className="top-0 left-0 right-0 bottom-0 flex justify-center items-center">
      <Image src={redSpinner} alt="loading" width={300} height={300} />
    </section>
  );
};

export default Loading;
