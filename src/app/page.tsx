import Board from "@/components/Board";
import Header from "@/components/Header";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      {/* Header */}
      <Header />
      <h1>Trello 2.0 Clone</h1>
      <Board />
    </main>
  );
}
