import { Answer, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const member = await prisma.members.create({
    data: {
      name: "Imie",
      surname: "Nazwisko",
    },
  });

  await prisma.budget.create({
    data: {
      name: "Wydatek1",
      amount: 100.5,
    },
  });

  await prisma.partners.create({
    data: {
      name: "Partner1",
      answer: Answer.YES,
    },
  });

  await prisma.presence.create({
    data: {
      date: new Date("2024-06-20"),
      isPresent: true,
      membersId: member.id,
    },
  });

  console.warn("bazka zseedowana");
}

main()
  .catch((error: unknown) => {
    console.error(error);
    throw error;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
