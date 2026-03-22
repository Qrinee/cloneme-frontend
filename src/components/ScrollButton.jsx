import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function ScrollButton({ direction, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`hidden md:flex absolute cursor-pointer top-1/2 -translate-y-1/2 h-12 w-12 items-center justify-center z-10 bg-black/30 rounded-full text-white hover:bg-black/50 ${
        direction === "left" ? "left-0 ml-2" : "right-0 mr-2"
      }`}
    >
      {direction === "left" ? <FaChevronLeft size={16} /> : <FaChevronRight size={16} />}
    </button>
  );
}