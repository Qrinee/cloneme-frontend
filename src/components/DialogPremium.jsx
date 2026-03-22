import React, { useState } from 'react';
import { FaFacebookMessenger } from "react-icons/fa";
import {
  Dialog,
  DialogTrigger,
} from "@/components/ui/dialog";
import Content from './Content';
import '../css/Content.css'
import { AiFillMessage } from 'react-icons/ai';
export default function DialogPremium({ points }) {
  const [tooltipVisible, setTooltipVisible] = useState(false);
  
  // Determine button style based on points
  const buttonStyle = points === 0 
    ? "from-red-500 via-red-400 to-red-600 text-white animate-pulse"
    : points < 10
    ? "from-orange-500 via-orange-400 to-orange-600 text-white"
    : "from-yellow-400 via-yellow-300 to-yellow-500 text-yellow-900";
  
  const buttonText = points === 0 
    ? "No messages left" 
    : points === 1
    ? "1 message left"
    : `${points} messages left`;

  return (
    <Dialog>
      <div className="relative">
        <DialogTrigger asChild>
          <div 
            className={`flex items-center justify-between px-4 py-3 rounded-xl bg-gradient-to-r ${buttonStyle} shadow-md cursor-pointer duration-300`}
            onMouseEnter={() => setTooltipVisible(true)}
            onMouseLeave={() => setTooltipVisible(false)}
          >
            <div className="flex items-center gap-2 font-semibold text-base">
              <AiFillMessage className="text-lg" />
              <span>{buttonText}</span>
            </div>
            <span className="text-xl font-bold">{points}</span>
          </div>
        </DialogTrigger>
        
        {tooltipVisible && (
          <div className="absolute bottom-full left-0 mb-2 p-3 bg-popover text-popover-foreground text-sm rounded-lg shadow-lg w-72 border border-blue-200">
            {points === 0 ? (
              <p className="font-medium">You've used all your messages. Upgrade to continue chatting</p>
            ) : (
              <p className="font-medium">Messages reset monthly. Upgrade for more capacity</p>
            )}
          </div>
        )}
      </div>
      
      <Content />
    </Dialog>
  );
}