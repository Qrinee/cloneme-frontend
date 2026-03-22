import { FaUser, FaFlask, FaRegSmile, FaBolt, FaDonate, FaStream, FaNewspaper, FaHeart } from "react-icons/fa";
// W komponencie CategorySelector
export default function CategorySelector({ selectedCategory, onSelectCategory }) {
  const categories = [
    { name: "All", icon: <FaStream /> },
    { name: "Most Popular", icon: <FaBolt /> },
    { name: "Best", icon: <FaHeart /> },
    { name: "Newest", icon: <FaNewspaper /> },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 mt-8 flex flex-wrap justify-center gap-2">
      {categories.map((category, index) => (
        <button
          key={index}
          onClick={() => onSelectCategory(category.name)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all text-sm font-medium border ${
            selectedCategory === category.name
              ? "bg-red-600 text-white border-red-600 shadow-md"
              : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100 dark:bg-[#1a1a1a] dark:text-gray-300 dark:border-[#2a2a2a] dark:hover:bg-[#222] dark:hover:border-[#333]"
          }`}
        >
          {category.icon} {category.name}
        </button>
      ))}
    </div>
  );
}