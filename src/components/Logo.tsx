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
    sm: { circle: 'w-9 h-9', outerRing: 'border-[1.5px]', innerRing: 'border-[1.5px]', text1: 'text-[9px]', text2: 'text-[9px]', mainText: 'text-base' },
    md: { circle: 'w-12 h-12', outerRing: 'border-2', innerRing: 'border-2', text1: 'text-[11px]', text2: 'text-[11px]', mainText: 'text-xl' },
    lg: { circle: 'w-20 h-20', outerRing: 'border-[3px]', innerRing: 'border-[3px]', text1: 'text-[16px]', text2: 'text-[16px]', mainText: 'text-2xl' },
    xl: { circle: 'w-32 h-32', outerRing: 'border-[4px]', innerRing: 'border-[4px]', text1: 'text-[24px]', text2: 'text-[24px]', mainText: 'text-3xl' },
  };

  const currentSize = sizeMap[size];

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Visual Badge / Ring Emblem matching the attachment */}
      <div
        className={`relative ${currentSize.circle} rounded-full bg-[#08090E] flex items-center justify-center shrink-0 p-[2px] transition-transform duration-300 hover:scale-105`}
        style={{
          boxShadow: '0 0 20px rgba(0, 229, 255, 0.35), 0 0 35px rgba(168, 85, 247, 0.25)',
        }}
      >
        {/* Outer Purple Ring */}
        <div className={`absolute inset-0 rounded-full border-purple-500/80 ${currentSize.outerRing} pointer-events-none shadow-[0_0_12px_rgba(168,85,247,0.7)]`} />
        
        {/* Inner Cyan Ring */}
        <div className={`absolute inset-[3px] rounded-full border-cyan-400 ${currentSize.innerRing} pointer-events-none shadow-[0_0_10px_rgba(0,229,255,0.85)]`} />

        {/* Center Typography matching logo */}
        <div className="relative z-10 flex flex-col items-center justify-center leading-[0.9] text-center">
          <span className={`font-cyber font-black tracking-wider text-white ${currentSize.text1} drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]`}>
            CHRISTIAN
          </span>
          <span className={`font-cyber font-extrabold tracking-widest text-cyan-400 ${currentSize.text2} drop-shadow-[0_0_6px_rgba(0,229,255,0.8)]`}>
            MULTI
          </span>
          <span className={`font-cyber font-extrabold tracking-widest text-cyan-400 ${currentSize.text2} drop-shadow-[0_0_6px_rgba(0,229,255,0.8)]`}>
            STORE
          </span>
        </div>
      </div>

      {/* Horizontal Brand Name (Optional) */}
      {showTextBeside && (
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5 font-cyber font-bold tracking-tight text-white leading-none">
            <span className="text-white text-lg sm:text-xl font-black tracking-wide">CHRISTIAN</span>
            <span className="text-cyan-400 text-lg sm:text-xl font-black tracking-wide drop-shadow-[0_0_8px_rgba(0,229,255,0.6)]">MULTI STORE</span>
          </div>
          <span className="text-[10px] sm:text-xs text-slate-400 font-medium tracking-wider uppercase mt-0.5">
            Games & Eletrônicos Premium
          </span>
        </div>
      )}
    </div>
  );
};
