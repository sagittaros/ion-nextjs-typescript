import dynamic from "next/dynamic";
import { useRouter } from "next/router";

const Chatroom = dynamic(() => import("../components/chatroom"), {
  ssr: false,
});

const Room: React.FC = () => {
  const router = useRouter();
  const room = router.query.room as string;

  return (
    <>
      <p>Whoever with the same URL as this will be able to join this room!</p>
      <p style={{ color: "#ccc" }}>
        PS: Someone kindly send a PR for mute/unmute button =)
      </p>
      <Chatroom room={room} />
    </>
  );
};

export default Room;
