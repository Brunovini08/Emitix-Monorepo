/*
  Warnings:

  - You are about to drop the column `idIssuerInvoice` on the `Emission` table. All the data in the column will be lost.
  - You are about to drop the column `nNfe` on the `Emission` table. All the data in the column will be lost.
  - You are about to drop the column `valorTotal` on the `Emission` table. All the data in the column will be lost.
  - You are about to drop the `IssuerInvoice` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `issuerId` to the `Emission` table without a default value. This is not possible if the table is not empty.
  - Added the required column `numeroDocumento` to the `Emission` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Emission` table without a default value. This is not possible if the table is not empty.
  - Added the required column `valor` to the `Emission` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "EmissionType" AS ENUM ('NFE', 'CTE', 'MDF');

-- DropForeignKey
ALTER TABLE "Emission" DROP CONSTRAINT "Emission_idIssuerInvoice_fkey";

-- DropForeignKey
ALTER TABLE "IssuerInvoice" DROP CONSTRAINT "IssuerInvoice_userId_fkey";

-- AlterTable
ALTER TABLE "Emission" DROP COLUMN "idIssuerInvoice",
DROP COLUMN "nNfe",
DROP COLUMN "valorTotal",
ADD COLUMN     "issuerId" TEXT NOT NULL,
ADD COLUMN     "numeroDocumento" VARCHAR(20) NOT NULL,
ADD COLUMN     "type" "EmissionType" NOT NULL,
ADD COLUMN     "valor" DOUBLE PRECISION NOT NULL;

-- DropTable
DROP TABLE "IssuerInvoice";

-- CreateTable
CREATE TABLE "Issuer" (
    "id" TEXT NOT NULL,
    "cnpj" VARCHAR(14) NOT NULL,
    "razaoSocial" VARCHAR(255) NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Issuer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Issuer_cnpj_key" ON "Issuer"("cnpj");

-- AddForeignKey
ALTER TABLE "Issuer" ADD CONSTRAINT "Issuer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Emission" ADD CONSTRAINT "Emission_issuerId_fkey" FOREIGN KEY ("issuerId") REFERENCES "Issuer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
