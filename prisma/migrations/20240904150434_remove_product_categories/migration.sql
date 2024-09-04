/*
  Warnings:

  - You are about to drop the column `categories` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `on_stock` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `shopId` on the `products` table. All the data in the column will be lost.
  - Added the required column `category` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shop_id` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_shopId_fkey";

-- AlterTable
ALTER TABLE "products" DROP COLUMN "categories",
DROP COLUMN "on_stock",
DROP COLUMN "shopId",
ADD COLUMN     "category" "ProductCategories" NOT NULL,
ADD COLUMN     "in_stock" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "shop_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_shop_id_fkey" FOREIGN KEY ("shop_id") REFERENCES "shops"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
