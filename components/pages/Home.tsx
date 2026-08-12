import months from "@/utils/months";
import Link from "next/link";

const Home = () => {
  return (
    <div>
      {months.map((month) => (
        <div>
          <div>{month}</div>
          {/* <button onClick={()}>Go</button> */}
          <Link href={`/${month}`}>Go</Link>
          <br />
          <br />
        </div>
      ))}
    </div>
  );
};

export default Home;
