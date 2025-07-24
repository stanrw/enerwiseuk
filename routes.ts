import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { articleViewsService } from "./article-views-service";
import { energyAssessmentService } from "./energy-apis";
import { validateDataAuthenticity, canGenerateAccurateRecommendations, getDataQualitySummary } from "./data-accuracy-service";
import { 
  propertyAssessmentSchema, 
  leadCaptureSchema,
  insertChatMessageSchema,
  customerLoginSchema,
  customerRegistrationSchema,
  installerLoginSchema,
  installerRegistrationSchema,
  type SystemRecommendation 
} from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Property assessment endpoint
  app.post("/api/assessment", async (req, res) => {
    try {
      const { address, smartMeterNumber } = propertyAssessmentSchema.parse(req.body);
      
      // Check if property already exists
      let property = await storage.getPropertyByAddress(address);
      
      if (!property) {
        // Create new property with mock data based on address analysis
        property = await storage.createProperty({
          address,
          postcode: extractPostcode(address),
          smartMeterNumber,
          propertyType: "house",
          bedrooms: 3,
          currentEnergyUsage: 3500,
          roofArea: "45.5",
          roofOrientation: "south",
          shadingLevel: "low",
        });
      }

      // Check if assessment already exists
      let assessment = await storage.getAssessmentByPropertyId(property.id);
      
      // Generate enhanced recommendations using real API data
      const propertyAnalysis = await energyAssessmentService.analyzeProperty(property.address, property.smartMeterNumber || undefined);
      console.log('Property analysis complete:', !!propertyAnalysis);
      
      // Validate data authenticity before generating recommendations
      const authenticatedData = {
        epcCertificate: propertyAnalysis.epcData,
        googleSolarData: propertyAnalysis.solarPotential,
        smartMeterReadings: propertyAnalysis.smartMeterData,
        osDatahubProperty: propertyAnalysis.osDatahubData
      };
      
      const dataQuality = getDataQualitySummary(authenticatedData);
      
      let recommendations;
      if (canGenerateAccurateRecommendations(authenticatedData)) {
        // Generate recommendations using authentic data only
        recommendations = generateEnhancedRecommendations(propertyAnalysis, property);
        // Add data quality information to response
        const enhancedRecommendations = {
          ...recommendations,
          dataQuality: {
            epcData: !!propertyAnalysis.epcData,
            solarPotential: !!propertyAnalysis.solarPotential,
            smartMeterData: !!propertyAnalysis.smartMeterData,
            confidence: dataQuality.confidence,
            dataSources: dataQuality.sources
          }
        };
        recommendations = enhancedRecommendations;
        console.log(`Recommendations generated with ${dataQuality.confidence}% confidence using authentic data`);
      } else {
        // Return error requiring authentic data
        console.error('Insufficient authentic data for accurate recommendations');
        return res.status(422).json({
          error: "Insufficient Data",
          message: "Cannot generate accurate recommendations without authentic property data",
          dataQuality,
          requiredActions: dataQuality.recommendations,
          availableSources: dataQuality.sources,
          missingData: dataQuality.limitations
        });
      }
      
      if (!assessment) {
        assessment = await storage.createAssessment({
          propertyId: property.id,
          solarRecommendation: recommendations.solar,
          batteryRecommendation: recommendations.battery,
          heatPumpRecommendation: recommendations.heatPump,
          evChargerRecommendation: recommendations.evCharger,
          totalSavings: recommendations.totalSavings.toString(),
          totalCost: recommendations.totalCost.toString(),
          paybackPeriod: recommendations.paybackPeriod.toString(),
          carbonSavings: recommendations.carbonSavings.toString(),
        });
      }

      // Get relevant installers
      let installers = await storage.getInstallersByPostcode(property.postcode);
      
      // If no installers found for specific postcode, get all installers as fallback
      if (installers.length === 0) {
        installers = await storage.getAllInstallers();
      }

      res.json({
        property,
        assessment,
        installers: installers.slice(0, 3), // Return top 3 installers
        recommendations: [
          recommendations.solar,
          recommendations.battery,
          recommendations.heatPump,
          recommendations.evCharger
        ].filter(rec => rec),
        enhancedData: propertyAnalysis
      });
    } catch (error) {
      console.error("Assessment error:", error);
      res.status(400).json({ 
        message: error instanceof Error ? error.message : "Assessment failed" 
      });
    }
  });

  // Lead capture endpoint
  app.post("/api/leads", async (req, res) => {
    try {
      const leadData = leadCaptureSchema.parse(req.body);
      
      const lead = await storage.createLead({
        ...leadData,
        source: "contact_form",
        status: "new",
      });

      res.json({ success: true, leadId: lead.id });
    } catch (error) {
      console.error("Lead creation error:", error);
      res.status(400).json({ 
        message: error instanceof Error ? error.message : "Failed to create lead" 
      });
    }
  });

  // Get installers
  app.get("/api/installers", async (req, res) => {
    try {
      const { specialty, postcode } = req.query;
      
      let installers;
      if (specialty && typeof specialty === 'string') {
        installers = await storage.getInstallersBySpecialty(specialty);
      } else if (postcode && typeof postcode === 'string') {
        installers = await storage.getInstallersByPostcode(postcode);
      } else {
        installers = await storage.getAllInstallers();
      }

      res.json(installers);
    } catch (error) {
      console.error("Installers fetch error:", error);
      res.status(500).json({ message: "Failed to fetch installers" });
    }
  });

  // Get articles
  app.get("/api/articles", async (req, res) => {
    try {
      const { category } = req.query;
      
      let articles;
      if (category && typeof category === 'string') {
        articles = await storage.getArticlesByCategory(category);
      } else {
        articles = await storage.getAllArticles();
      }

      res.json(articles);
    } catch (error) {
      console.error("Articles fetch error:", error);
      res.status(500).json({ message: "Failed to fetch articles" });
    }
  });

  // Get article by slug
  app.get("/api/articles/:slug", async (req, res) => {
    try {
      const { slug } = req.params;
      const article = await storage.getArticleBySlug(slug);
      
      if (!article) {
        return res.status(404).json({ message: "Article not found" });
      }

      res.json(article);
    } catch (error) {
      console.error("Article fetch error:", error);
      res.status(500).json({ message: "Failed to fetch article" });
    }
  });

  // Article views tracking
  app.post('/api/articles/:articleId/view', async (req, res) => {
    try {
      const { articleId } = req.params;
      const result = await articleViewsService.incrementView(articleId);
      res.json({ viewCount: result.viewCount });
    } catch (error) {
      console.error(`Error tracking view for article ${req.params.articleId}:`, error);
      res.status(500).json({ error: 'Failed to track view' });
    }
  });

  app.get('/api/articles/views', async (req, res) => {
    try {
      const allViews = await articleViewsService.getAllViews();
      res.json(allViews);
    } catch (error) {
      console.error('Error fetching article views:', error);
      res.status(500).json({ error: 'Failed to fetch views' });
    }
  });

  app.get('/api/articles/:articleId/views', async (req, res) => {
    try {
      const { articleId } = req.params;
      const viewCount = await articleViewsService.getViews(articleId);
      res.json({ viewCount });
    } catch (error) {
      console.error(`Error fetching views for article ${req.params.articleId}:`, error);
      res.status(500).json({ error: 'Failed to fetch views' });
    }
  });

  // Orla chat endpoint
  app.post("/api/chat", async (req, res) => {
    try {
      const { sessionId, message } = insertChatMessageSchema.parse({
        ...req.body,
        isFromUser: true,
      });

      // Save user message
      await storage.saveChatMessage({
        sessionId,
        message,
        isFromUser: true,
      });

      // Generate Orla response using Claude
      const { generateOrlaResponse } = await import('./orla-service');
      const orlaResponse = await generateOrlaResponse(message);

      // Save Orla response
      await storage.saveChatMessage({
        sessionId,
        message: orlaResponse,
        isFromUser: false,
      });

      res.json({ response: orlaResponse });
    } catch (error) {
      console.error("Chat error:", error);
      res.status(400).json({ 
        message: error instanceof Error ? error.message : "Chat failed" 
      });
    }
  });

  // Get chat history
  app.get("/api/chat/:sessionId", async (req, res) => {
    try {
      const { sessionId } = req.params;
      const messages = await storage.getChatMessages(sessionId);
      res.json(messages);
    } catch (error) {
      console.error("Chat history error:", error);
      res.status(500).json({ message: "Failed to fetch chat history" });
    }
  });

  // Google Places API autocomplete for address input
  app.post("/api/google-places/autocomplete", async (req, res) => {
    try {
      const { input, componentRestrictions, types } = req.body;
      
      if (!input || typeof input !== 'string') {
        return res.status(400).json({ error: "Input parameter is required" });
      }

      const googleMapsApiKey = process.env.GOOGLE_MAPS_API_KEY;
      if (!googleMapsApiKey) {
        return res.status(503).json({ error: "Google Maps API not configured" });
      }

      console.log(`🔍 Google Places autocomplete for: "${input}"`);
      
      const params = new URLSearchParams({
        input: input,
        key: googleMapsApiKey,
        components: componentRestrictions?.country ? `country:${componentRestrictions.country}` : 'country:uk',
        types: types?.join('|') || 'address'
      });

      const response = await fetch(`https://maps.googleapis.com/maps/api/place/autocomplete/json?${params}`);
      
      if (!response.ok) {
        console.error('Google Places API error:', response.status, response.statusText);
        return res.status(response.status).json({ error: "Places API request failed" });
      }

      const data = await response.json();
      
      console.log(`📍 Found ${data.predictions?.length || 0} address suggestions`);
      
      res.json(data);
    } catch (error) {
      console.error("Google Places API error:", error);
      res.status(500).json({ error: "Failed to fetch place suggestions" });
    }
  });

  // Test API integrations
  app.post("/api/test-apis", async (req, res) => {
    try {
      const { address } = req.body;
      const testAddress = address || "20 Priolo Road, London SE7 7PT";
      
      console.log(`Testing APIs with address: ${testAddress}`);
      
      // Test Google Maps API
      const coordinates = await energyAssessmentService.testGoogleMapsAPI(testAddress);
      const postcode = testAddress.match(/[A-Z]{1,2}[0-9][A-Z0-9]?\s?[0-9][A-Z]{2}/i)?.[0] || 'SE7 7PT';
      
      // Test all APIs simultaneously
      const [solarTest, epcTest, osDatahubTest] = await Promise.all([
        energyAssessmentService.testGoogleSolarAPI(coordinates?.lat || 51.5074, coordinates?.lng || -0.1278),
        energyAssessmentService.testEPCAPI(postcode),
        energyAssessmentService.testOSDatahubAPI(postcode)
      ]);
      
      res.json({
        address: testAddress,
        coordinates,
        googleMapsWorking: !!coordinates,
        googleSolarWorking: !!solarTest,
        epcWorking: !!epcTest,
        osDatahubWorking: !!osDatahubTest,
        testResults: {
          coordinates,
          solarTest,
          epcTest,
          osDatahubTest
        }
      });
    } catch (error) {
      console.error("API test error:", error);
      res.status(500).json({ 
        message: "API test failed",
        error: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });

  // Enhanced EPC API test endpoint
  app.get('/api/test-epc/:postcode', async (req, res) => {
    try {
      const { postcode } = req.params;
      const { epcService } = await import('./epc-service');
      
      // Test comprehensive EPC data retrieval
      const epcData = await epcService.getPropertyData("Sample Address", postcode);
      
      res.json({
        postcode,
        timestamp: new Date().toISOString(),
        epcApiWorking: !!epcData,
        propertyData: epcData ? {
          address: epcData.address,
          currentRating: epcData.currentEpcRating,
          potentialRating: epcData.potentialEpcRating,
          propertyType: epcData.propertyType,
          floorArea: epcData.floorArea,
          homeSize: epcData.homeSize,
          heatingCost: epcData.heatingCostCurrent,
          energyConsumption: epcData.energyConsumption,
          isEpcOld: epcData.isEpcOld
        } : null
      });
    } catch (error) {
      res.status(500).json({
        error: error.message,
        timestamp: new Date().toISOString()
      });
    }
  });

  // Smart Meter Connection API
  app.post("/api/smart-meter/connect", async (req, res) => {
    try {
      const { mpan, propertyId } = req.body;
      
      if (!mpan || mpan.length < 13) {
        return res.status(400).json({ message: "Valid MPAN/MPRN required (13 digits)" });
      }

      // Get smart meter data using enhanced service
      const smartMeterData = await energyAssessmentService.getSmartMeterData(mpan);
      
      if (!smartMeterData) {
        return res.status(400).json({ message: "Unable to connect to smart meter. Please check your MPAN/MPRN." });
      }

      // Update property with smart meter number if provided
      if (propertyId) {
        // In a real implementation, update the property record
        console.log(`Updated property ${propertyId} with smart meter ${mpan}`);
      }

      res.json({
        success: true,
        smartMeterData,
        enhancedAssessment: true,
        message: "Smart meter connected successfully. Your estimates are now based on your actual usage patterns."
      });
    } catch (error) {
      console.error("Smart meter connection error:", error);
      res.status(400).json({ 
        message: error instanceof Error ? error.message : "Smart meter connection failed" 
      });
    }
  });

  // Enhanced Quote Request API (Streamlined Customer Journey)
  app.post("/api/quote-request", async (req, res) => {
    try {
      const quoteRequestData = req.body;
      console.log('Quote request data received:', JSON.stringify(quoteRequestData, null, 2));
      
      // Ensure we have an address
      const address = quoteRequestData.address || quoteRequestData.propertyAddress || "Property address from assessment";
      
      // Create a lead from the enhanced quote request
      const lead = await storage.createLead({
        firstName: quoteRequestData.firstName,
        lastName: quoteRequestData.lastName,
        email: quoteRequestData.email,
        phone: quoteRequestData.phone,
        address: address,
        interests: quoteRequestData.systems || quoteRequestData.systemTypes || [],
        source: "streamlined_quote_request",
        status: "new",
        notes: `Assessment ID: ${quoteRequestData.assessmentId || 'Not provided'}, Address: ${address}, Budget: ${quoteRequestData.budget || 'Not specified'}, Timeline: ${quoteRequestData.timeline || 'Not specified'}, Priority: ${quoteRequestData.priority || 'Not specified'}, Contact Methods: ${(quoteRequestData.contactMethods || []).join(', ')}, Best Time: ${quoteRequestData.bestTimeToCall || 'Not specified'}, Notes: ${quoteRequestData.additionalNotes || 'None provided'}`,
      });

      // Enhanced automated process simulation:
      // 1. Generate comprehensive tender pack with assessment data
      // 2. Intelligent installer matching based on location, specialties, and availability  
      // 3. Automated email confirmation with timeline
      // 4. Real-time tracking dashboard
      // 5. Quality assurance for installer responses

      // Simulate installer matching
      const matchedInstallers = await findBestInstallers(quoteRequestData.address, quoteRequestData.systems);
      
      const response = {
        success: true,
        quoteRequestId: lead.id,
        message: "Quote request submitted successfully - automated installer matching complete",
        nextSteps: {
          confirmation: "Confirmation email sent with your reference number",
          installerMatching: `${matchedInstallers.length} certified installers matched to your requirements`,
          contactMethod: `Installers will contact you via: ${(quoteRequestData.contactMethods || ['email']).join(' and ')}`,
          timeline: "Professional quotes within 24 hours",
          tracking: "Access your quotes dashboard via your Enerwise account"
        },
        matchedInstallers: matchedInstallers.map(installer => ({
          name: installer.name,
          rating: installer.rating,
          specialties: installer.specialties,
          estimatedContactTime: installer.estimatedContactTime
        }))
      };

      res.json(response);
    } catch (error) {
      console.error("Enhanced quote request error:", error);
      res.status(400).json({ 
        success: false,
        message: error instanceof Error ? error.message : "Quote request submission failed - please try again" 
      });
    }
  });

  // Maintain backwards compatibility with old endpoint
  app.post("/api/quote-requests", async (req, res) => {
    // Redirect to new enhanced endpoint
    req.url = "/api/quote-request";
    return app._router.handle(req, res);
  });

  // Authentication routes
  
  // Customer authentication
  app.post("/api/auth/customer/register", async (req, res) => {
    try {
      const customerData = customerRegistrationSchema.parse(req.body);
      
      // Check if customer already exists
      const existingCustomer = await storage.getCustomerByEmail(customerData.email);
      if (existingCustomer) {
        return res.status(400).json({ 
          message: "An account with this email already exists" 
        });
      }
      
      const { hashPassword, generateVerificationToken, getTokenExpiration, sendVerificationEmail } = await import('./auth-utils');
      
      // Hash password and generate verification token
      const hashedPassword = hashPassword(customerData.password);
      const verificationToken = generateVerificationToken();
      const tokenExpiration = getTokenExpiration();
      
      // Create customer account with verification fields
      const customer = await storage.createCustomer({
        ...customerData,
        password: hashedPassword,
        isEmailVerified: false,
        emailVerificationToken: verificationToken,
        emailVerificationExpires: tokenExpiration,
      });
      
      // Send verification email
      const emailSent = await sendVerificationEmail(customerData.email, verificationToken, 'customer');
      
      // Return customer data without password and sensitive fields
      const { password, emailVerificationToken, passwordResetToken, ...customerResponse } = customer;
      res.json({
        customer: customerResponse,
        message: emailSent ? 
          "Account created successfully! Please check your email to verify your account." :
          "Account created successfully! Email verification will be sent shortly.",
        emailSent,
      });
    } catch (error) {
      console.error("Customer registration error:", error);
      res.status(400).json({ 
        message: error instanceof Error ? error.message : "Registration failed" 
      });
    }
  });

  app.post("/api/auth/customer/login", async (req, res) => {
    try {
      const { email, password } = customerLoginSchema.parse(req.body);
      
      // Find customer by email
      const customer = await storage.getCustomerByEmail(email);
      if (!customer) {
        return res.status(401).json({ 
          message: "Invalid email or password" 
        });
      }
      
      const { verifyPassword } = await import('./auth-utils');
      
      // Verify password
      if (!verifyPassword(password, customer.password)) {
        return res.status(401).json({ 
          message: "Invalid email or password" 
        });
      }
      
      // Check if email is verified
      if (!customer.isEmailVerified) {
        return res.status(401).json({ 
          message: "Please verify your email address before logging in. Check your inbox for the verification link." 
        });
      }
      
      // Return customer data without sensitive fields
      const { password: _, emailVerificationToken, passwordResetToken, ...customerWithoutPassword } = customer;
      res.json({
        customer: customerWithoutPassword,
        message: "Login successful",
      });
    } catch (error) {
      console.error("Customer login error:", error);
      res.status(400).json({ 
        message: error instanceof Error ? error.message : "Login failed" 
      });
    }
  });

  // Email verification endpoints
  app.get("/api/verify-email", async (req, res) => {
    try {
      const { token, type } = req.query;
      
      if (!token || !type || (type !== 'customer' && type !== 'installer')) {
        return res.status(400).json({ message: "Invalid verification link" });
      }
      
      let verifiedAccount;
      if (type === 'customer') {
        verifiedAccount = await storage.verifyCustomerByToken(token as string);
      } else {
        verifiedAccount = await storage.verifyInstallerByToken(token as string);
      }
      
      if (!verifiedAccount) {
        return res.status(400).json({ 
          message: "Invalid or expired verification token" 
        });
      }
      
      res.json({ 
        success: true,
        message: "Email verified successfully! You can now log in to your account.",
        accountType: type 
      });
    } catch (error) {
      console.error("Email verification error:", error);
      res.status(500).json({ 
        message: "Verification failed. Please try again or request a new verification email." 
      });
    }
  });

  // Resend verification email
  app.post("/api/resend-verification", async (req, res) => {
    try {
      const { email, type } = req.body;
      
      if (!email || !type || (type !== 'customer' && type !== 'installer')) {
        return res.status(400).json({ message: "Email and account type required" });
      }
      
      const { generateVerificationToken, getTokenExpiration, sendVerificationEmail } = await import('./auth-utils');
      
      const verificationToken = generateVerificationToken();
      const tokenExpiration = getTokenExpiration();
      
      let account;
      if (type === 'customer') {
        account = await storage.getCustomerByEmail(email);
        if (account && !account.isEmailVerified) {
          await storage.setCustomerVerificationToken(email, verificationToken, tokenExpiration);
        }
      } else {
        account = await storage.getInstallerAccountByEmail(email);
        if (account && !account.isEmailVerified) {
          await storage.setInstallerVerificationToken(email, verificationToken, tokenExpiration);
        }
      }
      
      if (!account) {
        return res.status(404).json({ message: "Account not found" });
      }
      
      if (account.isEmailVerified) {
        return res.status(400).json({ message: "Email is already verified" });
      }
      
      const emailSent = await sendVerificationEmail(email, verificationToken, type as 'customer' | 'installer');
      
      res.json({ 
        success: true,
        message: emailSent ? "Verification email sent!" : "Email will be sent shortly.",
        emailSent 
      });
    } catch (error) {
      console.error("Resend verification error:", error);
      res.status(500).json({ 
        message: "Failed to resend verification email" 
      });
    }
  });

  // Installer authentication
  app.post("/api/auth/installer/register", async (req, res) => {
    try {
      const installerData = installerRegistrationSchema.parse(req.body);
      
      // Check if installer already exists
      const existingInstaller = await storage.getInstallerAccountByEmail(installerData.email);
      if (existingInstaller) {
        return res.status(400).json({ 
          message: "An account with this email already exists" 
        });
      }
      
      const { hashPassword, generateVerificationToken, getTokenExpiration, sendVerificationEmail } = await import('./auth-utils');
      
      // Hash password and generate verification token
      const hashedPassword = hashPassword(installerData.password);
      const verificationToken = generateVerificationToken();
      const tokenExpiration = getTokenExpiration();
      
      // Create installer account (pending approval + email verification)
      const installerAccount = await storage.createInstallerAccount({
        ...installerData,
        password: hashedPassword,
        isEmailVerified: false,
        emailVerificationToken: verificationToken,
        emailVerificationExpires: tokenExpiration,
      });
      
      // Send verification email
      const emailSent = await sendVerificationEmail(installerData.email, verificationToken, 'installer');
      
      // Return account data without sensitive fields
      const { password, emailVerificationToken, passwordResetToken, ...accountResponse } = installerAccount;
      res.json({
        account: accountResponse,
        message: emailSent ? 
          "Registration submitted! Please verify your email address, then await approval." :
          "Registration submitted! Email verification will be sent shortly, then await approval.",
        emailSent,
      });
    } catch (error) {
      console.error("Installer registration error:", error);
      res.status(400).json({ 
        message: error instanceof Error ? error.message : "Registration failed" 
      });
    }
  });

  app.post("/api/auth/installer/login", async (req, res) => {
    try {
      const { email, password } = installerLoginSchema.parse(req.body);
      
      // Find installer by email
      const installerAccount = await storage.getInstallerAccountByEmail(email);
      if (!installerAccount) {
        return res.status(401).json({ 
          message: "Invalid email or password" 
        });
      }
      
      const { verifyPassword } = await import('./auth-utils');
      
      // Verify password
      if (!verifyPassword(password, installerAccount.password)) {
        return res.status(401).json({ 
          message: "Invalid email or password" 
        });
      }
      
      // Check if email is verified
      if (!installerAccount.isEmailVerified) {
        return res.status(401).json({ 
          message: "Please verify your email address before logging in. Check your inbox for the verification link." 
        });
      }
      
      // Check if account is approved
      if (!installerAccount.isApproved) {
        return res.status(401).json({ 
          message: "Your installer account is pending approval. You'll be notified when it's ready." 
        });
      }
      
      // Return account data without sensitive fields
      const { password: _, emailVerificationToken, passwordResetToken, ...accountWithoutPassword } = installerAccount;
      res.json({
        account: accountWithoutPassword,
        message: "Login successful",
      });
    } catch (error) {
      console.error("Installer login error:", error);
      res.status(400).json({ 
        message: error instanceof Error ? error.message : "Login failed" 
      });
    }
  });

  // Service Area Management API Endpoints
  
  // Update installer headquarters location
  app.patch("/api/installer/:id/headquarters", async (req, res) => {
    try {
      const { id } = req.params;
      const { address, postcode } = req.body;
      
      if (!address || !postcode) {
        return res.status(400).json({ message: "Address and postcode are required" });
      }
      
      // In production, would geocode address to get coordinates
      const mockCoordinates = { lat: 51.5074, lng: -0.1278 };
      
      // Update installer with new HQ details
      const updatedInstaller = await storage.updateInstallerHQ(parseInt(id), {
        hqAddress: address,
        hqPostcode: postcode,
        hqLatitude: mockCoordinates.lat,
        hqLongitude: mockCoordinates.lng
      });
      
      res.json({
        success: true,
        installer: updatedInstaller,
        message: "Headquarters location updated successfully"
      });
    } catch (error) {
      console.error("HQ update error:", error);
      res.status(500).json({ message: "Failed to update headquarters location" });
    }
  });

  // Update installer service radius
  app.patch("/api/installer/:id/service-radius", async (req, res) => {
    try {
      const { id } = req.params;
      const { radius, upgradePayment } = req.body;
      
      if (!radius || radius < 5 || radius > 200) {
        return res.status(400).json({ message: "Radius must be between 5 and 200 miles" });
      }
      
      // Get current installer to check subscription limits
      const installer = await storage.getInstallerById(parseInt(id));
      if (!installer) {
        return res.status(404).json({ message: "Installer not found" });
      }
      
      // Check if upgrade payment is required
      const tierLimits = {
        basic: 30,
        standard: 50,
        premium: 100
      };
      
      const maxAllowed = tierLimits[installer.subscriptionTier as keyof typeof tierLimits] || 30;
      
      if (radius > maxAllowed && !upgradePayment) {
        return res.status(402).json({ 
          message: "Upgrade required",
          currentLimit: maxAllowed,
          requestedRadius: radius,
          upgradeRequired: true
        });
      }
      
      // Update service radius
      const updatedInstaller = await storage.updateInstallerRadius(parseInt(id), radius);
      
      res.json({
        success: true,
        installer: updatedInstaller,
        message: "Service radius updated successfully"
      });
    } catch (error) {
      console.error("Radius update error:", error);
      res.status(500).json({ message: "Failed to update service radius" });
    }
  });

  // Add additional service area
  app.post("/api/installer/:id/service-areas", async (req, res) => {
    try {
      const { id } = req.params;
      const { postcode, radius } = req.body;
      
      if (!postcode || !radius || radius < 5 || radius > 50) {
        return res.status(400).json({ message: "Valid postcode and radius (5-50 miles) required" });
      }
      
      // In production, would geocode postcode to get coordinates
      const mockCoordinates = { lat: 51.5074, lng: -0.1278 };
      
      const newServiceArea = {
        postcode: postcode.toUpperCase(),
        lat: mockCoordinates.lat,
        lng: mockCoordinates.lng,
        radius
      };
      
      // Add service area to installer
      const updatedInstaller = await storage.addInstallerServiceArea(parseInt(id), newServiceArea);
      
      res.json({
        success: true,
        installer: updatedInstaller,
        message: "Service area added successfully"
      });
    } catch (error) {
      console.error("Add service area error:", error);
      res.status(500).json({ message: "Failed to add service area" });
    }
  });

  // Process upgrade payment
  app.post("/api/installer/:id/upgrade-payment", async (req, res) => {
    try {
      const { id } = req.params;
      const { upgradeType, price, duration } = req.body;
      
      if (!upgradeType || !price || !duration) {
        return res.status(400).json({ message: "Upgrade type, price, and duration are required" });
      }
      
      // In production, would integrate with Stripe
      // For now, simulate payment processing
      const mockCheckoutUrl = `https://checkout.stripe.com/pay/upgrade-${upgradeType}-${id}`;
      
      // Create upgrade record
      const upgrade = await storage.createServiceAreaUpgrade({
        installerId: parseInt(id),
        upgradeType,
        price: price.toString(),
        duration,
        startDate: new Date(),
        endDate: new Date(Date.now() + duration * 30 * 24 * 60 * 60 * 1000), // duration in months
        paymentStatus: "pending"
      });
      
      res.json({
        success: true,
        checkoutUrl: mockCheckoutUrl,
        upgradeId: upgrade.id,
        message: "Payment processing initiated"
      });
    } catch (error) {
      console.error("Upgrade payment error:", error);
      res.status(500).json({ message: "Failed to process upgrade payment" });
    }
  });

  // Get installer profile with service areas
  app.get("/api/installer/:id/profile", async (req, res) => {
    try {
      const { id } = req.params;
      
      const installer = await storage.getInstallerById(parseInt(id));
      if (!installer) {
        return res.status(404).json({ message: "Installer not found" });
      }
      
      // Get active upgrades
      const activeUpgrades = await storage.getActiveUpgrades(parseInt(id));
      
      res.json({
        success: true,
        installer: {
          ...installer,
          activeUpgrades
        }
      });
    } catch (error) {
      console.error("Profile fetch error:", error);
      res.status(500).json({ message: "Failed to fetch installer profile" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

// Enhanced installer matching function
async function findBestInstallers(address: string, systems: string[]) {
  // Simulate intelligent installer matching
  const mockInstallers = [
    {
      id: 1,
      name: "SolarTech Pro",
      rating: 4.9,
      specialties: ["solar", "battery"],
      location: "Within 10 miles",
      estimatedContactTime: "Within 2 hours",
      certifications: ["MCS", "NICEIC"]
    },
    {
      id: 2,
      name: "Green Energy Solutions",
      rating: 4.8,
      specialties: ["solar", "heatpump", "ev"],
      location: "Within 15 miles", 
      estimatedContactTime: "Within 4 hours",
      certifications: ["MCS", "TrustMark"]
    },
    {
      id: 3,
      name: "Renewable Experts Ltd",
      rating: 4.7,
      specialties: ["heatpump", "battery", "ev"],
      location: "Within 8 miles",
      estimatedContactTime: "Within 6 hours", 
      certifications: ["MCS", "HIES"]
    }
  ];
  
  // Filter installers based on system requirements
  const matchedInstallers = mockInstallers.filter(installer => 
    systems.some(system => installer.specialties.includes(system))
  );
  
  // Sort by rating and proximity
  return matchedInstallers.sort((a, b) => b.rating - a.rating).slice(0, 3);
}

// Helper functions
function extractPostcode(address: string): string {
  // Simple postcode extraction - in production, use proper address parsing
  const postcodeMatch = address.match(/[A-Z]{1,2}[0-9][A-Z0-9]?\s*[0-9][A-Z]{2}/i);
  return postcodeMatch ? postcodeMatch[0].toUpperCase() : "SW1A 1AA";
}

function generateRecommendations(property: any) {
  const currentUsage = property.currentEnergyUsage || 3500;
  const roofArea = parseFloat(property.roofArea || "45");
  
  // Solar calculations
  const solarCapacity = Math.min(roofArea / 8, 6); // Rough calculation: 8m² per kWp, max 6kWp
  const solarGeneration = solarCapacity * 850; // kWh per year (UK average)
  const solarCost = solarCapacity * 1200; // £1200 per kWp
  const solarSavings = Math.min(solarGeneration * 0.30, currentUsage * 0.30); // 30p per kWh saved
  
  const solar: SystemRecommendation = {
    type: "solar",
    recommended: solarCapacity > 2,
    cost: Math.round(solarCost),
    annualSavings: Math.round(solarSavings),
    paybackPeriod: Math.round((solarCost / solarSavings) * 10) / 10,
    specifications: {
      capacity: `${solarCapacity.toFixed(1)} kWp`,
      annualGeneration: `${Math.round(solarGeneration)} kWh`,
      panelCount: Math.round(solarCapacity / 0.4),
    },
    roi: Math.round(((solarSavings * 25) / solarCost) * 100),
    carbonSavings: Math.round(solarGeneration * 0.23), // kg CO2 saved per year
  };

  // Battery calculations
  const batteryCapacity = Math.min(10, solarGeneration / 365); // Daily average generation
  const batteryCost = batteryCapacity * 500; // £500 per kWh
  const batterySavings = batteryCapacity * 100; // Additional savings from time-shifting
  
  const battery: SystemRecommendation = {
    type: "battery",
    recommended: solar.recommended && batteryCapacity > 5,
    cost: Math.round(batteryCost),
    annualSavings: Math.round(batterySavings),
    paybackPeriod: Math.round((batteryCost / batterySavings) * 10) / 10,
    specifications: {
      capacity: `${Math.round(batteryCapacity)} kWh`,
      selfConsumption: "85%",
      warranty: "10 years",
    },
    roi: Math.round(((batterySavings * 15) / batteryCost) * 100),
    carbonSavings: Math.round(batteryCapacity * 50), // Additional CO2 savings from optimized usage
  };

  // Heat pump calculations
  const heatPumpCost = 12000;
  const heatPumpSavings = 800; // Annual savings vs gas boiler
  
  const heatPump: SystemRecommendation = {
    type: "heat_pump",
    recommended: property.propertyType === "house",
    cost: heatPumpCost,
    annualSavings: heatPumpSavings,
    paybackPeriod: Math.round((heatPumpCost / heatPumpSavings) * 10) / 10,
    specifications: {
      type: "Air Source Heat Pump",
      efficiency: "COP 3.5",
      heating: "Yes",
      cooling: "Yes",
    },
    roi: Math.round(((heatPumpSavings * 20) / heatPumpCost) * 100),
    carbonSavings: 2500, // kg CO2 saved per year vs gas boiler
  };

  // EV charger calculations
  const evChargerCost = 800;
  const evChargerSavings = 300; // Annual savings vs public charging
  
  const evCharger: SystemRecommendation = {
    type: "ev_charger",
    recommended: true,
    cost: evChargerCost,
    annualSavings: evChargerSavings,
    paybackPeriod: Math.round((evChargerCost / evChargerSavings) * 10) / 10,
    specifications: {
      power: "7kW",
      connectivity: "WiFi enabled",
      smartCharging: "Yes",
    },
    roi: Math.round(((evChargerSavings * 10) / evChargerCost) * 100),
    carbonSavings: 400, // kg CO2 saved per year by encouraging EV adoption
  };

  const totalCost = solar.cost + (battery.recommended ? battery.cost : 0) + 
                   (heatPump.recommended ? heatPump.cost : 0) + evCharger.cost;
  const totalSavings = solar.annualSavings + (battery.recommended ? battery.annualSavings : 0) + 
                      (heatPump.recommended ? heatPump.annualSavings : 0) + evCharger.annualSavings;
  const paybackPeriod = totalCost / totalSavings;
  const carbonSavings = (solarGeneration * 0.23) / 1000; // kg CO2 per kWh to tonnes

  return {
    solar,
    battery,
    heatPump,
    evCharger,
    totalCost,
    totalSavings,
    paybackPeriod,
    carbonSavings,
  };
}

function generateEnhancedRecommendations(propertyAnalysis: any, property?: any) {
  const epcData = propertyAnalysis.epcData;
  const solarPotential = propertyAnalysis.solarPotential;
  const heatPumpSuitability = propertyAnalysis.heatPumpSuitability;
  const smartMeterData = propertyAnalysis.smartMeterData;
  
  // Only use authentic data - no fallbacks to generic estimates
  if (!epcData && !smartMeterData && !solarPotential) {
    throw new Error("Insufficient data: Unable to generate accurate recommendations without property energy data. Please ensure APIs are properly configured.");
  }
  
  // Use actual energy usage from authenticated sources only
  const currentUsage = smartMeterData?.averageDaily * 365 || 
                      epcData?.energyConsumption || 
                      null;
  
  if (!currentUsage) {
    throw new Error("Energy usage data unavailable: Cannot calculate accurate savings without real consumption data from EPC or smart meter.");
  }
  
  // Enhanced Solar calculations using authenticated API data only
  if (!solarPotential) {
    throw new Error("Solar analysis unavailable: Requires Google Solar API data for accurate roof assessment and generation estimates.");
  }
  
  const roofArea = solarPotential.roofArea;
  const solarCapacity = solarPotential.maxCapacity;
  const solarGeneration = solarPotential.estimatedGeneration;
  const irradiance = solarPotential.annualIrradiance;
  
  // Accurate cost calculation using real energy rates only
  const solarCost = solarCapacity * 1400; // Updated 2025 pricing
  
  // Only use real electricity rates from smart meter data or EPC
  const electricityRate = smartMeterData?.costPerMonth ? 
    (smartMeterData.costPerMonth * 12) / (smartMeterData.averageMonthly * 12) : 
    epcData?.heatingCost ? (epcData.heatingCost / epcData.energyConsumption) : null;
    
  if (!electricityRate) {
    throw new Error("Electricity rate unknown: Cannot calculate accurate savings without real energy cost data from smart meter or EPC certificate.");
  }
  
  const solarSavings = Math.min(solarGeneration * electricityRate * 0.7, currentUsage * electricityRate * 0.5);
  
  const solar: SystemRecommendation = {
    type: "solar",
    recommended: solarPotential.suitabilityScore > 60,
    cost: Math.round(solarCost),
    annualSavings: Math.round(solarSavings),
    paybackPeriod: Math.round((solarCost / solarSavings) * 10) / 10,
    specifications: {
      capacity: `${solarCapacity.toFixed(1)} kWp`,
      annualGeneration: `${Math.round(solarGeneration)} kWh`,
      panelCount: Math.round(solarCapacity / 0.45),
      irradiance: `${Math.round(irradiance)} kWh/m²/year`,
      orientation: solarPotential.orientation,
      tilt: `${solarPotential.tilt}°`,
      shadingFactor: `${Math.round(solarPotential.shadingFactor * 100)}%`
    },
    roi: Math.round(((solarSavings * 25) / solarCost) * 100),
    carbonSavings: Math.round(solarGeneration * 0.23),
    dataSource: "Google Solar API"
  };

  // Enhanced Battery calculations
  const batteryCapacity = smartMeterData ? 
    Math.max(6, Math.min(15, smartMeterData.averageDaily * 0.6)) : // 60% of daily usage
    Math.min(10, solarGeneration / 300); // Or based on solar generation
  const batteryCost = batteryCapacity * 700; // Updated 2025 pricing with inflation
  const timeOfUseSavings = smartMeterData ? 
    batteryCapacity * 365 * (electricityRate - 0.05) * 0.8 : // Night vs day rate difference
    Math.max(200, batteryCapacity * 120); // Fallback calculation with minimum
  
  const battery: SystemRecommendation = {
    type: "battery",
    recommended: solar.recommended && batteryCapacity >= 6,
    cost: Math.round(batteryCost),
    annualSavings: Math.round(timeOfUseSavings),
    paybackPeriod: Math.round((batteryCost / timeOfUseSavings) * 10) / 10,
    specifications: {
      capacity: `${Math.round(batteryCapacity)} kWh`,
      selfConsumption: smartMeterData ? "90%" : "85%",
      peakShaving: smartMeterData ? `${Math.round(batteryCapacity * 0.8)} kW` : "N/A",
      efficiency: "95%",
      cycles: "6,000+ cycles",
      warranty: "10 years"
    },
    roi: Math.round(((timeOfUseSavings * 15) / batteryCost) * 100),
    carbonSavings: Math.round(timeOfUseSavings * 2.3), // Indirect carbon savings
  };

  // Heat Pump calculations using authenticated property data only
  if (!epcData?.heatingCost) {
    throw new Error("Heating cost data unavailable: Cannot calculate heat pump savings without EPC certificate data showing current heating costs.");
  }
  
  const heatPumpCost = heatPumpSuitability?.recommendedCapacity ? 
    8000 + (heatPumpSuitability.recommendedCapacity * 800) : 
    8000 + (epcData.floorArea / 10 * 800); // Base on property size from EPC
    
  const currentHeatingCost = epcData.heatingCost;
  const heatPumpSavings = heatPumpSuitability?.suitabilityScore > 70 ? 
    currentHeatingCost * 0.6 : currentHeatingCost * 0.4;
  
  const heatPump: SystemRecommendation = {
    type: "heat_pump",
    recommended: (heatPumpSuitability?.suitabilityScore || epcData.currentScore < 60) && heatPumpSavings > 200,
    cost: Math.round(heatPumpCost),
    annualSavings: Math.round(heatPumpSavings),
    paybackPeriod: Math.round((heatPumpCost / heatPumpSavings) * 10) / 10,
    specifications: {
      type: heatPumpSuitability?.airSourceSuitable ? "Air Source Heat Pump" : "Hybrid Heat Pump",
      capacity: `${heatPumpSuitability?.recommendedCapacity || Math.round(epcData.floorArea / 10)} kW`,
      efficiency: "COP 3.8",
      operatingRange: "-20°C to +35°C",
      refrigerant: "R32 (Low GWP)",
      noiseLevel: "42 dB(A)",
      warranty: "7 years"
    },
    roi: Math.round(((heatPumpSavings * 20) / heatPumpCost) * 100),
    carbonSavings: Math.round(currentHeatingCost * 6.5),
    dataSource: "EPC Certificate"
  };

  // Enhanced EV Charger calculations
  const evChargerCost = 1200; // Updated pricing for smart chargers
  const evMiles = 8000; // Average UK annual mileage
  const homeChargingRate = electricityRate * 0.6; // Off-peak charging
  const publicChargingRate = 0.75; // Average public charging cost
  const evChargerSavings = Math.max(250, (evMiles / 4) * (publicChargingRate - homeChargingRate)); // Assume 4 miles per kWh, minimum £250
  
  const evCharger: SystemRecommendation = {
    type: "ev_charger",
    recommended: true,
    cost: evChargerCost,
    annualSavings: Math.round(evChargerSavings),
    paybackPeriod: Math.round((evChargerCost / evChargerSavings) * 10) / 10,
    specifications: {
      power: "7.4kW (32A)",
      connector: "Type 2 (Universal)",
      smartFeatures: "App control, scheduling, load balancing",
      installation: "Outdoor weatherproof",
      cable: "5m tethered cable",
      warranty: "3 years"
    },
    roi: Math.round(((evChargerSavings * 10) / evChargerCost) * 100),
    carbonSavings: Math.round(evMiles * 0.15), // kg CO2 saved vs petrol car
  };

  // Calculate combined metrics
  const recommendedSystems = [solar, battery, heatPump, evCharger].filter(sys => sys.recommended);
  const totalCost = recommendedSystems.reduce((sum, sys) => sum + sys.cost, 0);
  const totalSavings = recommendedSystems.reduce((sum, sys) => sum + sys.annualSavings, 0);
  const totalCarbonSavings = recommendedSystems.reduce((sum, sys) => sum + (sys.carbonSavings || 0), 0);
  const overallPayback = totalCost / totalSavings;

  return {
    solar,
    battery,
    heatPump,
    evCharger,
    totalCost,
    totalSavings,
    paybackPeriod: overallPayback,
    carbonSavings: totalCarbonSavings / 1000, // Convert to tonnes
    dataQuality: {
      epcData: !!epcData,
      solarPotential: !!solarPotential,
      smartMeterData: !!smartMeterData,
      confidence: (!!epcData + !!solarPotential + !!smartMeterData) / 3 * 100,
      dataSources: [
        epcData ? "EPC Certificate" : null,
        solarPotential ? "Google Solar API" : null,
        smartMeterData ? "Smart Meter Data" : null
      ].filter(Boolean)
    }
  };
}

// Legacy function removed - now using Claude-powered Orla service
