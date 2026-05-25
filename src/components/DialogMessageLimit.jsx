import React, { useState, useEffect } from 'react';
import { MessageCircle, Lock, Crown, Clock } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function DialogMessageLimit({ open, onOpenChange, messagesUsed = 0, messageLimit = 5, onUpgrade }) {
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const tomorrow = new Date(now);
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(0, 0, 0, 0);
      
      const diff = tomorrow - now;
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      
      setTimeLeft({ hours, minutes, seconds });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatNumber = (num) => String(num).padStart(2, '0');

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md bg-[#0a0a0f] border-[#e11d48]/20 text-white overflow-hidden">
        <DialogHeader className="text-center">
          <div className="w-16 h-16 bg-[#e11d48]/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock size={32} className="text-[#e11d48]" />
          </div>
          <DialogTitle className="text-2xl font-bold text-center">
            Messages Limit Reached
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-white/60">
              <span>Messages used</span>
              <span>{messagesUsed} / {messageLimit}</span>
            </div>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <div 
                className="h-full bg-[#e11d48] rounded-full"
                style={{ width: `${Math.min((messagesUsed / messageLimit) * 100, 100)}%` }}
              />
            </div>
            <p className="text-white/40 text-sm text-center">
              You've used {messagesUsed} of {messageLimit} free messages this month
            </p>
          </div>

          <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/30 text-green-400 text-sm text-center">
            <div className="flex items-center justify-center gap-2 mb-1">
              <Clock size={14} />
              <span className="font-medium">Reset at midnight</span>
            </div>
            <div className="flex items-center justify-center gap-1 text-lg font-mono font-bold">
              <div className="bg-green-500/20 px-2 py-1 rounded">
                {formatNumber(timeLeft.hours)}
              </div>
              <span>:</span>
              <div className="bg-green-500/20 px-2 py-1 rounded">
                {formatNumber(timeLeft.minutes)}
              </div>
              <span>:</span>
              <div className="bg-green-500/20 px-2 py-1 rounded">
                {formatNumber(timeLeft.seconds)}
              </div>
            </div>
          </div>
          
          <div className="p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/20 space-y-3">
            <div className="flex items-center gap-2 text-yellow-500">
              <Crown size={20} />
              <span className="font-bold">Upgrade to Premium</span>
            </div>
            <ul className="text-white/60 text-sm space-y-1">
              <li>✓ Unlimited messages</li>
              <li>✓ 1 free AI Girlfriend creation/month</li>
              <li>✓ Priority support</li>
            </ul>
          </div>
        </div>
        
        <div className="flex gap-3">
          <button 
            onClick={() => onOpenChange(false)}
            className="flex-1 px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-white/60 hover:bg-white/10 transition-colors font-medium"
          >
            I'll think about it
          </button>
          <button 
            onClick={onUpgrade}
            className="flex-1 px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-black rounded-xl font-bold transition-colors"
          >
            <Crown size={18} className="inline mr-2" />
            Go Premium
          </button>
        </div>
        <p className="text-white/30 text-xs text-center mt-2">
          🔒 Secure payment • Cancel anytime
        </p>
      </DialogContent>
    </Dialog>
  );
}





