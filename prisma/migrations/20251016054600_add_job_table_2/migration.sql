-- AlterEnum
ALTER TYPE "public"."BusinessRole" ADD VALUE 'USER';

-- AlterTable
ALTER TABLE "public"."BusinessMember" ADD COLUMN     "jobId" INTEGER;

-- CreateTable
CREATE TABLE "public"."job" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "job_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "job_name_key" ON "public"."job"("name");

-- AddForeignKey
ALTER TABLE "public"."BusinessMember" ADD CONSTRAINT "BusinessMember_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "public"."job"("id") ON DELETE SET NULL ON UPDATE CASCADE;
