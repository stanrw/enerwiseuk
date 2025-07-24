import { pgTable, text, serial, integer, boolean, timestamp, decimal, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Customer accounts
export const customers = pgTable("customers", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  phone: text("phone"),
  isEmailVerified: boolean("is_email_verified").default(false),
  emailVerificationToken: text("email_verification_token"),
  emailVerificationExpires: timestamp("email_verification_expires"),
  passwordResetToken: text("password_reset_token"),
  passwordResetExpires: timestamp("password_reset_expires"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Installer accounts  
export const installerAccounts = pgTable("installer_accounts", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  companyName: text("company_name").notNull(),
  contactName: text("contact_name").notNull(),
  phone: text("phone").notNull(),
  installerId: integer("installer_id").references(() => installers.id),
  isApproved: boolean("is_approved").default(false),
  isEmailVerified: boolean("is_email_verified").default(false),
  emailVerificationToken: text("email_verification_token"),
  emailVerificationExpires: timestamp("email_verification_expires"),
  passwordResetToken: text("password_reset_token"),
  passwordResetExpires: timestamp("password_reset_expires"),
  credits: integer("credits").default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

// Legacy users table (kept for compatibility)
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const properties = pgTable("properties", {
  id: serial("id").primaryKey(),
  address: text("address").notNull(),
  postcode: text("postcode").notNull(),
  smartMeterNumber: text("smart_meter_number"),
  propertyType: text("property_type").notNull(), // house, flat, bungalow
  bedrooms: integer("bedrooms").notNull(),
  currentEnergyUsage: integer("current_energy_usage"), // kWh per year
  roofArea: decimal("roof_area"), // square meters
  roofOrientation: text("roof_orientation"), // south, north, east, west, mixed
  shadingLevel: text("shading_level"), // none, low, medium, high
  createdAt: timestamp("created_at").defaultNow(),
});

export const assessments = pgTable("assessments", {
  id: serial("id").primaryKey(),
  propertyId: integer("property_id").references(() => properties.id),
  solarRecommendation: jsonb("solar_recommendation"), // SystemRecommendation
  batteryRecommendation: jsonb("battery_recommendation"), // SystemRecommendation
  heatPumpRecommendation: jsonb("heat_pump_recommendation"), // SystemRecommendation
  evChargerRecommendation: jsonb("ev_charger_recommendation"), // SystemRecommendation
  totalSavings: decimal("total_savings"),
  totalCost: decimal("total_cost"),
  paybackPeriod: decimal("payback_period"),
  carbonSavings: decimal("carbon_savings"), // tonnes CO2 per year
  createdAt: timestamp("created_at").defaultNow(),
});

export const leads = pgTable("leads", {
  id: serial("id").primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  address: text("address").notNull(),
  interests: text("interests").array(), // solar, battery, heat_pump, ev_charger
  source: text("source").notNull(), // assessment, contact_form, orla_chat
  status: text("status").notNull().default("new"), // new, qualified, contacted, converted
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const installers = pgTable("installers", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  rating: decimal("rating").notNull(),
  reviewCount: integer("review_count").notNull(),
  certifications: text("certifications").array(),
  specialties: text("specialties").array(), // solar, battery, heat_pump, ev_charger
  serviceAreas: text("service_areas").array(), // postcodes or regions
  contactEmail: text("contact_email").notNull(),
  contactPhone: text("contact_phone").notNull(),
  website: text("website"),
  isActive: boolean("is_active").default(true),
  // Service area management fields
  hqAddress: text("hq_address"), // Headquarters address
  hqPostcode: text("hq_postcode"), // HQ postcode for mapping
  hqLatitude: decimal("hq_latitude"), // HQ coordinates for distance calculations
  hqLongitude: decimal("hq_longitude"),
  serviceRadius: integer("service_radius").default(30), // Service radius in miles
  maxServiceRadius: integer("max_service_radius").default(50), // Maximum allowed radius based on subscription
  subscriptionTier: text("subscription_tier").default("basic"), // basic, standard, premium
  radiusUpgradeEndDate: timestamp("radius_upgrade_end_date"), // When paid upgrade expires
  additionalServiceAreas: jsonb("additional_service_areas"), // Array of {postcode, lat, lng, radius} for extra regions
});

export const articles = pgTable("articles", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  excerpt: text("excerpt").notNull(),
  content: text("content").notNull(),
  category: text("category").notNull(), // solar, battery, heat_pump, ev_charger, general
  imageUrl: text("image_url"),
  isPublished: boolean("is_published").default(true),
  publishedAt: timestamp("published_at").defaultNow(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const chatMessages = pgTable("chat_messages", {
  id: serial("id").primaryKey(),
  sessionId: text("session_id").notNull(),
  message: text("message").notNull(),
  isFromUser: boolean("is_from_user").notNull(),
  timestamp: timestamp("timestamp").defaultNow(),
});

// Customer Journey Tables
export const quotes = pgTable("quotes", {
  id: serial("id").primaryKey(),
  leadId: integer("lead_id").references(() => leads.id),
  propertyId: integer("property_id").references(() => properties.id),
  installerId: integer("installer_id").references(() => installers.id),
  systemType: text("system_type").notNull(), // solar, battery, heat_pump, ev_charger
  systemSpecs: jsonb("system_specs"),
  totalCost: decimal("total_cost").notNull(),
  installationTimeframe: text("installation_timeframe"),
  warrantyDetails: text("warranty_details"),
  status: text("status").notNull().default("draft"), // draft, submitted, accepted, rejected
  validUntil: timestamp("valid_until"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const installations = pgTable("installations", {
  id: serial("id").primaryKey(),
  quoteId: integer("quote_id").references(() => quotes.id),
  installerId: integer("installer_id").references(() => installers.id),
  customerId: integer("customer_id").references(() => leads.id),
  status: text("status").notNull().default("scheduled"), // scheduled, in_progress, completed, cancelled
  scheduledDate: timestamp("scheduled_date"),
  completionDate: timestamp("completion_date"),
  installationNotes: text("installation_notes"),
  customerSatisfactionRating: integer("customer_satisfaction_rating"), // 1-5
  customerFeedback: text("customer_feedback"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Installer Journey Tables
export const installerProfiles = pgTable("installer_profiles", {
  id: serial("id").primaryKey(),
  installerId: integer("installer_id").references(() => installers.id),
  companySize: text("company_size"), // small, medium, large
  yearsInBusiness: integer("years_in_business"),
  insuranceDetails: jsonb("insurance_details"),
  creditsBalance: integer("credits_balance").default(0),
  subscriptionTier: text("subscription_tier").default("basic"), // basic, premium, enterprise
  isVerified: boolean("is_verified").default(false),
  verificationDate: timestamp("verification_date"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const tenderPacks = pgTable("tender_packs", {
  id: serial("id").primaryKey(),
  leadId: integer("lead_id").references(() => leads.id),
  propertyId: integer("property_id").references(() => properties.id),
  systemRequirements: jsonb("system_requirements"),
  customerBudget: decimal("customer_budget"),
  preferredTimeframe: text("preferred_timeframe"),
  additionalRequirements: text("additional_requirements"),
  status: text("status").notNull().default("active"), // active, closed, expired
  expiryDate: timestamp("expiry_date"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const tenderResponses = pgTable("tender_responses", {
  id: serial("id").primaryKey(),
  tenderPackId: integer("tender_pack_id").references(() => tenderPacks.id),
  installerId: integer("installer_id").references(() => installers.id),
  quoteId: integer("quote_id").references(() => quotes.id),
  proposalDetails: jsonb("proposal_details"),
  estimatedPrice: decimal("estimated_price"),
  proposedTimeframe: text("proposed_timeframe"),
  status: text("status").notNull().default("submitted"), // submitted, shortlisted, selected, rejected
  submittedAt: timestamp("submitted_at").defaultNow(),
});

// System Process Tables
export const emailNotifications = pgTable("email_notifications", {
  id: serial("id").primaryKey(),
  recipientEmail: text("recipient_email").notNull(),
  recipientType: text("recipient_type").notNull(), // customer, installer, admin
  subject: text("subject").notNull(),
  content: text("content").notNull(),
  templateType: text("template_type"), // quote_request, installation_update, etc.
  status: text("status").notNull().default("pending"), // pending, sent, failed
  sentAt: timestamp("sent_at"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const creditTransactions = pgTable("credit_transactions", {
  id: serial("id").primaryKey(),
  installerId: integer("installer_id").references(() => installers.id),
  transactionType: text("transaction_type").notNull(), // purchase, spend, refund
  creditsAmount: integer("credits_amount").notNull(),
  costPerCredit: decimal("cost_per_credit"), // £1.25 per credit
  totalCost: decimal("total_cost"),
  description: text("description"),
  relatedTenderPackId: integer("related_tender_pack_id").references(() => tenderPacks.id),
  createdAt: timestamp("created_at").defaultNow(),
});

// Service area upgrade transactions
export const serviceAreaUpgrades = pgTable("service_area_upgrades", {
  id: serial("id").primaryKey(),
  installerId: integer("installer_id").references(() => installers.id).notNull(),
  upgradeType: text("upgrade_type").notNull(), // radius_increase, additional_region, premium_tier
  oldValue: integer("old_value"), // Previous radius or tier level
  newValue: integer("new_value"), // New radius or tier level
  price: decimal("price").notNull(), // Cost of upgrade
  duration: integer("duration").notNull(), // Duration in months
  startDate: timestamp("start_date").defaultNow(),
  endDate: timestamp("end_date").notNull(),
  paymentStatus: text("payment_status").default("pending"), // pending, completed, failed
  stripePaymentIntentId: text("stripe_payment_intent_id"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Revenue Stream Tables
export const financingApplications = pgTable("financing_applications", {
  id: serial("id").primaryKey(),
  customerId: integer("customer_id").references(() => leads.id),
  quoteId: integer("quote_id").references(() => quotes.id),
  loanAmount: decimal("loan_amount").notNull(),
  applicationStatus: text("application_status").notNull().default("pending"), // pending, approved, rejected
  referralFee: decimal("referral_fee"), // 0.5% of loan value
  financeProvider: text("finance_provider"),
  applicationData: jsonb("application_data"),
  submittedAt: timestamp("submitted_at").defaultNow(),
  processedAt: timestamp("processed_at"),
});

// Authentication schemas
export const insertCustomerSchema = createInsertSchema(customers).omit({
  id: true,
  createdAt: true,
});

export const insertInstallerAccountSchema = createInsertSchema(installerAccounts).omit({
  id: true,
  createdAt: true,
});

export const insertServiceAreaUpgradeSchema = createInsertSchema(serviceAreaUpgrades).omit({
  id: true,
  createdAt: true,
});

export const customerRegistrationSchema = insertCustomerSchema;
export const customerLoginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const installerRegistrationSchema = insertInstallerAccountSchema.omit({
  installerId: true,
  isApproved: true,
  credits: true,
});
export const installerLoginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

// Insert schemas
export const insertPropertySchema = createInsertSchema(properties).omit({
  id: true,
  createdAt: true,
});

export const insertAssessmentSchema = createInsertSchema(assessments).omit({
  id: true,
  createdAt: true,
});

export const insertLeadSchema = createInsertSchema(leads).omit({
  id: true,
  createdAt: true,
});

export const insertInstallerSchema = createInsertSchema(installers).omit({
  id: true,
});

export const insertArticleSchema = createInsertSchema(articles).omit({
  id: true,
  createdAt: true,
  publishedAt: true,
});

export const insertChatMessageSchema = createInsertSchema(chatMessages).omit({
  id: true,
  timestamp: true,
});

// New insert schemas
export const insertQuoteSchema = createInsertSchema(quotes).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertInstallationSchema = createInsertSchema(installations).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertInstallerProfileSchema = createInsertSchema(installerProfiles).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertTenderPackSchema = createInsertSchema(tenderPacks).omit({
  id: true,
  createdAt: true,
});

export const insertTenderResponseSchema = createInsertSchema(tenderResponses).omit({
  id: true,
  submittedAt: true,
});

export const insertEmailNotificationSchema = createInsertSchema(emailNotifications).omit({
  id: true,
  createdAt: true,
});

export const insertCreditTransactionSchema = createInsertSchema(creditTransactions).omit({
  id: true,
  createdAt: true,
});

export const insertFinancingApplicationSchema = createInsertSchema(financingApplications).omit({
  id: true,
  submittedAt: true,
});

// Article views tracking table
export const articleViews = pgTable("article_views", {
  id: serial("id").primaryKey(),
  articleId: text("article_id").notNull().unique(),
  viewCount: integer("view_count").default(0).notNull(),
  lastViewed: timestamp("last_viewed").defaultNow(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertArticleViewSchema = createInsertSchema(articleViews).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

// Property assessment input schema
export const propertyAssessmentSchema = z.object({
  address: z.string().min(1, "Address is required"),
  smartMeterNumber: z.string().optional(),
});

// Lead capture schema
export const leadCaptureSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(1, "Phone number is required"),
  address: z.string().min(1, "Address is required"),
  interests: z.array(z.string()).optional(),
});

// Authentication types
export type Customer = typeof customers.$inferSelect;
export type InsertCustomer = z.infer<typeof insertCustomerSchema>;
export type CustomerRegistration = z.infer<typeof customerRegistrationSchema>;
export type CustomerLogin = z.infer<typeof customerLoginSchema>;

export type InstallerAccount = typeof installerAccounts.$inferSelect;
export type InsertInstallerAccount = z.infer<typeof insertInstallerAccountSchema>;
export type InstallerRegistration = z.infer<typeof installerRegistrationSchema>;
export type InstallerLogin = z.infer<typeof installerLoginSchema>;

// Service area types
export type Installer = typeof installers.$inferSelect;
export type InsertInstaller = z.infer<typeof insertInstallerSchema>;
export type ServiceAreaUpgrade = typeof serviceAreaUpgrades.$inferSelect;
export type InsertServiceAreaUpgrade = z.infer<typeof insertServiceAreaUpgradeSchema>;

// Types
export type Property = typeof properties.$inferSelect;
export type InsertProperty = z.infer<typeof insertPropertySchema>;
export type Assessment = typeof assessments.$inferSelect;
export type InsertAssessment = z.infer<typeof insertAssessmentSchema>;
export type Lead = typeof leads.$inferSelect;
export type InsertLead = z.infer<typeof insertLeadSchema>;
export type Installer = typeof installers.$inferSelect;
export type InsertInstaller = z.infer<typeof insertInstallerSchema>;
export type Article = typeof articles.$inferSelect;
export type InsertArticle = z.infer<typeof insertArticleSchema>;
export type ChatMessage = typeof chatMessages.$inferSelect;
export type InsertChatMessage = z.infer<typeof insertChatMessageSchema>;

export type PropertyAssessmentInput = z.infer<typeof propertyAssessmentSchema>;
export type LeadCaptureInput = z.infer<typeof leadCaptureSchema>;

// New types
export type Quote = typeof quotes.$inferSelect;
export type InsertQuote = z.infer<typeof insertQuoteSchema>;
export type Installation = typeof installations.$inferSelect;
export type InsertInstallation = z.infer<typeof insertInstallationSchema>;
export type InstallerProfile = typeof installerProfiles.$inferSelect;
export type InsertInstallerProfile = z.infer<typeof insertInstallerProfileSchema>;
export type TenderPack = typeof tenderPacks.$inferSelect;
export type InsertTenderPack = z.infer<typeof insertTenderPackSchema>;
export type TenderResponse = typeof tenderResponses.$inferSelect;
export type InsertTenderResponse = z.infer<typeof insertTenderResponseSchema>;
export type EmailNotification = typeof emailNotifications.$inferSelect;
export type InsertEmailNotification = z.infer<typeof insertEmailNotificationSchema>;
export type CreditTransaction = typeof creditTransactions.$inferSelect;
export type InsertCreditTransaction = z.infer<typeof insertCreditTransactionSchema>;
export type FinancingApplication = typeof financingApplications.$inferSelect;
export type InsertFinancingApplication = z.infer<typeof insertFinancingApplicationSchema>;

export type ArticleView = typeof articleViews.$inferSelect;
export type InsertArticleView = z.infer<typeof insertArticleViewSchema>;

export interface SystemRecommendation {
  type: string;
  recommended: boolean;
  cost: number;
  annualSavings: number;
  paybackPeriod: number;
  carbonSavings: number;
  specifications: Record<string, any>;
  roi: number;
}
