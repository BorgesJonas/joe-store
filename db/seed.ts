import { PrismaClient } from "@prisma/client";
import { sampleData } from "./sample-data";

/**
 * In order to insert it you can run
 * npx tsx ./db/seed
 */

/** To open the prisma studio run npx prisma studio */
async function main() {
  const prisma = new PrismaClient();
  await prisma.product.deleteMany();
  await prisma.account.deleteMany();
  await prisma.session.deleteMany();
  await prisma.verificationToken.deleteMany();

  await prisma.product.createMany({ data: sampleData.products });
  await prisma.user.createMany({ data: sampleData.users });

  console.log("Database seeded successufully!");
}

main();
