-- AlterEnum
ALTER TYPE "OrderStatusEnum" ADD VALUE 'Complete';

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "phone" SET DEFAULT '';
