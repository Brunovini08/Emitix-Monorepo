-- CreateEnum
CREATE TYPE "LogType" AS ENUM ('EMITIDO', 'CANCELADO', 'CARTA_CORRECAO', 'INUTILIZADO', 'PENDENTE');

-- CreateTable
CREATE TABLE "logger" (
    "id" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "type" "LogType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "issuerID" TEXT NOT NULL,
    "userID" TEXT NOT NULL,

    CONSTRAINT "logger_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "logger" ADD CONSTRAINT "logger_issuerID_fkey" FOREIGN KEY ("issuerID") REFERENCES "Issuer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "logger" ADD CONSTRAINT "logger_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
