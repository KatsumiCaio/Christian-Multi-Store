import React, { useState } from 'react';

interface ImageWithSkeletonProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  aspectRatioClass?: string;
  className?: string;
  imageClassName?: string;
}

export const ImageWithSkeleton: React.FC<ImageWithSkeletonProps> = ({
  src,
  alt,
  aspectRatioClass = 'aspect-square',
  className = '',
  imageClassName = '',
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  return (
    <div className={`relative overflow-hidden bg-[#0D0E15] ${aspectRatioClass} ${className}`}>
      {/* Skeleton Shimmer Background while loading */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-[#131522] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.06] to-transparent animate-[shimmer_1.5s_infinite] -translate-x-full" />
        </div>
      )}

      {/* Actual Image */}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
        onError={() => {
          setHasError(true);
          setIsLoaded(true);
        }}
        className={`w-full h-full object-cover transition-all duration-500 ${
          isLoaded ? 'opacity-100 scale-100 blur-0' : 'opacity-0 scale-105 blur-sm'
        } ${imageClassName}`}
        {...props}
      />
    </div>
  );
};
