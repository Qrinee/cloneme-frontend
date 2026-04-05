import React from 'react';
import { MessageCircle, LogIn, Sparkles, Heart } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

export default function DialogGuestLimit({ open, onOpenChange, onLogin }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md bg-[#0a0a0f] border-white/5 text-white overflow-hidden p-0">
        <div className="relative h-32 bg-gradient-to-br from-[#741818] to-[#0a0a0f] flex items-center justify-center">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20" />
          <div className="w-16 h-16 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/10 flex items-center justify-center relative z-10">
            <MessageCircle size={32} className="text-white" />
          </div>
        </div>

        <div className="p-8 text-center">
          <DialogHeader className="mb-6">
            <DialogTitle className="text-2xl font-bold text-center mb-2">
              Guest Limit Reached 💋
            </DialogTitle>
            <DialogDescription className="text-white/40 text-center text-sm leading-relaxed">
              You've used your 5 free guest messages. <br/>
              Log in to continue your story and unlock unlimited chat!
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex flex-col items-center gap-2">
              <Sparkles className="text-yellow-500 w-5 h-5" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-white/60">Unlimited Chat</span>
            </div>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex flex-col items-center gap-2">
              <Heart className="text-pink-500 w-5 h-5" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-white/60">Save Progress</span>
            </div>
          </div>
          
          <div className="space-y-3">
            <button 
              onClick={onLogin}
              className="w-full py-4 bg-white text-black rounded-2xl font-bold transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2"
            >
              <LogIn size={18} />
              Log In to Continue
            </button>
            <button 
              onClick={() => onOpenChange(false)}
              className="w-full py-3 bg-transparent text-white/20 hover:text-white/40 transition-colors text-xs font-bold uppercase tracking-widest"
            >
              Maybe Later
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
