import { useEffect, useRef } from "react";
import { Stream } from "ion-sdk-js";

export interface SpeakerProps {
  id: string;
  stream: Stream;
}

const Speaker: React.FC<SpeakerProps> = ({ id, stream }) => {
  const audioRef = useRef<HTMLAudioElement>();
  useEffect(() => {
    console.log("beaming", stream);
    audioRef.current.srcObject = stream;
    return () => {
      audioRef.current.srcObject = null;
    };
  }, []);
  return (
    <>
      <audio
        ref={audioRef}
        id={id}
        autoPlay
        playsInline
        controls
        muted={false}
      />
    </>
  );
};

export default Speaker;
