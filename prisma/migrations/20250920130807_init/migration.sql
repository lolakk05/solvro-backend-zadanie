-- CreateEnum
CREATE TYPE "public"."Answer" AS ENUM ('YES', 'NO', 'WAITING', 'PENDING');

-- CreateTable
CREATE TABLE "public"."Members" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "surname" TEXT NOT NULL,
    "email" TEXT,
    "indeks" INTEGER,
    "fieldOfSTudy" TEXT,
    "section" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Members_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Budget" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "membersId" INTEGER,

    CONSTRAINT "Budget_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Partners" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT,
    "email" TEXT,
    "answer" "public"."Answer" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "membersId" INTEGER,

    CONSTRAINT "Partners_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Presence" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "isPresent" BOOLEAN NOT NULL,
    "comment" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "membersId" INTEGER NOT NULL,

    CONSTRAINT "Presence_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Members_email_key" ON "public"."Members"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Members_indeks_key" ON "public"."Members"("indeks");

-- CreateIndex
CREATE UNIQUE INDEX "Partners_email_key" ON "public"."Partners"("email");

-- AddForeignKey
ALTER TABLE "public"."Budget" ADD CONSTRAINT "Budget_membersId_fkey" FOREIGN KEY ("membersId") REFERENCES "public"."Members"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Partners" ADD CONSTRAINT "Partners_membersId_fkey" FOREIGN KEY ("membersId") REFERENCES "public"."Members"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Presence" ADD CONSTRAINT "Presence_membersId_fkey" FOREIGN KEY ("membersId") REFERENCES "public"."Members"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
