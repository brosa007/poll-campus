import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  try {
    // Agrupar e contar votos por opção (TRUE ou FALSE)
    const votes = await prisma.vote.groupBy({
      by: ["option"],
      _count: {
        option: true,
      },
    });

    // Formatar dados para o gráfico
    const formattedVotes = votes.map((vote) => ({
      option: vote.option ? "Sim" : "Não", // Traduz TRUE/FALSE para "Sim"/"Não"
      count: vote._count.option, // Contagem de votos
      fill: vote.option
        ? "hsl(var(--chart-1))"
        : "hsl(var(--chart-2))", // Definir cores
    }));

    return NextResponse.json(formattedVotes);
  } catch (error) {
    console.error("Erro ao buscar votos:", error);
    return NextResponse.json(
      { error: "Erro ao buscar votos" },
      { status: 500 }
    );
  }
}
