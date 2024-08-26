-- CreateEnum
CREATE TYPE "Roles" AS ENUM ('USER', 'ADMIN');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "roles" "Roles"[] DEFAULT ARRAY['USER']::"Roles"[];
