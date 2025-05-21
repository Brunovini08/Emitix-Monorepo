/*
  Warnings:

  - You are about to drop the `File` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "File" DROP CONSTRAINT "File_userId_fkey";

-- DropTable
DROP TABLE "File";

-- CreateTable
CREATE TABLE "NFe" (
    "id" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDENTE',
    "chave" TEXT,
    "xmlEnvio" TEXT,
    "xmlRetorno" TEXT,
    "emitenteId" TEXT NOT NULL,
    "destinatario" JSON NOT NULL,
    "itens" JSON NOT NULL,
    "valorTotal" DOUBLE PRECISION NOT NULL,
    "uf" TEXT NOT NULL,
    "ambiente" TEXT NOT NULL DEFAULT 'HOMOLOGACAO',
    "erro" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "NFe_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "NFe_chave_key" ON "NFe"("chave");

-- AddForeignKey
ALTER TABLE "NFe" ADD CONSTRAINT "NFe_emitenteId_fkey" FOREIGN KEY ("emitenteId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
