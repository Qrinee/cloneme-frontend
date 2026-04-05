import { Lock } from "lucide-react";

export default function LoginRequiredDialog({ open, onClose, message }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-[#0a0a0f] border border-white/10 rounded-[2rem] p-8 max-w-md w-full text-center">
        <div className="w-16 h-16 bg-[#741818]/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <Lock size={32} className="text-[#741818]" />
        </div>
        <h3 className="text-2xl font-bold mb-4">Login Required</h3>
        <p className="text-white/60 mb-6">{message}</p>
        <div className="flex gap-3">
          <button 
            onClick={onClose}
            className="flex-1 px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-white/60 hover:bg-white/10 transition-colors"
          >
            Maybe Later
          </button>
          <button 
            onClick={() => window.location = '/login'}
            className="flex-1 px-6 py-3 bg-[#741818] hover:bg-[#8d1d1d] text-white rounded-xl font-bold transition-colors"
          >
            Log In
          </button>
        </div>
      </div>
    </div>
  );
}