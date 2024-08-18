-- CreateEnum
CREATE TYPE "Type" AS ENUM ('REFRESH', 'ACCESS');

-- AlterTable
ALTER TABLE "tokens" ADD COLUMN     "type" "Type" NOT NULL DEFAULT 'ACCESS';
