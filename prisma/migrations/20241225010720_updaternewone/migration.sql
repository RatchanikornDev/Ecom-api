/*
  Warnings:

  - You are about to drop the column `orderedId` on the `Cart` table. All the data in the column will be lost.
  - Added the required column `orderedById` to the `Cart` table without a default value. This is not possible if the table is not empty.
  - Added the required column `amount` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `currentcy` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stripePaymentId` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Made the column `role` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Cart" DROP CONSTRAINT "Cart_orderedId_fkey";

-- DropForeignKey
ALTER TABLE "ProductOnCart" DROP CONSTRAINT "ProductOnCart_cartId_fkey";

-- DropForeignKey
ALTER TABLE "ProductOnCart" DROP CONSTRAINT "ProductOnCart_productId_fkey";

-- AlterTable
ALTER TABLE "Cart" DROP COLUMN "orderedId",
ADD COLUMN     "orderedById" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "amount" INTEGER NOT NULL,
ADD COLUMN     "currentcy" TEXT NOT NULL,
ADD COLUMN     "status" TEXT NOT NULL,
ADD COLUMN     "stripePaymentId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "role" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_orderedById_fkey" FOREIGN KEY ("orderedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductOnCart" ADD CONSTRAINT "ProductOnCart_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "Cart"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductOnCart" ADD CONSTRAINT "ProductOnCart_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
