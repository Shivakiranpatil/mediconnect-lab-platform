import { pgTable, text, serial, integer, boolean, timestamp, uuid, decimal, jsonb, time, date } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// --- Users & Auth ---
export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  role: text("role").default("user"), // user, admin, lab_admin
  name: text("name"),
  createdAt: timestamp("created_at").defaultNow(),
});

// --- Partner Labs ---
export const partnerLabs = pgTable("partner_labs", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  slug: text("slug").unique(),
  logoUrl: text("logo_url"),
  description: text("description"),
  emirate: text("emirate"),
  status: text("status").default("active"),
  avgConfirmationHours: decimal("avg_confirmation_hours").default("2"),
  rating: decimal("rating").default("4.5"),
  totalReviews: integer("total_reviews").default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

// --- Tests & Bundles ---
export const tests = pgTable("tests", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  description: text("description"),
  category: text("category"),
  biomarkers: jsonb("biomarkers").default([]),
  preparation: text("preparation"),
  turnaroundHours: integer("turnaround_hours").default(24),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

export const bundles = pgTable("bundles", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  slug: text("slug").unique(),
  description: text("description"),
  shortDescription: text("short_description"),
  category: text("category"),
  tags: jsonb("tags").default([]),
  icon: text("icon").default("activity"),
  color: text("color").default("blue"),
  basePrice: decimal("base_price").notNull(),
  isPopular: boolean("is_popular").default(false),
  isActive: boolean("is_active").default(true),
  sortOrder: integer("sort_order").default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

export const bundleTests = pgTable("bundle_tests", {
  id: uuid("id").primaryKey().defaultRandom(),
  bundleId: uuid("bundle_id").references(() => bundles.id),
  testId: uuid("test_id").references(() => tests.id),
});

// --- Lab details ---
export const labZones = pgTable("lab_zones", {
  id: uuid("id").primaryKey().defaultRandom(),
  labId: uuid("lab_id").references(() => partnerLabs.id),
  city: text("city").notNull(),
  area: text("area").notNull(),
  isActive: boolean("is_active").default(true),
});

export const labHours = pgTable("lab_hours", {
  id: uuid("id").primaryKey().defaultRandom(),
  labId: uuid("lab_id").references(() => partnerLabs.id),
  dayOfWeek: integer("day_of_week").notNull(), // 0-6
  openTime: time("open_time").notNull(),
  closeTime: time("close_time").notNull(),
  isActive: boolean("is_active").default(true),
});

export const labBundlePricing = pgTable("lab_bundle_pricing", {
  id: uuid("id").primaryKey().defaultRandom(),
  labId: uuid("lab_id").references(() => partnerLabs.id),
  bundleId: uuid("bundle_id").references(() => bundles.id),
  price: decimal("price").notNull(),
  homeCollectionFee: decimal("home_collection_fee").default("50"),
  isActive: boolean("is_active").default(true),
});

// --- Appointments ---
export const appointments = pgTable("appointments", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").references(() => users.id),
  labId: uuid("lab_id").references(() => partnerLabs.id),
  bundleId: uuid("bundle_id").references(() => bundles.id),
  status: text("status").default("pending"), // pending, confirmed, collected, completed, cancelled
  appointmentTime: timestamp("appointment_time"),
  address: text("address"),
  city: text("city"),
  totalPrice: decimal("total_price"),
  paymentStatus: text("payment_status").default("pending"),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow(),
});

// --- AI & Discovery ---
export const aiRuleSets = pgTable("ai_rule_sets", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  isActive: boolean("is_active").default(true),
  maxBundles: integer("max_bundles").default(3),
  disclaimerText: text("disclaimer_text"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const aiQuestions = pgTable("ai_questions", {
  id: uuid("id").primaryKey().defaultRandom(),
  ruleSetId: uuid("rule_set_id").references(() => aiRuleSets.id),
  questionKey: text("question_key").notNull(),
  questionText: text("question_text").notNull(),
  questionType: text("question_type").default("single"),
  options: jsonb("options").notNull(),
  helperText: text("helper_text"),
  icon: text("icon"),
  sortOrder: integer("sort_order").default(0),
});

export const aiMappingRules = pgTable("ai_mapping_rules", {
  id: uuid("id").primaryKey().defaultRandom(),
  ruleSetId: uuid("rule_set_id").references(() => aiRuleSets.id),
  name: text("name").notNull(),
  conditions: jsonb("conditions").notNull(),
  recommendedBundleIds: jsonb("recommended_bundle_ids").notNull(),
  reasonTemplate: text("reason_template"),
  priority: integer("priority").default(0),
});

// --- Relations ---
export const bundlesRelations = relations(bundles, ({ many }) => ({
  bundleTests: many(bundleTests),
}));

export const testsRelations = relations(tests, ({ many }) => ({
  bundleTests: many(bundleTests),
}));

export const bundleTestsRelations = relations(bundleTests, ({ one }) => ({
  bundle: one(bundles, { fields: [bundleTests.bundleId], references: [bundles.id] }),
  test: one(tests, { fields: [bundleTests.testId], references: [tests.id] }),
}));

// --- Schemas ---
export const insertUserSchema = createInsertSchema(users).omit({ id: true, createdAt: true });
export const insertAppointmentSchema = createInsertSchema(appointments).omit({ id: true, createdAt: true, status: true, paymentStatus: true });
export const insertBundleSchema = createInsertSchema(bundles).omit({ id: true, createdAt: true });
export const insertTestSchema = createInsertSchema(tests).omit({ id: true, createdAt: true });

// --- Types ---
export type User = typeof users.$inferSelect;
export type Bundle = typeof bundles.$inferSelect;
export type Test = typeof tests.$inferSelect;
export type Appointment = typeof appointments.$inferSelect;
export type PartnerLab = typeof partnerLabs.$inferSelect;
export type AiQuestion = typeof aiQuestions.$inferSelect;
export type AiRuleSet = typeof aiRuleSets.$inferSelect;
export type AiMappingRule = typeof aiMappingRules.$inferSelect;

export type InsertUser = z.infer<typeof insertUserSchema>;
export type InsertAppointment = z.infer<typeof insertAppointmentSchema>;
