// @ts-nocheck
 "use client";
import { useState, useRef, useEffect } from "react";
import {
  Pause,
  Play,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
} from "lucide-react";

function VideoPlayer({
  videoUrl,
  title = "Video Player",
  autoPlay = false,
  loop = false,
}) {
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isMuted, setIsMuted] = useState(true); // Start muted for better UX
  const [progress, setProgress] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const videoRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  }, [isPlaying]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.loop = loop;
    }
  }, [loop]);

  useEffect(() => {
    const handleFullScreenChange = () => {
      setIsFullScreen(
        document.fullscreenElement === containerRef.current ||
          document.webkitFullscreenElement === containerRef.current
      );
    };

    document.addEventListener("fullscreenchange", handleFullScreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullScreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullScreenChange);
      document.removeEventListener(
        "webkitfullscreenchange",
        handleFullScreenChange
      );
    };
  }, []);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleMuteUnmute = () => {
    setIsMuted(!isMuted);
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const currentTime = videoRef.current.currentTime;
      const duration = videoRef.current.duration;
      setProgress(duration ? (currentTime / duration) * 100 : 0);
    }
  };

  const handleProgressChange = (e) => {
    const newTime =
      (parseFloat(e.target.value) / 100) * videoRef.current.duration;
    videoRef.current.currentTime = newTime;
    setProgress(parseFloat(e.target.value));
  };

  const toggleFullScreen = () => {
    if (!isFullScreen) {
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen();
      } else if (containerRef.current.webkitRequestFullscreen) {
        containerRef.current.webkitRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
    }
  };

  if (!videoUrl) {
    return (
      <div className="rounded-md p-4 text-gray-500 text-center ">
        No video available.
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="relative   border border-neutral-800 rounded-sm "
    >
      <video
        ref={videoRef}
        src={videoUrl}
        title={title}
        className="w-full rounded-md"
        onTimeUpdate={handleTimeUpdate}
        onClick={handlePlayPause} // Toggle play/pause on video click
        onLoadedMetadata={() => {
          if (autoPlay) setIsPlaying(true);
        }} // Ensure autoplay works correctly
      />

      <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 text-white p-2 rounded-b-md flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <button onClick={handlePlayPause} className="focus:outline-none">
            {isPlaying ? <Pause size={24} /> : <Play size={24} />}
          </button>
          <button onClick={handleMuteUnmute} className="focus:outline-none">
            {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
          </button>
        </div>

        <input
          type="range"
          min="0"
          max="100"
          value={progress}
          onChange={handleProgressChange}
          className="w-3/4 accent-neutral-500"
          style={{
            height: "4px",
          }}
        />

        <button onClick={toggleFullScreen} className="focus:outline-none ml-2">
          {isFullScreen ? <Minimize size={24} /> : <Maximize size={24} />}
        </button>
      </div>
    </div>
  );
}

export default VideoPlayer;
