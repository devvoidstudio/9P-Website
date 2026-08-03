-- CreateTable
CREATE TABLE "StaffMember" (
    "id" TEXT NOT NULL,
    "discordId" TEXT NOT NULL,
    "displayName" TEXT NOT NULL,
    "visible" BOOLEAN NOT NULL DEFAULT true,
    "roleId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StaffMember_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "StaffMember_discordId_key" ON "StaffMember"("discordId");

-- AddForeignKey
ALTER TABLE "StaffMember" ADD CONSTRAINT "StaffMember_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "RolePreset"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
