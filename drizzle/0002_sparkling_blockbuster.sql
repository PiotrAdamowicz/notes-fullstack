ALTER TABLE "notes" ALTER COLUMN "createdAt" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "notes" ALTER COLUMN "updatedAt" SET DEFAULT now();