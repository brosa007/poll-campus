"use server";

import { dataBase } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

interface AddVoteInput {
  id?: string;
  option: boolean;
}

export async function createVote(input: AddVoteInput) {
  await dataBase.vote.create({
    data: {
      option: input.option,
    },
  });
  revalidatePath("/results");
}
