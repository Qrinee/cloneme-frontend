export default function ProfileCard({
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
    pink: "bg-pink-500",
  };

  return (
    <div className="relative w-60 h-80 rounded-2xl overflow-hidden shadow-lg group cursor-pointer">
      {/* Obraz */}
      <img
        src={image}
        alt={name}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
      />

      {/* Badge */}
      {badge && (
        <span
          className={`absolute top-3 left-3 px-2 py-1 text-xs font-semibold text-white rounded-full ${badgeClasses[badgeColor]}`}
        >
          {badge}
        </span>
      )}

      {/* Overlay na tekst */}
      <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/80 to-transparent p-4 flex flex-col justify-end gap-2">
        <div className="flex items-center justify-between">
          <h3 className="text-white font-bold text-lg">{name} {age}</h3>
        </div>
        {description && (
          <p className="text-white text-sm line-clamp-2">{description}</p>
        )}

        {buttonText && (
          <button
            onClick={onButtonClick}
            className="mt-2 w-full bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold py-1.5 rounded-lg transition"
          >
            {buttonText}
          </button>
        )}
      </div>
    </div>
  );
}
