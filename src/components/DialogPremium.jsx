import React, { useState } from 'react';
import { Coins } from "lucide-react";
import {
  Dialog,
  DialogTrigger,
} from "@/components/ui/dialog";
import Content from './Content';

export default function DialogPremium({ credits = 0 }) {
  const [tooltipVisible, setTooltipVisible] = useState(false);
  
  // Determine button text based on credits (styled to match website dark theme)
  const buttonText = credits === 0 
    ? "No credits left" 
    : credits < 50
    ? "Low credits"
    : `${credits} credits`;

  return (
    <Dialog>
      <div className="relative">
        <DialogTrigger asChild>
          <div 
            className="flex items-center justify-between px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white/80 hover:text-white hover:bg-white/10 hover:border-yellow-500/30 cursor-pointer transition-all duration-200"
            onMouseEnter={() => setTooltipVisible(true)}
            onMouseLeave={() => setTooltipVisible(false)}
          >
            <div className="flex items-center gap-2 font-semibold text-base">
              <Coins className="w-5 h-5 text-yellow-400" />
              <span className={credits === 0 ? "text-red-400 animate-pulse" : credits < 50 ? "text-orange-400" : "text-white"}>{buttonText}</span>
            </div>
            <span className={`text-xl font-bold ${credits === 0 ? "text-red-400" : credits < 50 ? "text-orange-400" : "text-yellow-400"}`}>{credits}</span>
          </div>
        </DialogTrigger>
        
        {tooltipVisible && (
          <div className="absolute bottom-full left-0 mb-2 p-3 bg-popover text-popover-foreground text-sm rounded-lg shadow-lg w-72 border border-blue-200">
            {credits === 0 ? (
              <p className="font-medium">You've run out of credits. Upgrade to continue creating AI girls and chatting</p>
            ) : (
              <p className="font-medium">350 credits = 1 AI girl. Need more? Upgrade your plan</p>
            )}
          </div>
        )}
      </div>
      
      <Content />
    </Dialog>
  );
}