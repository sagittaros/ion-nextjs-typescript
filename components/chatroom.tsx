import { useEffect, useState } from "react";
import { useSignal } from "../contexts/signal_provider";
import { Client, LocalStream, Stream } from "ion-sdk-js";
import Speaker from "./speaker";

export interface ChatroomProps {
  room: string;
}

const stopMediaStream = (stream: Stream) => {
  const tracks = stream.getTracks();
  for (let i = 0, len = tracks.length; i < len; i++) {
    tracks[i].stop();
  }
};

const Chatroom: React.FC<ChatroomProps> = ({ room }) => {
  const { client, ready }: { client: Client; ready: boolean } = useSignal();
  const [localStream, setLocalStream] = useState<LocalStream>();
  const [remoteStreams, setRemoteStreams] = useState<any[]>([]);

  const joinRoom = async () => {
    console.log("joining a room");
    await client.join(room, { name: "hillary" });
    const localStream = await LocalStream.getUserMedia({
      codec: "VP8",
      resolution: "hd",
      audio: true,
      video: false,
    });
    await client.publish(localStream);
    setLocalStream(localStream);
  };

  const peerJoin = (id: any, info: any) => {
    console.log(`Peer Join: peer ${info.name} (${id}) joined`);
  };

  const peerLeave = (id: any) => {
    console.log(`Peer Leave: peer ${id} left`);
  };

  const streamAdd = async (mid: any, info: any) => {
    const remoteStream = await client.subscribe(mid);
    console.log("stream-add", mid, info, remoteStream);
    remoteStream["info"] = info;
    setRemoteStreams((prev) => [
      ...prev,
      { mid: remoteStream.mid, stream: remoteStream, sid: mid },
    ]);
  };

  const streamRemove = (stream: Stream) => {
    console.log("stream-remove %s,%", stream.mid);
    setRemoteStreams(remoteStreams.filter((item) => item.sid !== stream.mid));
  };

  const broadcast = (mid: any, info: any) => {
    console.log("broadcast %s,%s!", mid, info);
  };

  useEffect(() => {
    if (!ready) {
      return;
    }

    joinRoom();
    client.on("peer-join", peerJoin);
    client.on("peer-leave", peerLeave);
    client.on("stream-add", streamAdd);
    client.on("stream-remove", streamRemove);
    client.on("broadcast", broadcast);

    return () => {
      remoteStreams.map(({ stream }) => {
        stream.unsubscribe();
      });
      if (localStream) {
        stopMediaStream(localStream);
        localStream.unpublish();
      }
      client.leave();
      client.off("peer-join", peerJoin);
      client.off("peer-leave", peerLeave);
      client.off("stream-add", streamAdd);
      client.off("stream-remove", streamRemove);
      client.off("broadcast", broadcast);
    };
  }, [room, ready]);

  return (
    <>
      {remoteStreams.map((item) => (
        <Speaker key={item.mid} id={item.mid} stream={item.stream} />
      ))}
    </>
  );
};

export default Chatroom;
