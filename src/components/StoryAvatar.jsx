// StoryAvatar.jsx
export default function StoryAvatar({ image, label, onClick }) {
  return (
    <div className="flex-shrink-0 px-2">
      <div
        onClick={onClick}
        className="flex flex-col items-center gap-2 cursor-pointer group"
      >
        <div className="relative h-24 w-24 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#a8ff78] to-[#78ffd6] transition" />
          <div className="absolute inset-[2px] rounded-full" style={{ backgroundColor: '#101828' }} />
          <img
            src={image}
            alt={label}
            className="relative h-20 w-20 rounded-full object-cover"
          />
        </div>
        <span className="text-base max-w-[6rem] truncate">
          {label}
        </span>
      </div>
    </div>
  );
}





