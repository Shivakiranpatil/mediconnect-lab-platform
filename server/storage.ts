import { 
  users, bundles, tests, appointments, partnerLabs, aiQuestions, aiRuleSets, aiMappingRules, bundleTests,
  type User, type InsertUser, type Bundle, type Test, type Appointment, type InsertAppointment, type PartnerLab, type AiQuestion, type AiRuleSet, type AiMappingRule
} from "@shared/schema";
import { db } from "./db";
import { eq, inArray } from "drizzle-orm";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Bundles
  getBundles(): Promise<Bundle[]>;
  getBundle(id: string): Promise<Bundle | undefined>;
  getBundlesBySlug(slugs: string[]): Promise<Bundle[]>;
  createBundle(bundle: any): Promise<Bundle>; // Type loose for seeding

  // AI
  getAiQuestions(): Promise<AiQuestion[]>;
  getAiMappingRules(): Promise<AiMappingRule[]>;
  
  // Appointments
  createAppointment(appt: InsertAppointment): Promise<Appointment>;
  getAppointments(userId: string): Promise<Appointment[]>;
  
  // Seeding support
  createTest(test: any): Promise<Test>;
  createAiQuestion(q: any): Promise<AiQuestion>;
  createAiRuleSet(rs: any): Promise<AiRuleSet>;
  createAiMappingRule(rule: any): Promise<AiMappingRule>;
  createPartnerLab(lab: any): Promise<PartnerLab>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  async getBundles(): Promise<Bundle[]> {
    return await db.select().from(bundles).where(eq(bundles.isActive, true));
  }

  async getBundle(id: string): Promise<Bundle | undefined> {
    const [bundle] = await db.select().from(bundles).where(eq(bundles.id, id));
    return bundle;
  }
  
  async getBundlesBySlug(slugs: string[]): Promise<Bundle[]> {
    if (slugs.length === 0) return [];
    return await db.select().from(bundles).where(inArray(bundles.slug, slugs));
  }

  async createBundle(bundle: any): Promise<Bundle> {
    const [b] = await db.insert(bundles).values(bundle).returning();
    return b;
  }

  async getAiQuestions(): Promise<AiQuestion[]> {
    return await db.select().from(aiQuestions).orderBy(aiQuestions.sortOrder);
  }
  
  async getAiMappingRules(): Promise<AiMappingRule[]> {
    return await db.select().from(aiMappingRules).orderBy(aiMappingRules.priority);
  }

  async createAppointment(appt: InsertAppointment): Promise<Appointment> {
    const [a] = await db.insert(appointments).values(appt).returning();
    return a;
  }

  async getAppointments(userId: string): Promise<Appointment[]> {
    return await db.select().from(appointments).where(eq(appointments.userId, userId));
  }

  // Seeding helpers
  async createTest(test: any): Promise<Test> {
    const [t] = await db.insert(tests).values(test).returning();
    return t;
  }
  
  async createAiQuestion(q: any): Promise<AiQuestion> {
    const [res] = await db.insert(aiQuestions).values(q).returning();
    return res;
  }
  
  async createAiRuleSet(rs: any): Promise<AiRuleSet> {
    const [res] = await db.insert(aiRuleSets).values(rs).returning();
    return res;
  }
  
  async createAiMappingRule(rule: any): Promise<AiMappingRule> {
    const [res] = await db.insert(aiMappingRules).values(rule).returning();
    return res;
  }
  
  async createPartnerLab(lab: any): Promise<PartnerLab> {
    const [res] = await db.insert(partnerLabs).values(lab).returning();
    return res;
  }
}

export const storage = new DatabaseStorage();
