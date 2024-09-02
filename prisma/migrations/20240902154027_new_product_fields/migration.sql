-- CreateEnum
CREATE TYPE "ProductMaterials" AS ENUM ('STEEL', 'LEATHER', 'GLASS', 'THREADS');

-- CreateEnum
CREATE TYPE "ProductColors" AS ENUM ('RED', 'GREEN', 'YELLOW', 'PURPLE', 'BLACK', 'WHITE');

-- CreateEnum
CREATE TYPE "ProductCategories" AS ENUM ('PICTURE', 'SHOES', 'WALLET', 'CARPET');

-- AlterTable
ALTER TABLE "products" ADD COLUMN     "categories" "ProductCategories"[],
ADD COLUMN     "colors" "ProductColors"[],
ADD COLUMN     "materials" "ProductMaterials"[],
ADD COLUMN     "on_stock" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "size" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "shops" ADD COLUMN     "rating" DOUBLE PRECISION NOT NULL DEFAULT 0;
