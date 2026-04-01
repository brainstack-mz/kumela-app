// components/smart-form/ui/StepHeader.tsx

import { Volume2, VolumeX } from "lucide-react";
import { useAudioHelper } from "../hooks/useAudioHelper";

interface StepHeaderProps {
  title: string;
  audioPath: string;
}

export const StepHeader = ({ title, audioPath }: StepHeaderProps) => {
  const { isPlaying, togglePlay } = useAudioHelper(audioPath);

  return (
    <div className="mb-0">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-[#334155]">
          {title}
        </h2>

        <button
          onClick={togglePlay}
          className={`p-2.5 rounded-full transition-all cursor-pointer ${
            isPlaying 
              ? 'bg-green-500 text-white' 
              : 'bg-[#F1F5F9] text-[#94A3B8] hover:bg-[#E2E8F0]'
          }`}
        >
          {isPlaying ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </button>
      </div>
      
      <p className="text-[10px] text-[#94A3B8] mt-1 font-semibold uppercase tracking-wider">
        Instruções de voz disponíveis
      </p>
    </div>
  );
};