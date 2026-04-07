import { Crown, MessageCircle, Heart, Image, Video, Coins } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
} from "@/components/ui/dialog";
import img1 from '../assets/task_01kmwzbe1tfvp912tg8rwe5hay_1774793926_img_1.webp';
import img2 from '../assets/task_01kmwzmaxbfbtrtm45b78g5cv6_1774794217_img_0.webp';
import img3 from '../assets/task_01kmx0114jf4n8czx2xbegyq4b_1774794633_img_1.webp';

export default function DialogPremiumPromo({ open, onOpenChange, onMaybeLater }) {
  const premiumImages = [img1, img2, img3];
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md max-h-[90dvh] bg-[#0a0a0f] border-yellow-500/30 text-white overflow-hidden p-0">
        <DialogHeader className="text-center shrink-0" style={{ margin: 0 }}>
          <div className="w-12 h-12 md:w-16 md:h-16 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
            <Crown size={24} md:size={32} className="text-yellow-500" />
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-center">
            Unlock Premium
          </h2>
        </DialogHeader>
        
        <div className="space-y-3 md:space-y-4 py-3 md:py-4 overflow-y-auto max-h-[60vh] pr-2">
          <p className="text-white/60 text-sm text-center">
            Upgrade to Premium to unlock full access to all features!
          </p>
          
          {/* AI Girls Gallery */}
          <div className="grid grid-cols-3 gap-2 p-2">
            {premiumImages.map((img, index) => (
              <div key={index} className="relative aspect-[3/4] rounded-xl overflow-hidden">
                <img src={img} alt={`AI Girl ${index + 1}`} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>
            ))}
          </div>
          <p className="text-center text-white/30 text-xs">Get exclusive access to AI generated content</p>
          
          {/* Premium benefits */}
          <div className="space-y-2 md:space-y-3">
            <div className="flex items-center gap-3 p-2.5 md:p-3 rounded-xl bg-white/5 border border-white/10">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-[#741818]/20 rounded-lg md:rounded-xl flex items-center justify-center">
                <Heart size={16} md:size={20} className="text-[#741818]" />
              </div>
              <div>
                <span className="font-bold text-white text-sm">Create AI Girlfriends</span>
                <p className="text-white/40 text-[10px] md:text-xs">Build your own companions</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-2.5 md:p-3 rounded-xl bg-white/5 border border-white/10">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-[#741818]/20 rounded-lg md:rounded-xl flex items-center justify-center">
                <MessageCircle size={16} md:size={20} className="text-[#741818]" />
              </div>
              <div>
                <span className="font-bold text-white text-sm">Unlimited Messages</span>
                <p className="text-white/40 text-[10px] md:text-xs">Chat without limits</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-2.5 md:p-3 rounded-xl bg-white/5 border border-white/10">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-purple-500/20 rounded-lg md:rounded-xl flex items-center justify-center">
                <Image size={16} md:size={20} className="text-purple-400" />
              </div>
              <div>
                <span className="font-bold text-white text-sm">AI Images & Videos</span>
                <p className="text-white/40 text-[10px] md:text-xs">Receive photos & videos</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-2.5 md:p-3 rounded-xl bg-yellow-500/10 border border-yellow-500/20">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-yellow-500/20 rounded-lg md:rounded-xl flex items-center justify-center">
                <Coins size={16} md:size={20} className="text-yellow-500" />
              </div>
              <div>
                <span className="font-bold text-white text-sm">100 Credits / Month</span>
                <p className="text-white/40 text-[10px] md:text-xs">Generate content regularly</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Actions */}
        <div className="flex gap-2 md:gap-3 shrink-0">
          <button 
            onClick={onMaybeLater}
            className="flex-1 px-4 md:px-6 py-2.5 md:py-3 bg-white/5 border border-white/10 rounded-xl text-white/60 hover:bg-white/10 transition-colors font-medium text-sm"
          >
            Maybe Later
          </button>
          <button 
            onClick={() => window.location.href = 'https://buy.stripe.com/bJedR87f4aTTgQK5pd6sw01'}
            className="flex-1 px-4 md:px-6 py-2.5 md:py-3 bg-yellow-500 hover:bg-yellow-600 text-black rounded-xl font-bold transition-colors text-sm"
          >
            <Crown size={14} md:size={18} className="inline mr-1 md:mr-2" />
            Go Premium
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}