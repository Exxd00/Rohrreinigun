"use client";

import { useState, useRef, useEffect } from "react";

interface YouTubeFacadeProps {
  videoId: string;
  title: string;
  aspectClass?: string;
}

export default function YouTubeFacade({
  videoId,
  title,
  aspectClass = "aspect-[4/3]",
}: YouTubeFacadeProps) {
  const [load, setLoad] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Load + autoplay (muted, looping) once the clip scrolls into view — like the other videos
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setLoad(true);
            observer.disconnect();
          }
        }
      },
      { threshold: 0.25, rootMargin: "150px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`relative w-full bg-black ${aspectClass}`}>
      {load ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=1&rel=0&playsinline=1&modestbranding=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      ) : (
        <img
          src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`}
          alt={title}
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}
    </div>
  );
}
