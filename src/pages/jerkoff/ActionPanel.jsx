import ActionButtons from "./ActionButtons";

export default function ActionPanel({ messages, relationshipLevel, relationshipXP, xpPerLevel, progressPercent }) {
  return (
    <div className="w-full md:w-[320px] flex flex-col bg-[#0a0a0f] border-l border-white/5 flex-1 md:flex-none md:h-full">
      {/* Header */}
      <div className="p-6">
        <h3 className="text-white/90 font-bold text-lg tracking-tight">Interactions</h3>
        <p className="text-white/30 text-[10px] uppercase tracking-widest mt-1">Unlock actions via chat</p>
      </div>

      <ActionButtons messages={messages} />

      {/* Affinity Footer */}
      <div className="p-6 mt-auto">
        <div className="flex items-center justify-between mb-2">
          <span className="text-white/20 text-[9px] font-bold uppercase tracking-[0.2em]">Affinity</span>
          <span className="text-white/40 text-[9px] font-bold tracking-widest">LVL {relationshipLevel}</span>
        </div>
        <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
          <div
            className="h-full bg-white/30"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}