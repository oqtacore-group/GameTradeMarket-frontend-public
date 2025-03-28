import React from 'react';
import { YoutubeWrapper } from './style';

const VideoPlayer = (props: {
  src: string;
  className?: string;
  poster?: string;
  youtube?: boolean;
  muted?: boolean;
  autoplay?: boolean;
}) => {
  const { src, className, poster, youtube = false } = props;
  let _youtube = youtube;

  if (src.includes('youtube')) {
    _youtube = true;
  }

  return (
    <>
      {src && (
        <>
          {_youtube ? (
            <YoutubeWrapper>
              <iframe src={src} width="100%" height="100%" frameBorder="0" />
            </YoutubeWrapper>
          ) : (
            <video
              className={className}
              controls={true}
              preload="auto"
              muted={true}
              autoPlay={false}
              data-setup="{}"
              poster={poster}>
              <source src={src} type="video/webm" />
              <p className="vjs-no-js">
                To view this video please enable JavaScript, and consider upgrading to a web browser
                that
                <a href="https://videojs.com/html5-video-support/" target="_blank" rel="noreferrer">
                  supports HTML5 video
                </a>
              </p>
            </video>
          )}
        </>
      )}
    </>
  );
};

export default VideoPlayer;
