import { 
  properties, 
  assessments, 
  leads, 
  installers, 
  articles, 
  chatMessages,
  quotes,
  installations,
  installerProfiles,
  tenderPacks,
  tenderResponses,
  emailNotifications,
  creditTransactions,
  financingApplications,
  customers,
  installerAccounts,
  serviceAreaUpgrades,
  type Property, 
  type InsertProperty, 
  type Assessment,
  type InsertAssessment,
  type Lead,
  type InsertLead,
  type Installer,
  type InsertInstaller,
  type Article,
  type InsertArticle,
  type ChatMessage,
  type InsertChatMessage,
  type Quote,
  type InsertQuote,
  type Installation,
  type InsertInstallation,
  type InstallerProfile,
  type InsertInstallerProfile,
  type TenderPack,
  type InsertTenderPack,
  type TenderResponse,
  type InsertTenderResponse,
  type EmailNotification,
  type InsertEmailNotification,
  type CreditTransaction,
  type InsertCreditTransaction,
  type FinancingApplication,
  type InsertFinancingApplication,
  type Customer,
  type InsertCustomer,
  type InstallerAccount,
  type InsertInstallerAccount,
  type ServiceAreaUpgrade,
  type InsertServiceAreaUpgrade,
  type SystemRecommendation
} from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  // Authentication
  createCustomer(customer: InsertCustomer): Promise<Customer>;
  getCustomerByEmail(email: string): Promise<Customer | undefined>;
  getCustomer(id: number): Promise<Customer | undefined>;
  updateCustomerVerification(id: number, isVerified: boolean): Promise<Customer | undefined>;
  setCustomerVerificationToken(email: string, token: string, expires: Date): Promise<Customer | undefined>;
  verifyCustomerByToken(token: string): Promise<Customer | undefined>;
  setCustomerPasswordResetToken(email: string, token: string, expires: Date): Promise<Customer | undefined>;
  resetCustomerPasswordByToken(token: string, newPassword: string): Promise<Customer | undefined>;
  
  createInstallerAccount(account: InsertInstallerAccount): Promise<InstallerAccount>;
  getInstallerAccountByEmail(email: string): Promise<InstallerAccount | undefined>;
  getInstallerAccount(id: number): Promise<InstallerAccount | undefined>;
  updateInstallerVerification(id: number, isVerified: boolean): Promise<InstallerAccount | undefined>;
  setInstallerVerificationToken(email: string, token: string, expires: Date): Promise<InstallerAccount | undefined>;
  verifyInstallerByToken(token: string): Promise<InstallerAccount | undefined>;
  setInstallerPasswordResetToken(email: string, token: string, expires: Date): Promise<InstallerAccount | undefined>;
  resetInstallerPasswordByToken(token: string, newPassword: string): Promise<InstallerAccount | undefined>;
  
  // Properties
  createProperty(property: InsertProperty): Promise<Property>;
  getProperty(id: number): Promise<Property | undefined>;
  getPropertyByAddress(address: string): Promise<Property | undefined>;
  
  // Assessments
  createAssessment(assessment: InsertAssessment): Promise<Assessment>;
  getAssessment(id: number): Promise<Assessment | undefined>;
  getAssessmentByPropertyId(propertyId: number): Promise<Assessment | undefined>;
  
  // Leads
  createLead(lead: InsertLead): Promise<Lead>;
  getAllLeads(): Promise<Lead[]>;
  getLeadById(id: number): Promise<Lead | undefined>;
  updateLeadStatus(id: number, status: string): Promise<Lead | undefined>;
  
  // Installers
  getAllInstallers(): Promise<Installer[]>;
  getInstallersBySpecialty(specialty: string): Promise<Installer[]>;
  getInstallersByPostcode(postcode: string): Promise<Installer[]>;
  getInstaller(id: number): Promise<Installer | undefined>;
  
  // Articles
  getAllArticles(): Promise<Article[]>;
  getArticlesByCategory(category: string): Promise<Article[]>;
  getArticleBySlug(slug: string): Promise<Article | undefined>;
  
  // Chat Messages
  saveChatMessage(message: InsertChatMessage): Promise<ChatMessage>;
  getChatMessages(sessionId: string): Promise<ChatMessage[]>;

  // Customer Journey - Quotes
  createQuote(quote: InsertQuote): Promise<Quote>;
  getQuote(id: number): Promise<Quote | undefined>;
  getQuotesByLead(leadId: number): Promise<Quote[]>;
  getQuotesByInstaller(installerId: number): Promise<Quote[]>;
  updateQuoteStatus(id: number, status: string): Promise<Quote | undefined>;

  // Customer Journey - Installations
  createInstallation(installation: InsertInstallation): Promise<Installation>;
  getInstallation(id: number): Promise<Installation | undefined>;
  getInstallationsByInstaller(installerId: number): Promise<Installation[]>;
  updateInstallationStatus(id: number, status: string): Promise<Installation | undefined>;
  completeInstallation(id: number, rating: number, feedback: string): Promise<Installation | undefined>;

  // Installer Journey - Profiles
  createInstallerProfile(profile: InsertInstallerProfile): Promise<InstallerProfile>;
  getInstallerProfile(installerId: number): Promise<InstallerProfile | undefined>;
  updateInstallerCredits(installerId: number, creditsChange: number): Promise<InstallerProfile | undefined>;

  // Installer Journey - Tender Packs
  createTenderPack(tenderPack: InsertTenderPack): Promise<TenderPack>;
  getTenderPack(id: number): Promise<TenderPack | undefined>;
  getActiveTenderPacks(): Promise<TenderPack[]>;
  getTenderPacksByPostcode(postcode: string): Promise<TenderPack[]>;
  closeTenderPack(id: number): Promise<TenderPack | undefined>;

  // Installer Journey - Tender Responses
  createTenderResponse(response: InsertTenderResponse): Promise<TenderResponse>;
  getTenderResponse(id: number): Promise<TenderResponse | undefined>;
  getTenderResponsesByPack(tenderPackId: number): Promise<TenderResponse[]>;
  getTenderResponsesByInstaller(installerId: number): Promise<TenderResponse[]>;
  updateTenderResponseStatus(id: number, status: string): Promise<TenderResponse | undefined>;

  // System Process - Email Notifications
  createEmailNotification(notification: InsertEmailNotification): Promise<EmailNotification>;
  getPendingEmailNotifications(): Promise<EmailNotification[]>;
  markEmailAsSent(id: number): Promise<EmailNotification | undefined>;

  // System Process - Credit Transactions
  createCreditTransaction(transaction: InsertCreditTransaction): Promise<CreditTransaction>;
  getCreditTransactionsByInstaller(installerId: number): Promise<CreditTransaction[]>;

  // Revenue Stream - Financing Applications
  createFinancingApplication(application: InsertFinancingApplication): Promise<FinancingApplication>;
  getFinancingApplication(id: number): Promise<FinancingApplication | undefined>;
  updateFinancingApplicationStatus(id: number, status: string): Promise<FinancingApplication | undefined>;

  // Service Area Management
  getInstallerById(id: number): Promise<Installer | undefined>;
  updateInstallerHQ(id: number, hqData: { hqAddress: string; hqPostcode: string; hqLatitude: number; hqLongitude: number }): Promise<Installer>;
  updateInstallerRadius(id: number, radius: number): Promise<Installer>;
  addInstallerServiceArea(id: number, serviceArea: { postcode: string; lat: number; lng: number; radius: number }): Promise<Installer>;
  createServiceAreaUpgrade(upgrade: InsertServiceAreaUpgrade): Promise<ServiceAreaUpgrade>;
  getActiveUpgrades(installerId: number): Promise<ServiceAreaUpgrade[]>;
}

export class DatabaseStorage implements IStorage {
  // Authentication methods
  async createCustomer(insertCustomer: InsertCustomer): Promise<Customer> {
    const [customer] = await db
      .insert(customers)
      .values(insertCustomer)
      .returning();
    return customer;
  }

  async getCustomerByEmail(email: string): Promise<Customer | undefined> {
    const [customer] = await db.select().from(customers)
      .where(eq(customers.email, email));
    return customer || undefined;
  }

  async getCustomer(id: number): Promise<Customer | undefined> {
    const [customer] = await db.select().from(customers)
      .where(eq(customers.id, id));
    return customer || undefined;
  }

  async createInstallerAccount(insertAccount: InsertInstallerAccount): Promise<InstallerAccount> {
    const [account] = await db
      .insert(installerAccounts)
      .values(insertAccount)
      .returning();
    return account;
  }

  async getInstallerAccountByEmail(email: string): Promise<InstallerAccount | undefined> {
    const [account] = await db.select().from(installerAccounts)
      .where(eq(installerAccounts.email, email));
    return account || undefined;
  }

  async getInstallerAccount(id: number): Promise<InstallerAccount | undefined> {
    const [account] = await db.select().from(installerAccounts)
      .where(eq(installerAccounts.id, id));
    return account || undefined;
  }

  // Customer email verification methods
  async updateCustomerVerification(id: number, isVerified: boolean): Promise<Customer | undefined> {
    const [customer] = await db
      .update(customers)
      .set({ 
        isEmailVerified: isVerified,
        emailVerificationToken: null,
        emailVerificationExpires: null
      })
      .where(eq(customers.id, id))
      .returning();
    return customer || undefined;
  }

  async setCustomerVerificationToken(email: string, token: string, expires: Date): Promise<Customer | undefined> {
    const [customer] = await db
      .update(customers)
      .set({ 
        emailVerificationToken: token,
        emailVerificationExpires: expires
      })
      .where(eq(customers.email, email))
      .returning();
    return customer || undefined;
  }

  async verifyCustomerByToken(token: string): Promise<Customer | undefined> {
    const [customer] = await db.select().from(customers)
      .where(eq(customers.emailVerificationToken, token));
      
    if (!customer || !customer.emailVerificationExpires) {
      return undefined;
    }
    
    // Check if token is expired
    if (customer.emailVerificationExpires < new Date()) {
      return undefined;
    }
    
    // Update verification status
    return await this.updateCustomerVerification(customer.id, true);
  }

  async setCustomerPasswordResetToken(email: string, token: string, expires: Date): Promise<Customer | undefined> {
    const [customer] = await db
      .update(customers)
      .set({ 
        passwordResetToken: token,
        passwordResetExpires: expires
      })
      .where(eq(customers.email, email))
      .returning();
    return customer || undefined;
  }

  async resetCustomerPasswordByToken(token: string, newPassword: string): Promise<Customer | undefined> {
    const [customer] = await db.select().from(customers)
      .where(eq(customers.passwordResetToken, token));
      
    if (!customer || !customer.passwordResetExpires) {
      return undefined;
    }
    
    // Check if token is expired
    if (customer.passwordResetExpires < new Date()) {
      return undefined;
    }
    
    // Update password and clear reset token
    const [updatedCustomer] = await db
      .update(customers)
      .set({ 
        password: newPassword,
        passwordResetToken: null,
        passwordResetExpires: null
      })
      .where(eq(customers.id, customer.id))
      .returning();
    return updatedCustomer || undefined;
  }

  // Installer email verification methods
  async updateInstallerVerification(id: number, isVerified: boolean): Promise<InstallerAccount | undefined> {
    const [account] = await db
      .update(installerAccounts)
      .set({ 
        isEmailVerified: isVerified,
        emailVerificationToken: null,
        emailVerificationExpires: null
      })
      .where(eq(installerAccounts.id, id))
      .returning();
    return account || undefined;
  }

  async setInstallerVerificationToken(email: string, token: string, expires: Date): Promise<InstallerAccount | undefined> {
    const [account] = await db
      .update(installerAccounts)
      .set({ 
        emailVerificationToken: token,
        emailVerificationExpires: expires
      })
      .where(eq(installerAccounts.email, email))
      .returning();
    return account || undefined;
  }

  async verifyInstallerByToken(token: string): Promise<InstallerAccount | undefined> {
    const [account] = await db.select().from(installerAccounts)
      .where(eq(installerAccounts.emailVerificationToken, token));
      
    if (!account || !account.emailVerificationExpires) {
      return undefined;
    }
    
    // Check if token is expired
    if (account.emailVerificationExpires < new Date()) {
      return undefined;
    }
    
    // Update verification status
    return await this.updateInstallerVerification(account.id, true);
  }

  async setInstallerPasswordResetToken(email: string, token: string, expires: Date): Promise<InstallerAccount | undefined> {
    const [account] = await db
      .update(installerAccounts)
      .set({ 
        passwordResetToken: token,
        passwordResetExpires: expires
      })
      .where(eq(installerAccounts.email, email))
      .returning();
    return account || undefined;
  }

  async resetInstallerPasswordByToken(token: string, newPassword: string): Promise<InstallerAccount | undefined> {
    const [account] = await db.select().from(installerAccounts)
      .where(eq(installerAccounts.passwordResetToken, token));
      
    if (!account || !account.passwordResetExpires) {
      return undefined;
    }
    
    // Check if token is expired  
    if (account.passwordResetExpires < new Date()) {
      return undefined;
    }
    
    // Update password and clear reset token
    const [updatedAccount] = await db
      .update(installerAccounts)
      .set({ 
        password: newPassword,
        passwordResetToken: null,
        passwordResetExpires: null
      })
      .where(eq(installerAccounts.id, account.id))
      .returning();
    return updatedAccount || undefined;
  }

  // Property methods
  async createProperty(insertProperty: InsertProperty): Promise<Property> {
    const [property] = await db
      .insert(properties)
      .values(insertProperty)
      .returning();
    return property;
  }

  async getProperty(id: number): Promise<Property | undefined> {
    const [property] = await db.select().from(properties).where(eq(properties.id, id));
    return property || undefined;
  }

  async getPropertyByAddress(address: string): Promise<Property | undefined> {
    const [property] = await db.select().from(properties)
      .where(eq(properties.address, address));
    return property || undefined;
  }

  // Assessment methods
  async createAssessment(insertAssessment: InsertAssessment): Promise<Assessment> {
    const [assessment] = await db
      .insert(assessments)
      .values(insertAssessment)
      .returning();
    return assessment;
  }

  async getAssessment(id: number): Promise<Assessment | undefined> {
    const [assessment] = await db.select().from(assessments).where(eq(assessments.id, id));
    return assessment || undefined;
  }

  async getAssessmentByPropertyId(propertyId: number): Promise<Assessment | undefined> {
    const [assessment] = await db.select().from(assessments)
      .where(eq(assessments.propertyId, propertyId));
    return assessment || undefined;
  }

  // Lead methods
  async createLead(insertLead: InsertLead): Promise<Lead> {
    const [lead] = await db
      .insert(leads)
      .values(insertLead)
      .returning();
    return lead;
  }

  async getAllLeads(): Promise<Lead[]> {
    return await db.select().from(leads);
  }

  async getLeadById(id: number): Promise<Lead | undefined> {
    const [lead] = await db.select().from(leads).where(eq(leads.id, id));
    return lead || undefined;
  }

  async updateLeadStatus(id: number, status: string): Promise<Lead | undefined> {
    const [lead] = await db
      .update(leads)
      .set({ status })
      .where(eq(leads.id, id))
      .returning();
    return lead || undefined;
  }

  // Installer methods
  async getAllInstallers(): Promise<Installer[]> {
    return await db.select().from(installers).where(eq(installers.isActive, true));
  }

  async getInstallersBySpecialty(specialty: string): Promise<Installer[]> {
    // Note: This is a simplified version. In production, you'd use proper array operations
    const allInstallers = await db.select().from(installers).where(eq(installers.isActive, true));
    return allInstallers.filter(installer => 
      installer.specialties?.includes(specialty)
    );
  }

  async getInstallersByPostcode(postcode: string): Promise<Installer[]> {
    const postcodePrefix = postcode.substring(0, 2).toUpperCase();
    const allInstallers = await db.select().from(installers).where(eq(installers.isActive, true));
    return allInstallers.filter(installer => 
      installer.serviceAreas?.some(area => area.startsWith(postcodePrefix))
    );
  }

  // Article methods
  async getAllArticles(): Promise<Article[]> {
    return await db.select().from(articles).where(eq(articles.isPublished, true));
  }

  async getArticlesByCategory(category: string): Promise<Article[]> {
    return await db.select().from(articles)
      .where(eq(articles.category, category));
  }

  async getArticleBySlug(slug: string): Promise<Article | undefined> {
    const [article] = await db.select().from(articles)
      .where(eq(articles.slug, slug));
    return article || undefined;
  }

  // Chat message methods
  async saveChatMessage(insertMessage: InsertChatMessage): Promise<ChatMessage> {
    const [message] = await db
      .insert(chatMessages)
      .values(insertMessage)
      .returning();
    return message;
  }

  async getChatMessages(sessionId: string): Promise<ChatMessage[]> {
    return await db.select().from(chatMessages)
      .where(eq(chatMessages.sessionId, sessionId))
      .orderBy(chatMessages.timestamp);
  }
}

export class MemStorage implements IStorage {
  private properties: Map<number, Property> = new Map();
  private assessments: Map<number, Assessment> = new Map();
  private leads: Map<number, Lead> = new Map();
  private installers: Map<number, Installer> = new Map();
  private articles: Map<number, Article> = new Map();
  private chatMessages: Map<number, ChatMessage> = new Map();
  private serviceAreaUpgrades: Map<number, ServiceAreaUpgrade> = new Map();
  private customers: Map<number, Customer> = new Map();
  private installerAccounts: Map<number, InstallerAccount> = new Map();
  
  private currentPropertyId = 1;
  private currentAssessmentId = 1;
  private currentLeadId = 1;
  private currentInstallerId = 1;
  private currentArticleId = 1;
  private currentChatMessageId = 1;
  private currentServiceAreaUpgradeId = 1;
  private currentCustomerId = 1;
  private currentInstallerAccountId = 1;

  constructor() {
    this.seedData();
  }

  private seedData() {
    // Seed installer accounts
    const installerAccountsData: InsertInstallerAccount[] = [
      {
        email: "test@installer.com",
        password: Buffer.from("password123").toString('base64'),
        companyName: "Test Solar Solutions",
        contactName: "John Installer",
        phone: "020 7123 4567",
        approvalStatus: "approved",
        businessType: "installer",
        mcsNumber: "MCS123456",
        certifications: ["MCS", "NICEIC"],
        specialties: ["solar", "battery", "heat_pump"],
      }
    ];

    installerAccountsData.forEach(account => {
      const id = this.currentInstallerAccountId++;
      this.installerAccounts.set(id, { 
        ...account, 
        id,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    });

    // Seed installers
    const installersData: InsertInstaller[] = [
      {
        name: "SolarTech Solutions",
        description: "Specializing in residential solar installations with 10+ years experience",
        rating: "4.9",
        reviewCount: 127,
        certifications: ["MCS Certified", "RECC Approved"],
        specialties: ["solar", "battery"],
        serviceAreas: ["SW1", "SW2", "SW3", "SW4", "SW5"],
        contactEmail: "contact@solartech.co.uk",
        contactPhone: "020 7123 4567",
        website: "https://solartech.co.uk",
        isActive: true,
      },
      {
        name: "GreenEnergy Pro",
        description: "Full renewable energy solutions including heat pumps and battery storage",
        rating: "4.8",
        reviewCount: 89,
        certifications: ["RECC Approved", "TrustMark Registered"],
        specialties: ["solar", "battery", "heat_pump"],
        serviceAreas: ["N1", "N2", "N3", "N4", "N5"],
        contactEmail: "info@greenenergypro.co.uk",
        contactPhone: "020 7234 5678",
        website: "https://greenenergypro.co.uk",
        isActive: true,
      },
      {
        name: "EcoHome Experts",
        description: "Award-winning installer with expertise in complex residential projects",
        rating: "4.9",
        reviewCount: 156,
        certifications: ["TrustMark Registered", "MCS Certified"],
        specialties: ["solar", "battery", "heat_pump", "ev_charger"],
        serviceAreas: ["E1", "E2", "E3", "E4", "E5"],
        contactEmail: "hello@ecohome.co.uk",
        contactPhone: "020 7345 6789",
        website: "https://ecohome.co.uk",
        isActive: true,
      }
    ];

    installersData.forEach(installer => {
      const id = this.currentInstallerId++;
      this.installers.set(id, { 
        ...installer, 
        id,
        // Service area management fields
        hqAddress: "123 Green Energy Way, London",
        hqPostcode: "SW1A 1AA",
        hqLatitude: 51.5074,
        hqLongitude: -0.1278,
        serviceRadius: 45,
        maxServiceRadius: 100,
        subscriptionTier: "premium",
        additionalServiceAreas: [
          { postcode: "M1 1AA", lat: 53.4808, lng: -2.2426, radius: 25 },
          { postcode: "B1 1AA", lat: 52.4862, lng: -1.8904, radius: 30 }
        ],
        createdAt: new Date(),
        updatedAt: new Date()
      });
    });

    // Seed articles
    const articlesData: InsertArticle[] = [
      {
        title: "Complete Guide to Solar Panel Installation",
        slug: "complete-guide-solar-panel-installation",
        excerpt: "Learn everything about the solar installation process, from initial assessment to system activation",
        content: "Solar panel installation is a comprehensive process that transforms your home into a renewable energy powerhouse...",
        category: "solar",
        imageUrl: "https://images.unsplash.com/photo-1509391366360-2e959784a276",
        isPublished: true,
      },
      {
        title: "Heat Pumps vs Gas Boilers: The Complete Comparison",
        slug: "heat-pumps-vs-gas-boilers-comparison",
        excerpt: "Compare costs, efficiency, and environmental impact to make the right heating choice",
        content: "When considering heating options for your home, the choice between heat pumps and gas boilers...",
        category: "heat_pump",
        imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64",
        isPublished: true,
      },
      {
        title: "Maximizing Solar Savings with Battery Storage",
        slug: "maximizing-solar-savings-battery-storage",
        excerpt: "Discover how battery storage can increase your energy independence and savings",
        content: "Battery storage systems are revolutionizing how homeowners use solar energy...",
        category: "battery",
        imageUrl: "https://images.unsplash.com/photo-1614624532983-4ce03382d63d",
        isPublished: true,
      }
    ];

    articlesData.forEach(article => {
      const id = this.currentArticleId++;
      this.articles.set(id, { 
        ...article, 
        id, 
        publishedAt: new Date(),
        createdAt: new Date()
      });
    });
  }

  // Authentication methods
  async createCustomer(insertCustomer: InsertCustomer): Promise<Customer> {
    const id = this.currentCustomerId++;
    const customer: Customer = {
      ...insertCustomer,
      id,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.customers.set(id, customer);
    return customer;
  }

  async getCustomerByEmail(email: string): Promise<Customer | undefined> {
    return Array.from(this.customers.values()).find(customer => customer.email === email);
  }

  async getCustomer(id: number): Promise<Customer | undefined> {
    return this.customers.get(id);
  }

  async createInstallerAccount(insertAccount: InstallerAccount): Promise<InstallerAccount> {
    const id = this.currentInstallerAccountId++;
    const account: InstallerAccount = {
      ...insertAccount,
      id,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.installerAccounts.set(id, account);
    return account;
  }

  async getInstallerAccountByEmail(email: string): Promise<InstallerAccount | undefined> {
    return Array.from(this.installerAccounts.values()).find(account => account.email === email);
  }

  async getInstallerAccount(id: number): Promise<InstallerAccount | undefined> {
    return this.installerAccounts.get(id);
  }

  // Property methods
  async createProperty(insertProperty: InsertProperty): Promise<Property> {
    const id = this.currentPropertyId++;
    const property: Property = {
      ...insertProperty,
      id,
      createdAt: new Date(),
    };
    this.properties.set(id, property);
    return property;
  }

  async getProperty(id: number): Promise<Property | undefined> {
    return this.properties.get(id);
  }

  async getPropertyByAddress(address: string): Promise<Property | undefined> {
    return Array.from(this.properties.values()).find(
      property => property.address.toLowerCase().includes(address.toLowerCase())
    );
  }

  // Assessment methods
  async createAssessment(insertAssessment: InsertAssessment): Promise<Assessment> {
    const id = this.currentAssessmentId++;
    const assessment: Assessment = {
      ...insertAssessment,
      id,
      createdAt: new Date(),
    };
    this.assessments.set(id, assessment);
    return assessment;
  }

  async getAssessment(id: number): Promise<Assessment | undefined> {
    return this.assessments.get(id);
  }

  async getAssessmentByPropertyId(propertyId: number): Promise<Assessment | undefined> {
    return Array.from(this.assessments.values()).find(
      assessment => assessment.propertyId === propertyId
    );
  }

  // Lead methods
  async createLead(insertLead: InsertLead): Promise<Lead> {
    const id = this.currentLeadId++;
    const lead: Lead = {
      ...insertLead,
      id,
      createdAt: new Date(),
    };
    this.leads.set(id, lead);
    return lead;
  }

  async getAllLeads(): Promise<Lead[]> {
    return Array.from(this.leads.values());
  }

  async getLeadById(id: number): Promise<Lead | undefined> {
    return this.leads.get(id);
  }

  async updateLeadStatus(id: number, status: string): Promise<Lead | undefined> {
    const lead = this.leads.get(id);
    if (lead) {
      lead.status = status;
      this.leads.set(id, lead);
      return lead;
    }
    return undefined;
  }

  // Installer methods
  async getAllInstallers(): Promise<Installer[]> {
    return Array.from(this.installers.values()).filter(installer => installer.isActive);
  }

  async getInstallersBySpecialty(specialty: string): Promise<Installer[]> {
    return Array.from(this.installers.values()).filter(
      installer => installer.isActive && installer.specialties?.includes(specialty)
    );
  }

  async getInstallersByPostcode(postcode: string): Promise<Installer[]> {
    const postcodePrefix = postcode.substring(0, 2).toUpperCase();
    return Array.from(this.installers.values()).filter(
      installer => installer.isActive && installer.serviceAreas?.some(area => area.startsWith(postcodePrefix))
    );
  }

  // Article methods
  async getAllArticles(): Promise<Article[]> {
    return Array.from(this.articles.values()).filter(article => article.isPublished);
  }

  async getArticlesByCategory(category: string): Promise<Article[]> {
    return Array.from(this.articles.values()).filter(
      article => article.isPublished && article.category === category
    );
  }

  async getArticleBySlug(slug: string): Promise<Article | undefined> {
    return Array.from(this.articles.values()).find(
      article => article.isPublished && article.slug === slug
    );
  }

  // Chat message methods
  async saveChatMessage(insertMessage: InsertChatMessage): Promise<ChatMessage> {
    const id = this.currentChatMessageId++;
    const message: ChatMessage = {
      ...insertMessage,
      id,
      timestamp: new Date(),
    };
    this.chatMessages.set(id, message);
    return message;
  }

  async getChatMessages(sessionId: string): Promise<ChatMessage[]> {
    return Array.from(this.chatMessages.values())
      .filter(message => message.sessionId === sessionId)
      .sort((a, b) => a.timestamp!.getTime() - b.timestamp!.getTime());
  }

  // Service Area Management methods
  async getInstallerById(id: number): Promise<Installer | undefined> {
    return this.installers.get(id);
  }

  async updateInstallerHQ(id: number, hqData: { hqAddress: string; hqPostcode: string; hqLatitude: number; hqLongitude: number }): Promise<Installer> {
    const installer = this.installers.get(id);
    if (!installer) {
      throw new Error("Installer not found");
    }
    
    const updatedInstaller = { 
      ...installer, 
      hqAddress: hqData.hqAddress,
      hqPostcode: hqData.hqPostcode,
      hqLatitude: hqData.hqLatitude,
      hqLongitude: hqData.hqLongitude,
      updatedAt: new Date()
    };
    
    this.installers.set(id, updatedInstaller);
    return updatedInstaller;
  }

  async updateInstallerRadius(id: number, radius: number): Promise<Installer> {
    const installer = this.installers.get(id);
    if (!installer) {
      throw new Error("Installer not found");
    }
    
    const updatedInstaller = { 
      ...installer, 
      serviceRadius: radius,
      updatedAt: new Date()
    };
    
    this.installers.set(id, updatedInstaller);
    return updatedInstaller;
  }

  async addInstallerServiceArea(id: number, serviceArea: { postcode: string; lat: number; lng: number; radius: number }): Promise<Installer> {
    const installer = this.installers.get(id);
    if (!installer) {
      throw new Error("Installer not found");
    }
    
    const currentAreas = installer.additionalServiceAreas || [];
    const updatedInstaller = { 
      ...installer, 
      additionalServiceAreas: [...currentAreas, serviceArea],
      updatedAt: new Date()
    };
    
    this.installers.set(id, updatedInstaller);
    return updatedInstaller;
  }

  async createServiceAreaUpgrade(insertUpgrade: InsertServiceAreaUpgrade): Promise<ServiceAreaUpgrade> {
    const id = this.currentServiceAreaUpgradeId++;
    const upgrade: ServiceAreaUpgrade = {
      ...insertUpgrade,
      id,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.serviceAreaUpgrades.set(id, upgrade);
    return upgrade;
  }

  async getActiveUpgrades(installerId: number): Promise<ServiceAreaUpgrade[]> {
    const now = new Date();
    return Array.from(this.serviceAreaUpgrades.values()).filter(
      upgrade => upgrade.installerId === installerId && 
                 upgrade.endDate > now && 
                 upgrade.paymentStatus === "completed"
    );
  }
}

export const storage = new MemStorage();
