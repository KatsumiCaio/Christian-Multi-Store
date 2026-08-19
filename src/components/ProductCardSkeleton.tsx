import React from 'react';

export const ProductCardSkeleton: React.FC = () => {
  return (
    <div className="rounded-3xl bg-[#13151F]/90 border border-white/5 overflow-hidden flex flex-col justify-between shadow-xl">
      {/* Top Image skeleton */}
      <div className="w-full aspect-square skeleton-shimmer" />

      {/* Content skeleton */}
      <div className="p-5 space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <div className="h-3 w-20 rounded-md skeleton-shimmer" />
            <div className="h-3 w-12 rounded-md skeleton-shimmer" />
          </div>
          <div className="h-5 w-full rounded-md skeleton-shimmer" />
          <div className="h-4 w-3/4 rounded-md skeleton-shimmer" />
          <div className="h-3 w-1/2 rounded-md skeleton-shimmer pt-1" />
        </div>

        {/* Price and CTA skeleton */}
        <div className="pt-3 border-t border-white/5 space-y-3">
          <div className="flex justify-between items-baseline">
            <div className="h-6 w-24 rounded-lg skeleton-shimmer" />
            <div className="h-4 w-16 rounded-full skeleton-shimmer" />
          </div>
          <div className="h-11 w-full rounded-2xl skeleton-shimmer" />
        </div>
      </div>
    </div>
  );
};
