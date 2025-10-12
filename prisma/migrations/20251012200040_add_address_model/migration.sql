-- CreateTable
CREATE TABLE "public"."Addresses" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Addresses_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Addresses_userId_idx" ON "public"."Addresses"("userId");

-- AddForeignKey
ALTER TABLE "public"."Addresses" ADD CONSTRAINT "Addresses_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
