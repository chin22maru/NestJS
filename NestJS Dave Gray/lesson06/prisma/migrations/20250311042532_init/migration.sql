-- CreateEnum
CREATE TYPE "Role" AS ENUM ('INTERN', 'ADMIN', 'ENGINEER');

-- CreateTable
CREATE TABLE "Eployee" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" "Role" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Eployee_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Eployee_name_key" ON "Eployee"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Eployee_email_key" ON "Eployee"("email");
