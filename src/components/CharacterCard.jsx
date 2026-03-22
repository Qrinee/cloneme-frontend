import { MessageCircle } from "lucide-react";
import { Card } from "@/components/ui/card";

export default function CharacterCard({
  imageUrl,
  name,
  author,
  description,
  messages,
  onClick // Dodano obsługę kliknięcia
}) {
  return (
   <Card 
     className="w-full p-4 flex flex-row gap-3 bg-white dark:bg-zinc-900 text-gray-900 dark:text-white rounded-2xl hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors h-full border border-gray-200 dark:border-zinc-700 cursor-pointer"
     onClick={onClick} // Dodano obsługę kliknięcia
   >

      {/* Reszta kodu pozostaje bez zmian */}
      <span
        className="relative overflow-hidden shrink-0"
        style={{ width: "100px", height: "120px", borderRadius: "14px" }}
        title={name}
      >
        <img
          src={imageUrl}
          alt={name}
          width={100}
          height={120}
          loading="lazy"
          draggable={false}
          className="object-cover object-center bg-gray-200 dark:bg-zinc-800 w-full h-full"
        />
      </span>

      <div className="flex flex-col justify-between w-full">
        <div className="flex flex-col">
          <p className="text-base font-medium leading-tight line-clamp-1">
            {name}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-1">
            {author}
          </p>
          <p className="text-sm text-gray-700 dark:text-gray-300 mt-1 line-clamp-2">
            {description}
          </p>
        </div>

        <div className="flex items-center justify-end mt-2 text-gray-600 dark:text-gray-400 text-sm gap-1">
          <MessageCircle className="w-[14px] h-[14px]" />
          {messages}
        </div>
      </div>
    </Card>
  );
}