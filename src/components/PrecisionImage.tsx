import { useEffect, useRef, useState } from 'react';
import { Wrench } from 'lucide-react';

interface PrecisionImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  aspectClass?: string;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
  withMarkers?: boolean;
  caption?: string;
}

export function PrecisionImage({
  src,
  alt,
  width,
  height,
  aspectClass = 'aspect-[4/3]',
  className = '',
  imgClassName = '',
  priority = false,
  withMarkers = true,
  caption,
}: PrecisionImageProps) {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(priority);
  const imgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    if (imgRef.current?.complete && imgRef.current.naturalWidth > 0) {
      setIsLoaded(true);
    }
  }, [src]);

  return (
    <figure className={`relative overflow-hidden surface-panel border border-hairline ${aspectClass} ${className}`}>
      {!hasError ? (
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          fetchPriority={priority ? 'high' : 'low'}
          referrerPolicy="no-referrer"
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          className={`w-full h-full object-cover transition-[transform,opacity] duration-500 ease-out ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          } ${imgClassName}`}
        />
      ) : (
        <div
          className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-calibration-grid surface-panel"
          role="img"
          aria-label={alt}
        >
          <Wrench className="w-8 h-8 text-pepperoni mb-3" aria-hidden="true" />
          <p className="font-display text-sm uppercase tracking-wider text-ice">
            HL Pneus · Juiz de Fora
          </p>
          <p className="text-xs text-steel mt-1 max-w-xs">{alt}</p>
        </div>
      )}

      {withMarkers && (
        <>
          <span
            aria-hidden="true"
            className="pointer-events-none absolute top-2.5 left-2.5 w-3 h-3 border-t border-l border-pepperoni/85"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute top-2.5 right-2.5 w-3 h-3 border-t border-r border-ice/40"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute bottom-2.5 left-2.5 w-3 h-3 border-b border-l border-ice/40"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute bottom-2.5 right-2.5 w-3 h-3 border-b border-r border-pepperoni/85"
          />
        </>
      )}

      {caption && (
        <figcaption className="sr-only">{caption}</figcaption>
      )}
    </figure>
  );
}
