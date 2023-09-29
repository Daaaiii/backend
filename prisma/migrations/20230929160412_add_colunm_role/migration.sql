-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "password" VARCHAR(100) NOT NULL,
    "role" INTEGER NOT NULL DEFAULT 1,
    "createdat" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updateat" TIMESTAMP(3),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);
