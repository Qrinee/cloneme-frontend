import { UserPlus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function DialogLoginPrompt({ open, onOpenChange, onLogin, onMaybeLater }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md bg-[#0a0a0f] border-red-900/30 text-white overflow-hidden">
        <DialogHeader className="text-center">
          <div className="w-16 h-16 bg-[#741818]/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <UserPlus size={32} className="text-[#741818]" />
          </div>
          <DialogTitle className="text-2xl font-bold text-center">
            Create Your AI Girlfriend
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <p className="text-white/60 text-sm text-center">
            You need to be logged in to create your own AI girlfriend. 
            Sign in to unlock unlimited creations and personalized experiences.
          </p>
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
            onClick={onLogin}
            className="flex-1 px-6 py-3 bg-[#741818] hover:bg-[#8d1d1d] text-white rounded-xl font-bold transition-colors"
          >
            Log In
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}