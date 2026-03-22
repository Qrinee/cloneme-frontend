import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function EarningBanner({ onCreateClick }) {
// Zastąp sekcję return w komponencie EarningBanner tym kodem:
return (
  <section className="w-full py-8 px-4 bg-gradient-to-r from-pink-100 via-rose-50 to-purple-100 rounded-3xl shadow-lg mt-6 border border-pink-200 max-w-7xl mx-auto">
    <div className="flex items-center gap-3 mb-4">
      <div className="p-2 bg-white rounded-full shadow-sm">
        {/* Ikona serca lub pluszaka */}
        <span className="text-2xl">💖</span>
      </div>
      <h2 className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-purple-600 text-3xl font-bold">
        Stwórz Swoją Wirtualną Towarzyszkę
      </h2>
    </div>
    <p className="text-gray-700 mb-6 text-lg">
      Ożywij swoją fantazję. Projektuj osobowość, wygląd i głos. Rozmawiaj, flirtuj i odkrywaj głębsze połączenia.
    </p>
    <button
      onClick={onCreateClick}
      className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-pink-400 to-rose-400 hover:from-pink-500 hover:to-rose-500 text-white font-semibold rounded-2xl transition-all shadow-lg hover:shadow-xl hover:scale-[1.02]"
    >
      <FaPlus /> Rozpocznij Przygodę
    </button>
  </section>
);
}