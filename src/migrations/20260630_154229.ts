import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TYPE "public"."enum_header_nav_groups_columns_links_type" ADD VALUE 'page' BEFORE 'custom';
  ALTER TYPE "public"."enum_footer_columns_links_type" ADD VALUE 'page' BEFORE 'custom';
  ALTER TABLE "header_nav_groups_columns_links" ADD COLUMN "page_ref_id" integer;
  ALTER TABLE "footer_columns_links" ADD COLUMN "page_ref_id" integer;
  ALTER TABLE "header_nav_groups_columns_links" ADD CONSTRAINT "header_nav_groups_columns_links_page_ref_id_pages_id_fk" FOREIGN KEY ("page_ref_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "footer_columns_links" ADD CONSTRAINT "footer_columns_links_page_ref_id_pages_id_fk" FOREIGN KEY ("page_ref_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "header_nav_groups_columns_links_page_ref_idx" ON "header_nav_groups_columns_links" USING btree ("page_ref_id");
  CREATE INDEX "footer_columns_links_page_ref_idx" ON "footer_columns_links" USING btree ("page_ref_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "header_nav_groups_columns_links" DROP CONSTRAINT "header_nav_groups_columns_links_page_ref_id_pages_id_fk";
  
  ALTER TABLE "footer_columns_links" DROP CONSTRAINT "footer_columns_links_page_ref_id_pages_id_fk";
  
  ALTER TABLE "header_nav_groups_columns_links" ALTER COLUMN "type" SET DATA TYPE text;
  ALTER TABLE "header_nav_groups_columns_links" ALTER COLUMN "type" SET DEFAULT 'category'::text;
  DROP TYPE "public"."enum_header_nav_groups_columns_links_type";
  CREATE TYPE "public"."enum_header_nav_groups_columns_links_type" AS ENUM('category', 'custom');
  ALTER TABLE "header_nav_groups_columns_links" ALTER COLUMN "type" SET DEFAULT 'category'::"public"."enum_header_nav_groups_columns_links_type";
  ALTER TABLE "header_nav_groups_columns_links" ALTER COLUMN "type" SET DATA TYPE "public"."enum_header_nav_groups_columns_links_type" USING "type"::"public"."enum_header_nav_groups_columns_links_type";
  ALTER TABLE "footer_columns_links" ALTER COLUMN "type" SET DATA TYPE text;
  ALTER TABLE "footer_columns_links" ALTER COLUMN "type" SET DEFAULT 'category'::text;
  DROP TYPE "public"."enum_footer_columns_links_type";
  CREATE TYPE "public"."enum_footer_columns_links_type" AS ENUM('category', 'custom');
  ALTER TABLE "footer_columns_links" ALTER COLUMN "type" SET DEFAULT 'category'::"public"."enum_footer_columns_links_type";
  ALTER TABLE "footer_columns_links" ALTER COLUMN "type" SET DATA TYPE "public"."enum_footer_columns_links_type" USING "type"::"public"."enum_footer_columns_links_type";
  DROP INDEX "header_nav_groups_columns_links_page_ref_idx";
  DROP INDEX "footer_columns_links_page_ref_idx";
  ALTER TABLE "header_nav_groups_columns_links" DROP COLUMN "page_ref_id";
  ALTER TABLE "footer_columns_links" DROP COLUMN "page_ref_id";`)
}
