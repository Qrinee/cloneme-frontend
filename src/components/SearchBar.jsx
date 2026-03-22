import { FaSearch, FaTimes } from "react-icons/fa";

export default function SearchBar({ searchQuery, onSearchChange }) {
  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="flex items-center bg-white dark:bg-[#1a1a1a] border border-gray-300 dark:border-[#333] rounded-full px-4 py-2 shadow-md">
        <FaSearch className="text-gray-500 dark:text-gray-400 mr-2" />
        <input
          type="text"
          placeholder="Search AI clones by name, description or tags..."
          className="w-full bg-transparent text-gray-900 dark:text-white focus:outline-none placeholder:text-gray-500 dark:placeholder:text-gray-400"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        {searchQuery && (
          <button 
            onClick={() => onSearchChange('')}
            className="ml-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-white"
          >
            <FaTimes />
          </button>
        )}
      </div>
    </div>
  );
}