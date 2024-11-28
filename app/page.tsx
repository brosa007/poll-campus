import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [voteMessage, setVoteMessage] = useState("");

  const handleVote = (option: string) => {
    setVoteMessage(`Seu voto "${option}" foi computado!`);
  };

  return (
    <div className="flex min-h-screen flex-col space-y-6 items-center justify-center p-6">
      <h1 className="font-bold text-2xl">
        Essa é a sua primeira vez na Campus Party?
      </h1>
      <div className="flex flex-row space-x-6">
        <Button className="w-[200px]" onClick={() => handleVote("Sim")}>
          Sim
        </Button>
        <Button
          className="w-[200px]"
          variant="outline"
          onClick={() => handleVote("Não")}
        >
          Não
        </Button>
      </div>
      {voteMessage && (
        <div className="mt-6 text-center text-green-500 font-medium">
          {voteMessage}
        </div>
      )}
    </div>
  );
}
