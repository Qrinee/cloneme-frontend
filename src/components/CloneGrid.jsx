// components/CloneGrid.jsx
import React from "react";
import CharacterCard from "./CharacterCard";

const CloneGrid = ({ clones, navigate }) => {
  if (clones.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400 text-lg">No clones found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {clones.map((clone) => (
        <div
          key={clone._id}
          onClick={() => navigate(`/chat-profile/${clone._id}`)}
          className="cursor-pointer"
        >
          <CharacterCard
              imageUrl={import.meta.env.VITE_URL + clone.cloneAvatarPhotoUrl}
            name={clone.cloneName}
            author={clone.author || "Unknown"}
            description={clone.shortBio}
            messages={clone.messages}
          />
        </div>
      ))}
    </div>
  );
};

export default CloneGrid;





