import React from 'react';
import { 
  Flame, 
  Headphones, 
  Headset, 
  Watch, 
  Speaker, 
  Cable, 
  Smartphone, 
  Gamepad2 
} from 'lucide-react';
import { CategoryId } from '../types';
import { CATEGORIES } from '../data/products';

interface CategoryFilterProps {
  activeCategory: CategoryId;
  onSelectCategory: (category: CategoryId) => void;
  productCounts: Record<CategoryId, number>;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  activeCategory,
  onSelectCategory,
  productCounts,
}) => {
  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Flame':
        return <Flame className="w-4 h-4 shrink-0 text-amber-400" />;
      case 'Headphones':
        return <Headphones className="w-4 h-4 shrink-0" />;
      case 'Headset':
        return <Headset className="w-4 h-4 shrink-0" />;
      case 'Watch':
        return <Watch className="w-4 h-4 shrink-0" />;
      case 'Speaker':
        return <Speaker className="w-4 h-4 shrink-0" />;
      case 'Cable':
        return <Cable className="w-4 h-4 shrink-0" />;
      case 'Smartphone':
        return <Smartphone className="w-4 h-4 shrink-0" />;
      case 'Gamepad2':
        return <Gamepad2 className="w-4 h-4 shrink-0" />;
      default:
        return <Flame className="w-4 h-4 shrink-0" />;
    }
  };

  return (
    <div className="w-full">
      {/* Scrollable category pills bar with mobile-first smooth drag/touch */}
      <div className="flex items-center gap-2.5 overflow-x-auto no-scrollbar py-2 px-1 sm:px-0">
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat.id;
          const count = productCounts[cat.id] || 0;

          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-extrabold whitespace-nowrap transition-all duration-200 shrink-0 cursor-pointer ${
                isActive
                  ? 'bg-[#00E5FF] text-black shadow-[0_0_20px_rgba(0,229,255,0.4)] scale-[1.02]'
                  : 'glass text-slate-300 border border-white/10 hover:border-[#00E5FF]/40 hover:text-white'
              }`}
            >
              <span className={isActive ? 'text-black' : 'text-slate-400'}>
                {getCategoryIcon(cat.iconName)}
              </span>
              <span>{cat.shortName}</span>
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded-full font-black ${
                  isActive
                    ? 'bg-black text-[#00E5FF]'
                    : 'bg-white/10 text-slate-300'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
