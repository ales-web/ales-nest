-- CreateEnum
CREATE TYPE "ShopTag" AS ENUM ('ARTS', 'BAGS', 'TOYS', 'TEXTILE', 'DISHES', 'GIFTS', 'INSTRUMENTS', 'SUBCULTURE', 'ZOO', 'ACCESSORIES');

-- CreateTable
CREATE TABLE "shops" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "tags" "ShopTag"[],
    "logo" TEXT NOT NULL DEFAULT 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSz0NrSPiJX6g97BHInfVmqIUwgNgACgvIx-Q&s',
    "main_products_logo" TEXT[] DEFAULT ARRAY['https://cs5.livemaster.ru/storage/1d/de/6475bf290c8ffcf4e73802a794ra--ukrasheniya-kole-s-podveskoj-tigrovyj-glaz.jpg', 'https://cs5.livemaster.ru/storage/4c/d1/0204ad5ecf751a8c90fec84dcbuj--podarki-k-prazdnikam-huyumbula.jpg', 'https://cs1.livemaster.ru/storage/04/cb/618fda29cc642232c093b1e329o3--suveniry-i-podarki-neftyanik-1.jpg']::TEXT[],
    "promo" BOOLEAN NOT NULL,
    "owner_id" INTEGER NOT NULL,
    "products" TEXT[],
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "shops_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "shops" ADD CONSTRAINT "shops_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
