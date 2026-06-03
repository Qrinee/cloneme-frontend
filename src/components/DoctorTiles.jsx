import React from 'react';
import { Check, ArrowRight } from 'lucide-react';

export default function DoctorTiles() {
  const tiles = [
    {
      id: 1,
      badgeText: 'DLA PACJENTÓW',
      badgeColor: 'text-[#6d28d9] border-[#6d28d9]',
      title: 'Psychiatra\nOnline',
      titleColor: 'text-[#1e1b4b]',
      subtitle: 'Szybka i dyskretna pomoc psychiczna bez wychodzenia z domu.',
      bullets: [
        'Konsultacja online 24/7',
        'E-recepta i zalecenia',
        'Wsparcie w depresji, lęku i bezsenności',
        'Pełna dyskrecja i komfort'
      ],
      buttonColor: 'bg-[#6d28d9] hover:bg-[#5b21b6]',
      buttonText: 'Umów konsultację',
      checkColor: 'text-[#6d28d9]',
      checkBg: 'bg-[#6d28d9]/10',
      bgColor: 'bg-gradient-to-b from-[#f5f3ff] to-[#ede9fe]',
      image: '/ph/1.jpeg',
    },
    {
      id: 2,
      badgeText: 'DLA PACJENTÓW',
      badgeColor: 'text-[#ea580c] border-[#ea580c]',
      title: 'Leczenie\notyłości',
      titleColor: 'text-[#1e1b4b]',
      subtitle: 'Kompleksowe wsparcie w redukcji masy ciała i poprawie zdrowia.',
      bullets: [
        'Indywidualny plan leczenia',
        'Konsultacja z lekarzem online',
        'Dobór terapii i kontrola postępów',
        'Bezpieczne i skuteczne wsparcie'
      ],
      buttonColor: 'bg-[#ea580c] hover:bg-[#c2410c]',
      buttonText: 'Umów konsultację',
      checkColor: 'text-[#ea580c]',
      checkBg: 'bg-[#ea580c]/10',
      bgColor: 'bg-gradient-to-b from-[#fff7ed] to-[#ffedd5]',
      image: '/ph/2.jpeg',
    },
    {
      id: 3,
      badgeText: 'DLA PACJENTÓW',
      badgeColor: 'text-[#0d9488] border-[#0d9488]',
      title: 'Psycholog /\nTerapeuta',
      titleColor: 'text-[#1e1b4b]',
      subtitle: 'Profesjonalne wsparcie emocjonalne i terapia online dla lepszego samopoczucia i równowagi.',
      bullets: [
        'Konsultacja online',
        'Wsparcie w stresie i lęku',
        'Terapia indywidualna',
        'Bezpieczna i dyskretna pomoc'
      ],
      buttonColor: 'bg-[#0d9488] hover:bg-[#0f766e]',
      buttonText: 'Umów konsultację',
      checkColor: 'text-[#0d9488]',
      checkBg: 'bg-[#0d9488]/10',
      bgColor: 'bg-gradient-to-b from-[#f0fdfa] to-[#ccfbf1]',
      image: '/ph/3.jpeg',
    }
  ];

  return (
    <section className="py-12 w-full max-w-[1400px] mx-auto px-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        {tiles.map((tile) => (
          <div 
            key={tile.id} 
            className={`relative flex flex-col justify-between overflow-hidden rounded-[2.5rem] p-8 md:p-10 ${tile.bgColor} shadow-lg transition-transform duration-300 hover:-translate-y-2 border border-white/50`}
          >
            {/* Top Content */}
            <div className="relative z-10 flex flex-col gap-6">
              {/* Badge */}
              <div className="flex">
                <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border ${tile.badgeColor} bg-white/50 backdrop-blur-sm`}>
                  {tile.badgeText}
                </span>
              </div>

              {/* Title & Subtitle */}
              <div>
                <h3 className={`text-4xl lg:text-5xl font-serif font-bold whitespace-pre-line leading-tight mb-4 ${tile.titleColor}`}>
                  {tile.title}
                </h3>
                <p className="text-[#4b5563] text-sm md:text-base leading-relaxed pr-4">
                  {tile.subtitle}
                </p>
              </div>

              {/* Bullets */}
              <ul className="space-y-4 mt-2">
                {tile.bullets.map((bullet, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className={`mt-0.5 rounded-full p-1 ${tile.checkBg}`}>
                      <Check className={`w-3.5 h-3.5 ${tile.checkColor}`} strokeWidth={3} />
                    </div>
                    <span className="text-[#374151] text-sm font-medium leading-tight pt-0.5">
                      {bullet}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Bottom Content (Button & Image) */}
            <div className="relative z-10 mt-12 flex flex-col">
              <button className={`${tile.buttonColor} text-white font-semibold py-4 px-6 rounded-xl flex items-center justify-between w-[80%] transition-colors shadow-md`}>
                {tile.buttonText}
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>

            {/* Background Image decoration */}
            <div className="absolute bottom-0 right-0 w-2/3 h-2/3 pointer-events-none translate-x-1/4 translate-y-1/4 opacity-90 mix-blend-multiply">
               <img 
                 src={tile.image} 
                 alt="" 
                 className="w-full h-full object-contain object-bottom-right"
               />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
