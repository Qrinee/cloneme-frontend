import { useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const ScrollableContainer = ({ children, scrollAmount = 300 }) => {
  const scrollContainerRef = useRef(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="relative">
      <button
        onClick={scrollLeft}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full p-2 shadow-lg hover:bg-white dark:hover:bg-gray-700 transition-all duration-200 -ml-4"
        aria-label="Scroll left"
      >
        <FaChevronLeft className="h-5 w-5 text-gray-700 dark:text-gray-300" />
      </button>

      <div
        ref={scrollContainerRef}
        className="flex overflow-x-auto scrollbar-hide space-x-4 py-4 px-2"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {children}
      </div>

      <button
        onClick={scrollRight}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full p-2 shadow-lg hover:bg-white dark:hover:bg-gray-700 transition-all duration-200 -mr-4"
        aria-label="Scroll right"
      >
        <FaChevronRight className="h-5 w-5 text-gray-700 dark:text-gray-300" />
      </button>
    </div>
  );
};

export default ScrollableContainer;





