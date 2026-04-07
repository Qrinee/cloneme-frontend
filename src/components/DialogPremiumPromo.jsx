import { Crown, MessageCircle, Heart, Image, Video, Coins } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function DialogPremiumPromo({ open, onOpenChange, onMaybeLater }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md bg-[#0a0a0f] border-yellow-500/30 text-white overflow-hidden">
        <DialogHeader className="text-center">
          <div className="w-16 h-16 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Crown size={32} className="text-yellow-500" />
          </div>
          <DialogTitle className="text-2xl font-bold text-center">
            Unlock Premium
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <p className="text-white/60 text-sm text-center">
            Upgrade to Premium to unlock full access to all features!
          </p>
          
          {/* Premium benefits */}
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
              <div className="w-10 h-10 bg-[#741818]/20 rounded-xl flex items-center justify-center">
                <Heart size={20} className="text-[#741818]" />
              </div>
              <div>
                <span className="font-bold text-white">Create AI Girlfriends</span>
                <p className="text-white/40 text-xs">Build your own companions</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
              <div className="w-10 h-10 bg-[#741818]/20 rounded-xl flex items-center justify-center">
                <MessageCircle size={20} className="text-[#741818]" />
              </div>
              <div>
                <span className="font-bold text-white">Unlimited Messages</span>
                <p className="text-white/40 text-xs">Chat without limits</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
              <div className="w-10 h-10 bg-purple-500/20 rounded-xl flex items-center justify-center">
                <Image size={20} className="text-purple-400" />
              </div>
              <div>
                <span className="font-bold text-white">AI Images & Videos</span>
                <p className="text-white/40 text-xs">Receive photos & videos from your girls</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 rounded-xl bg-yellow-500/10 border border-yellow-500/20">
              <div className="w-10 h-10 bg-yellow-500/20 rounded-xl flex items-center justify-center">
                <Coins size={20} className="text-yellow-500" />
              </div>
              <div>
                <span className="font-bold text-white">100 Credits / Month</span>
                <p className="text-white/40 text-xs">Generate content regularly</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Actions */}
        <div className="flex gap-3">
          <button 
            onClick={onMaybeLater}
            className="flex-1 px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-white/60 hover:bg-white/10 transition-colors font-medium"
          >
            Maybe Later
          </button>
          <button 
            onClick={() => window.location.href = 'https://buy.stripe.com/bJedR87f4aTTgQK5pd6sw01'}
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