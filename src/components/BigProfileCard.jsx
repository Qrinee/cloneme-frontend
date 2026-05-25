import { FaBolt } from "react-icons/fa";

export default function BigProfileCard({
  image,
  name,
  age,
  description,
  badge,
  badgeColor = "green", // LIVE / Audio / New
  buttonText,
  onButtonClick,
}) {
  // kolor badge
  const badgeClasses = {
    green: "bg-green-500",
    orange: "bg-orange-500",
    pink: "bg-red-500",
  };

  return (
    <div className="relative w-250 h-100 rounded-2xl overflow-hidden shadow-lg group cursor-pointer">
      {/* Obraz */}
      <img
        src={image}
        alt={name}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
      />


        <span
          className={`absolute top-3 left-3 px-2 py-1 flex  justify-center items-center text-xs font-semibold text-white rounded-full bg-[#f54296b2]`}>
          <FaBolt className="mr-2 text-[#ffe0ef]"/> New
        </span>


      {/* Overlay na tekst */}
      <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/80 to-transparent p-4 flex flex-col justify-end gap-2">
        <div className="flex items-center justify-between">
          <h3 className="text-white font-bold text-lg">{name} {age}</h3>
        </div>
        {description && (
          <p className="text-white text-sm line-clamp-2">{description}</p>
        )}

      </div>
    </div>
  );
}





