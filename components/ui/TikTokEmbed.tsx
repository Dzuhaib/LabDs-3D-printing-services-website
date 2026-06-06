'use client';

import React, { useEffect } from 'react';

interface TikTokEmbedProps {
  videoId: string;
}

export const TikTokEmbed: React.FC<TikTokEmbedProps> = ({ videoId }) => {
  useEffect(() => {
    // Load TikTok embed script if not already present
    const scriptId = 'tiktok-embed-script';
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = 'https://www.tiktok.com/embed.js';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <blockquote 
      className="tiktok-embed" 
      cite={`https://www.tiktok.com/video/${videoId}`} 
      data-video-id={videoId}
      style={{ maxWidth: '605px', minWidth: '325px' }} 
    >
      <section>
        <a 
          target="_blank" 
          title={`@labds.3d`} 
          href={`https://www.tiktok.com/video/${videoId}`}
        >
          @labds.3d
        </a>
      </section>
    </blockquote>
  );
};
