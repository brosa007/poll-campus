// pages/api/vote.ts
import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { option } = req.body;

    try {
      const vote = await prisma.vote.create({
        data: {
          option: option, // true ou false
        },
      });
      res.status(201).json({ message: "Voto computado!", vote });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erro ao computar voto." });
    }
  } else {
    res.status(405).json({ message: "Método não permitido." });
  }
}
