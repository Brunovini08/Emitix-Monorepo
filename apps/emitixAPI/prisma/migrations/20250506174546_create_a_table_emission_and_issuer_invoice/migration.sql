/*
  Warnings:

  - You are about to drop the `NFe` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "NFe" DROP CONSTRAINT "NFe_emitenteId_fkey";

-- DropTable
DROP TABLE "NFe";

-- CreateTable
CREATE TABLE "IssuerInvoice" (
    "id" TEXT NOT NULL,
    "cnpj" VARCHAR(14) NOT NULL,
    "razaoSocial" VARCHAR(255) NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "IssuerInvoice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Emission" (
    "id" TEXT NOT NULL,
    "uf" VARCHAR(2) NOT NULL,
    "valorTotal" DOUBLE PRECISION NOT NULL,
    "idIssuerInvoice" TEXT NOT NULL,
    "nNfe" VARCHAR(20) NOT NULL,
    "chaveAcesso" VARCHAR(44) NOT NULL,
    "dataEmissao" TIMESTAMP(3) NOT NULL,
    "xml" TEXT NOT NULL,
    "status" VARCHAR(20) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "pdf" TEXT NOT NULL,

    CONSTRAINT "Emission_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "IssuerInvoice_cnpj_key" ON "IssuerInvoice"("cnpj");

-- CreateIndex
CREATE UNIQUE INDEX "Emission_chaveAcesso_key" ON "Emission"("chaveAcesso");

-- AddForeignKey
ALTER TABLE "IssuerInvoice" ADD CONSTRAINT "IssuerInvoice_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Emission" ADD CONSTRAINT "Emission_idIssuerInvoice_fkey" FOREIGN KEY ("idIssuerInvoice") REFERENCES "IssuerInvoice"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
