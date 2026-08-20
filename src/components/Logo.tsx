import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTextBeside?: boolean;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({
  size = 'md',
  showTextBeside = false,
  className = '',
}) => {
  const sizeMap = {
    sm: { circle: 'w-8 h-8', outerRing: 'border-[1.5px]', innerRing: 'border-[1px]', text1: 'text-[7px]', text2: 'text-[7px]', mainText: 'text-sm', subText: 'text-[8px]' },
    md: { circle: 'w-10 h-10', outerRing: 'border-[1.5px]', innerRing: 'border-[1.5px]', text1: 'text-[8px]', text2: 'text-[8px]', mainText: 'text-base sm:text-lg', subText: 'text-[9px]' },
    lg: { circle: 'w-16 h-16', outerRing: 'border-2', innerRing: 'border-2', text1: 'text-[12px]', text2: 'text-[12px]', mainText: 'text-xl sm:text-2xl', subText: 'text-xs' },
    xl: { circle: 'w-24 h-24', outerRing: 'border-[3px]', innerRing: 'border-[3px]', text1: 'text-[18px]', text2: 'text-[18px]', mainText: 'text-2xl sm:text-3xl', subText: 'text-sm' },
  };

  const currentSize = sizeMap[size];

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Visual Badge / Ring Emblem matching the brand */}
      <div
        className={`relative ${currentSize.circle} rounded-full bg-[#08090E] flex items-center justify-center shrink-0 p-[2px] transition-transform duration-300 group-hover:scale-105`}
        style={{
          boxShadow: '0 0 16px rgba(0, 229, 255, 0.3), 0 0 28px rgba(168, 85, 247, 0.2)',
        }}
      >
        {/* Outer Purple Ring */}
        <div className={`absolute inset-0 rounded-full border-purple-500/80 ${currentSize.outerRing} pointer-events-none shadow-[0_0_10px_rgba(168,85,247,0.6)]`} />
        
        {/* Inner Cyan Ring */}
        <div className={`absolute inset-[2.5px] rounded-full border-cyan-400 ${currentSize.innerRing} pointer-events-none shadow-[0_0_8px_rgba(0,229,255,0.75)]`} />

        {/* Center Typography matching logo */}
        <div className="relative z-10 flex flex-col items-center justify-center leading-[0.85] text-center">
          <span className={`font-cyber font-black tracking-wider text-white ${currentSize.text1} drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]`}>
            CHRISTIAN
          </span>
          <span className={`font-cyber font-extrabold tracking-widest text-cyan-400 ${currentSize.text2} drop-shadow-[0_0_5px_rgba(0,229,255,0.8)]`}>
            MULTI
          </span>
          <span className={`font-cyber font-extrabold tracking-widest text-cyan-400 ${currentSize.text2} drop-shadow-[0_0_5px_rgba(0,229,255,0.8)]`}>
            STORE
          </span>
        </div>
      </div>

      {/* Horizontal Brand Name */}
      {showTextBeside && (
        <div className="flex flex-col justify-center text-left leading-none">
          <div className="flex items-center gap-1.5 font-cyber tracking-tight">
            <span className={`text-white font-black tracking-wide ${currentSize.mainText}`}>CHRISTIAN</span>
            <span className={`text-cyan-400 font-black tracking-wide drop-shadow-[0_0_8px_rgba(0,229,255,0.6)] ${currentSize.mainText}`}>
              MULTI STORE
            </span>
          </div>
          <span className={`text-slate-400 font-bold tracking-widest uppercase mt-1 ${currentSize.subText}`}>
            GAMES & ELETRÔNICOS PREMIUM
          </span>
        </div>
      )}
    </div>
  );
};
