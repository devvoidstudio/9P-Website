-- CreateTable
CREATE TABLE "ClanWar" (
    "id" TEXT NOT NULL,
    "opponent" TEXT NOT NULL,
    "result" TEXT NOT NULL,
    "ourScore" INTEGER NOT NULL,
    "opponentScore" INTEGER NOT NULL,
    "notes" TEXT,
    "warDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ClanWar_pkey" PRIMARY KEY ("id")
);
