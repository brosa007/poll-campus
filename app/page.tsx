import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <>
      <div className="flex min-h-screen flex-col space-y-6 overflow-hidden items-center justify-center p-6">
        <h1 className="font-bold text-2xl">
          Essa é a sua primeira vez na Campus Party?
        </h1>
        <div className="flex flex-row space-x-6">
          <Button className="w-[200px]">Sim</Button>
          <Button className="w-[200px]" variant="outline">
            Não
          </Button>
        </div>
      </div>
    </>
  );
}
