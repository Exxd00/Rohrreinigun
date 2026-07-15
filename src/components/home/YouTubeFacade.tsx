"use client";

import { useState } from "react";
import { Play } from "lucide-react";

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
  const [activated, setActivated] = useState(false);

  return (
    <div className={`relative w-full bg-black ${aspectClass}`}>
      {activated ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&playsinline=1&modestbranding=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      ) : (
        <button
          type="button"
          onClick={() => setActivated(true)}
          aria-label={`${title} abspielen`}
          className="group absolute inset-0 h-full w-full"
        >
          <img
            src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`}
            alt={title}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <span className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10 transition-colors group-hover:from-black/40" />
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-red-600 shadow-2xl shadow-red-600/40 transition-transform duration-300 group-hover:scale-110">
              <Play className="ml-1 h-7 w-7 text-white" fill="currentColor" />
            </span>
          </span>
        </button>
      )}
    </div>
  );
}
