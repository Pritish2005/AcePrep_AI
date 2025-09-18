import { pgTable, text, varchar, uuid, serial } from "drizzle-orm/pg-core";

export const MockInterview= pgTable("mock_interview", {
  id: serial('id').primaryKey(),

  json_mock_resp: text("json_mock_resp").notNull(),
  job_position: varchar("job_position").notNull(),
  job_desc: varchar("job_desc").notNull(),
  job_experience: varchar("job_experience").notNull(),

  created_by: varchar("created_by").notNull(),
  created_at: varchar("created_at"),

  mock_id: uuid("mock_id").defaultRandom().notNull().unique(),
});

export const userAnswer = pgTable("user_answer", {
  id: uuid("id").defaultRandom().primaryKey(),

  mock_id_ref: varchar("mock_id_ref").notNull(),
  question: varchar("question").notNull(),
  correct_ans: text("correct_ans"),
  user_ans: text("user_ans"),
  feedback: text("feedback"),
  rating: varchar("rating"),
  user_email: varchar("user_email"),
  created_at: varchar("created_at"),
});

