"use client";
// app/results/page.tsx
import { useEffect, useState } from "react";

const ResultsPage = () => {
  const [results, setResults] = useState({ A: 0, B: 0 });

  useEffect(() => {
    const fetchResults = async () => {
      const res = await fetch("/api/vote");
      const data = await res.json();
      setResults(data);
    };

    const interval = setInterval(fetchResults, 1000); // Atualização em tempo real
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="flex flex-col items-center p-6">
        <h1 className="text-2xl font-bold">
          Resultados ao Vivo
        </h1>
        <div className="mt-6">
          <p>Opção A: {results.A} votos</p>
          <p>Opção B: {results.B} votos</p>
        </div>
      </div>
    </>
  );
};

export default ResultsPage;
