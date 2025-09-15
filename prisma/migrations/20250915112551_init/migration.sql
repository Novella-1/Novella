-- CreateEnum
CREATE TYPE "public"."BookType" AS ENUM ('PAPERBACK', 'KINDLE', 'AUDIOBOOK');

-- CreateTable
CREATE TABLE "public"."Book" (
    "id" TEXT NOT NULL,
    "type" "public"."BookType" NOT NULL,
    "namespaceId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "priceRegular" DOUBLE PRECISION NOT NULL,
    "priceDiscount" DOUBLE PRECISION,
    "images" TEXT[],
    "langAvailable" TEXT[],
    "lang" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "publicationYear" INTEGER NOT NULL,
    "publication" TEXT NOT NULL,
    "description" TEXT[],

    CONSTRAINT "Book_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Category" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."BookCategory" (
    "bookId" TEXT NOT NULL,
    "categoryId" INTEGER NOT NULL,

    CONSTRAINT "BookCategory_pkey" PRIMARY KEY ("bookId","categoryId")
);

-- CreateTable
CREATE TABLE "public"."PaperDetails" (
    "bookId" TEXT NOT NULL,
    "coverType" TEXT NOT NULL,
    "numberOfPages" INTEGER NOT NULL,
    "format" TEXT NOT NULL,
    "illustrations" BOOLEAN NOT NULL,

    CONSTRAINT "PaperDetails_pkey" PRIMARY KEY ("bookId")
);

-- CreateTable
CREATE TABLE "public"."KindleDetails" (
    "bookId" TEXT NOT NULL,
    "numberOfPages" INTEGER NOT NULL,
    "format" TEXT NOT NULL,
    "illustrations" BOOLEAN NOT NULL,

    CONSTRAINT "KindleDetails_pkey" PRIMARY KEY ("bookId")
);

-- CreateTable
CREATE TABLE "public"."AudiobookDetails" (
    "bookId" TEXT NOT NULL,
    "narrator" TEXT NOT NULL,
    "listeningLength" BIGINT NOT NULL,

    CONSTRAINT "AudiobookDetails_pkey" PRIMARY KEY ("bookId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Book_slug_key" ON "public"."Book"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "public"."Category"("name");

-- AddForeignKey
ALTER TABLE "public"."BookCategory" ADD CONSTRAINT "BookCategory_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "public"."Book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."BookCategory" ADD CONSTRAINT "BookCategory_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "public"."Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."PaperDetails" ADD CONSTRAINT "PaperDetails_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "public"."Book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."KindleDetails" ADD CONSTRAINT "KindleDetails_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "public"."Book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."AudiobookDetails" ADD CONSTRAINT "AudiobookDetails_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "public"."Book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
