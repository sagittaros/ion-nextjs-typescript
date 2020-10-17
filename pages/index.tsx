import Link from "next/link";

const Home: React.FC = () => {
  return (
    <>
      <p>
        Hello, simply add a "slash/path" to this URL like{" "}
        <Link href="/room_name">/room_name</Link>
      </p>
    </>
  );
};

export default Home;
