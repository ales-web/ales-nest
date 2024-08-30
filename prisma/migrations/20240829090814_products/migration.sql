/*
  Warnings:

  - You are about to drop the column `products` on the `shops` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "ProductTag" AS ENUM ('HANDMADE', 'ECO', 'LEATHER', 'FUR', 'IRON', 'CERAMIC');

-- AlterTable
ALTER TABLE "shops" DROP COLUMN "products";

-- CreateTable
CREATE TABLE "products" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "images" TEXT[],
    "tags" "ProductTag"[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "shopId" INTEGER NOT NULL,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_shopId_fkey" FOREIGN KEY ("shopId") REFERENCES "shops"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
