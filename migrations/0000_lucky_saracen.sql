CREATE TABLE IF NOT EXISTS "mock_interview" (
	"id" serial PRIMARY KEY NOT NULL,
	"json_mock_resp" text NOT NULL,
	"job_position" varchar NOT NULL,
	"job_desc" varchar NOT NULL,
	"job_experience" varchar NOT NULL,
	"created_by" varchar NOT NULL,
	"created_at" varchar,
	"mock_id" uuid DEFAULT gen_random_uuid() NOT NULL,
	CONSTRAINT "mock_interview_mock_id_unique" UNIQUE("mock_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user_answer" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"mock_id_ref" varchar NOT NULL,
	"question" varchar NOT NULL,
	"correct_ans" text,
	"user_ans" text,
	"feedback" text,
	"rating" varchar,
	"user_email" varchar,
	"created_at" varchar
);
