import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function EarningBanner({ onCreateClick }) {
// Zastąp sekcję return w komponencie EarningBanner tym kodem:
return (
  <section className="w-full py-8 px-4 bg-gradient-to-r from-[#e11d48]/10 via-rose-50 to-purple-100 rounded-3xl shadow-lg mt-6 border border-[#e11d48]/20 max-w-7xl mx-auto">
    <div className="flex items-center gap-3 mb-4">
      <div className="p-2 bg-white rounded-full shadow-sm">
        {/* Icon */}
        <span className="text-2xl">💖</span>
      </div>
      <h2 className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-purple-600 text-3xl font-bold">
        Create Your Virtual Companion
      </h2>
    </div>
    <p className="text-gray-700 mb-6 text-lg">
      Bring your fantasy to life. Design personality, look, and voice. Chat, flirt, and discover deeper connections.
    </p>
    <button
      onClick={onCreateClick}
      className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-[#e11d48] to-[#be123c] hover:from-red-500 hover:to-rose-500 text-white font-semibold rounded-2xl transition-all shadow-lg hover:shadow-xl hover:scale-[1.02]"
    >
      <FaPlus /> Start the Adventure
    </button>
  </section>
);
}





