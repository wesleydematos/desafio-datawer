/* eslint-disable @typescript-eslint/no-require-imports */
const { PrismaClient, Role } = require("@prisma/client");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

async function main() {
  const hashedAdminPassword = await bcrypt.hash("admin12345", 10);
  const hashedUserPassword = await bcrypt.hash("user12345", 10);

  await prisma.user.upsert({
    where: { email: "admin@datawer.com" },
    update: {},
    create: {
      name: "admin",
      email: "admin@datawer.com",
      password: hashedAdminPassword,
      role: Role.ADMIN,
    },
  });

  await prisma.user.upsert({
    where: { email: "user@datawer.com" },
    update: {},
    create: {
      name: "user",
      email: "user@datawer.com",
      password: hashedUserPassword,
      role: Role.USER,
    },
  });

  console.log("✅ Seed executado com sucesso!");
}

main()
  .catch((e) => {
    console.error("❌ Erro ao rodar seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
