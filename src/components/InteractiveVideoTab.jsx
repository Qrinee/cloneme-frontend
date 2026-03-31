import { Eye, Lock, Play, Speaker } from "lucide-react";
import { useState } from "react";

const actions = [
  { name: "Airjob", level: 1 },
  { name: "Ahegao Face", level: 1 },
  { name: "Kissing (Another Girl)", level: 2 },
  { name: "Undress", level: 3 },
  { name: "Show Ass", level: 4 },
  { name: "Boobjob", level: 5 },
  { name: "Blowjob & Facial", level: 6 },
  { name: "Missionary & Facial", level: 7 },
  { name: "All holes & Facial", level: 8 },
];

export default function InteractiveVideoCard() {
  const [level, setLevel] = useState(1);

  const handlePlay = (action) => {
    if (level >= action.level) {
      alert(`Action "${action.name}" triggered!`);
    } else {
      alert(`Reach level ${action.level} to unlock "${action.name}"`);
    }
  };

  return (
    <div className="flex bg-gray-900 text-white rounded-xl overflow-hidden shadow-lg w-full max-w-5xl mx-auto mt-10">
      {/* Left: Video */}
      <div className="relative w-2/3 bg-black">
        <video
          src="https://www.w3schools.com/html/mov_bbb.mp4"
          className="w-full h-full object-cover"
          controls
        />
        {/* Floating buttons */}
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          <button className="bg-gray-700 p-2 rounded-full hover:bg-gray-600" aria-label="Toggle sound">
            <Speaker className="w-5 h-5" />
          </button>
          <button className="bg-gray-700 p-2 rounded-full hover:bg-gray-600" aria-label="Toggle visibility">
            <Eye className="w-5 h-5" />
          </button>
        </div>
        {/* User overlay */}
        <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 px-4 py-2 rounded-md">
          <p className="text-sm">Isabella (Level {level})</p>
          <input
            type="text"
            placeholder="Ask Anything"
            className="mt-2 w-full rounded-md px-2 py-1 text-black"
          />
        </div>
      </div>

      {/* Right: Actions */}
      <div className="w-1/3 p-4 flex flex-col gap-4">
        {/* Level Progress */}
        <div>
          <p className="text-sm mb-1">Level {level}</p>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div
              className="bg-red-500 h-2 rounded-full transition-all"
              style={{ width: `${(level / 8) * 100}%` }}
            ></div>
          </div>
          <p className="text-xs mt-1">
            {level * 35} / 35 XP (Level {level + 1})
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col gap-2 overflow-y-auto max-h-[500px]">
          {actions.map((action) => (
            <button
              key={action.name}
              onClick={() => handlePlay(action)}
              className={`flex items-center justify-between px-4 py-2 rounded-md ${
                level >= action.level
                  ? "bg-blue-600 hover:bg-blue-500"
                  : "bg-gray-700 cursor-not-allowed"
              }`}
            >
              <span>{action.name}</span>
              {level >= action.level ? (
                <Play className="w-5 h-5" />
              ) : (
                <Lock className="w-5 h-5" />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
