CREATE TABLE "notes" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"title" text,
	"is_pinned" boolean DEFAULT false,
	"is_archived" boolean DEFAULT false,
	"is_trashed" boolean DEFAULT false,
	"content" text DEFAULT '',
	"created_at" text DEFAULT '2025-07-14T14:56:27.375Z',
	"updated_at" text DEFAULT '2025-07-14T14:56:27.376Z',
	"color" text DEFAULT 'transparent'
);
