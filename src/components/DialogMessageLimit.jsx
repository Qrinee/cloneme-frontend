import React from 'react';
import { MessageCircle, Lock, Crown } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function DialogMessageLimit({ open, onOpenChange, messagesUsed = 0, messageLimit = 6, onUpgrade }) {
  const remaining = messageLimit - messagesUsed;
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md bg-[#0a0a0f] border-red-900/30 text-white overflow-hidden">
        <DialogHeader className="text-center">
          <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock size={32} className="text-red-500" />
          </div>
          <DialogTitle className="text-2xl font-bold text-center">
            Messages Limit Reached
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          {/* Usage bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-white/60">
              <span>Messages used</span>
              <span>{messagesUsed} / 5</span>
            </div>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <div 
                className="h-full bg-red-500 rounded-full"
                style={{ width: `${Math.min((messagesUsed / 5) * 100, 100)}%` }}
              />
            </div>
            <p className="text-white/40 text-sm text-center">
              You've used {messagesUsed} of 6 free messages this month
            </p>
          </div>
          
          {/* Premium benefits */}
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
        
        {/* Actions */}
        <div className="flex gap-3">
          <button 
            onClick={() => onOpenChange(false)}
            className="flex-1 px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-white/60 hover:bg-white/10 transition-colors font-medium"
          >
            Maybe Later
          </button>
          <button 
            onClick={onUpgrade}
            className="flex-1 px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-black rounded-xl font-bold transition-colors"
          >
            <Crown size={18} className="inline mr-2" />
            Go Premium
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}