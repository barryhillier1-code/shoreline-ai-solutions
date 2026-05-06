'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

export type GalleryImage = {
  alt: string;
  gridClassName?: string;
  location?: string;
  src: string;
  title: string;
};

type ImageGalleryProps = {
  galleryImages?: GalleryImage[];
  intro?: string;
  title?: string;
};

const defaultGalleryImages: GalleryImage[] = [
  {
    alt: 'Fishing boat crossing open water near a coastal islet in Newfoundland',
    gridClassName: 'md:col-span-2 md:row-span-2',
    location: 'Clarenville Harbour',
    src: 'https://images.unsplash.com/photo-1533633154255-32918346da8a?auto=format&fit=crop&q=80&w=1800',
    title: 'Departure from the harbour',
  },
  {
    alt: 'Rugged green coastline meeting deep blue ocean water in Trinity Bay',
    gridClassName: 'md:col-span-2',
    location: 'Trinity Bay',
    src: 'https://images.unsplash.com/photo-1762763955216-1ca1d05ac637?auto=format&fit=crop&q=80&w=1600',
    title: 'Sea cliffs and hidden coves',
  },
  {
    alt: 'Whale surfacing in open ocean water during a Newfoundland viewing excursion',
    location: 'Open Water',
    src: 'https://images.unsplash.com/photo-1712933342478-51b92117ca80?auto=format&fit=crop&q=80&w=1400',
    title: 'Wildlife moments worth waiting for',
  },
  {
    alt: 'Boat helm and panoramic ocean view from a bright charter interior',
    location: 'Onboard',
    src: 'https://images.unsplash.com/photo-1435171213190-3bcbbe4e9a13?auto=format&fit=crop&q=80&w=1400',
    title: 'Comfort inside the charter',
  },
  {
    alt: 'Rocky Newfoundland coastline with waves moving through a dramatic shoreline scene',
    gridClassName: 'md:col-span-2',
    location: 'Eastern Newfoundland',
    src: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&q=80&w=1600',
    title: 'Texture, wind, and Atlantic energy',
  },
];

function LightboxButton({
  ariaLabel,
  children,
  onClick,
}: {
  ariaLabel: string;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      onClick={onClick}
      className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white shadow-lg backdrop-blur-md transition hover:bg-white/20"
    >
      {children}
    </button>
  );
}

export default function ImageGallery({
  galleryImages = defaultGalleryImages,
  intro = 'Use this gallery to show atmosphere, service quality, and local scenery without forcing every image into the same rigid row. Alt text is included in the data layer so the component stays useful for SEO as it gets reused across clients.',
  title = 'A flexible image gallery that feels more editorial than template-like',
}: ImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const isOpen = activeIndex !== null;
  const activeImage = activeIndex !== null ? galleryImages[activeIndex] : null;

  function openLightbox(index: number) {
    setActiveIndex(index);
  }

  function closeLightbox() {
    setActiveIndex(null);
  }

  function showPrevious() {
    setActiveIndex((current) => {
      if (current === null) {
        return current;
      }

      return current === 0 ? galleryImages.length - 1 : current - 1;
    });
  }

  function showNext() {
    setActiveIndex((current) => {
      if (current === null) {
        return current;
      }

      return current === galleryImages.length - 1 ? 0 : current + 1;
    });
  }

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    function handleKeydown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        closeLightbox();
      }

      if (event.key === 'ArrowLeft') {
        showPrevious();
      }

      if (event.key === 'ArrowRight') {
        showNext();
      }
    }

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeydown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeydown);
    };
  }, [isOpen, galleryImages.length]);

  return (
    <>
      <section id="gallery" className="bg-slate-950 py-16 text-white lg:py-20">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.34em] text-sky-200">
              Image Gallery
            </p>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight [font-family:var(--font-cormorant)] sm:text-5xl">
              {title}
            </h2>
            <p className="mt-5 text-base leading-8 text-slate-300">{intro}</p>
          </div>

          <div className="mt-10 grid auto-rows-[220px] gap-5 md:grid-cols-4">
            {galleryImages.map((image, index) => (
              <button
                key={`${image.title}-${index}`}
                type="button"
                onClick={() => openLightbox(index)}
                className={[
                  'group relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/5 text-left ring-1 ring-white/5 transition-transform duration-300 hover:scale-[1.01]',
                  image.gridClassName ?? '',
                ].join(' ')}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  {image.location ? (
                    <p className="text-xs font-semibold uppercase tracking-[0.28em] text-sky-200">
                      {image.location}
                    </p>
                  ) : null}
                  <h3 className="mt-2 text-2xl font-semibold [font-family:var(--font-cormorant)]">
                    {image.title}
                  </h3>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {isOpen && activeImage ? (
        <div
          className="fixed inset-0 z-[120] flex items-center justify-center bg-slate-950/92 px-4 py-6 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          aria-label={activeImage.title}
        >
          <button
            type="button"
            aria-label="Close lightbox"
            onClick={closeLightbox}
            className="absolute inset-0 cursor-default"
          />

          <div className="relative z-10 flex w-full max-w-6xl items-center justify-center gap-4">
            <div className="hidden md:block">
              <LightboxButton ariaLabel="Previous image" onClick={showPrevious}>
                <ChevronLeft className="h-5 w-5" aria-hidden="true" />
              </LightboxButton>
            </div>

            <div className="relative w-full overflow-hidden rounded-[2rem] border border-white/10 bg-slate-900 shadow-[0_28px_90px_rgba(0,0,0,0.4)]">
              <div className="absolute right-4 top-4 z-20">
                <LightboxButton ariaLabel="Close gallery" onClick={closeLightbox}>
                  <X className="h-5 w-5" aria-hidden="true" />
                </LightboxButton>
              </div>

              <div className="relative aspect-[4/3] w-full">
                <Image
                  src={activeImage.src}
                  alt={activeImage.alt}
                  fill
                  sizes="100vw"
                  priority
                  className="object-contain"
                />
              </div>

              <div className="flex items-center justify-between gap-4 border-t border-white/10 bg-slate-950/70 px-5 py-4">
                <div>
                  {activeImage.location ? (
                    <p className="text-xs font-semibold uppercase tracking-[0.28em] text-sky-200">
                      {activeImage.location}
                    </p>
                  ) : null}
                  <p className="mt-2 text-lg font-semibold text-white">{activeImage.title}</p>
                  <p className="mt-1 text-sm text-slate-300">{activeImage.alt}</p>
                </div>

                <div className="flex items-center gap-3 md:hidden">
                  <LightboxButton ariaLabel="Previous image" onClick={showPrevious}>
                    <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                  </LightboxButton>
                  <LightboxButton ariaLabel="Next image" onClick={showNext}>
                    <ChevronRight className="h-5 w-5" aria-hidden="true" />
                  </LightboxButton>
                </div>
              </div>
            </div>

            <div className="hidden md:block">
              <LightboxButton ariaLabel="Next image" onClick={showNext}>
                <ChevronRight className="h-5 w-5" aria-hidden="true" />
              </LightboxButton>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
