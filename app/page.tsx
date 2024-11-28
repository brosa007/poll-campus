"use client";
import { Button } from "@/app/components/ui/button";
import { useRouter } from "next/navigation";
import { createVote } from "./_actions/add-vote";

export default function Home() {
  const router = useRouter();
  async function addVote(option: boolean) {
    try {
      await createVote({ option });
      console.log(
        `Voto "${option ? "Sim" : "Não"}" foi computado!`
      );
      router.push("/results");
    } catch (error) {
      console.error("Erro ao computar voto:", error);
    }
  }
  return (
    <div className="flex min-h-screen flex-col space-y-6 items-center justify-center p-6">
      <h1 className="font-bold text-2xl">
        Essa é a sua primeira vez na Campus Party?
      </h1>
      <div className="flex flex-row space-x-6">
        <Button
          className="w-[200px]"
          onClick={() => addVote(true)}
        >
          Sim
        </Button>
        <Button
          className="w-[200px]"
          variant="outline"
          value="Não"
          onClick={() => addVote(false)}
        >
          Não
        </Button>
      </div>
    </div>
  );
}
