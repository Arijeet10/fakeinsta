import { AiFillInstagram } from "react-icons/ai";

const Loading = () => {
  return (
    <>
      <div className="fixed inset-0 bg-white" />
      <div className="w-[300px] z-50 absolute top-2/4 left-2/4 translate-x-[-50%] translate-y-[-50%]">
        <AiFillInstagram className="w-full h-full text-pink-500 hover:text-violet-500" />
        <div className="text-center font-bold">Loading...</div>
      </div>
    </>
  );
};

export default Loading;
