import { Resend } from 'resend';

if (!process.env.RESEND_API_KEY) {
  throw new Error('RESEND_API_KEY environment variable is required');
}

const resend = new Resend(process.env.RESEND_API_KEY);

interface EmailTemplate {
  to: string;
  subject: string;
  html: string;
}

export class EmailService {
  private fromAddress = 'Enerwise <noreply@enerwise.uk>';

  async sendEmail(template: EmailTemplate): Promise<boolean> {
    try {
      const result = await resend.emails.send({
        from: this.fromAddress,
        to: template.to,
        subject: template.subject,
        html: template.html,
      });

      console.log('Email sent successfully:', result.data?.id);
      return true;
    } catch (error) {
      console.error('Failed to send email:', error);
      return false;
    }
  }

  // Email verification for new accounts
  generateVerificationEmail(email: string, verificationToken: string, accountType: 'customer' | 'installer'): EmailTemplate {
    const verificationUrl = `https://enerwise.uk/verify-email?token=${verificationToken}&type=${accountType}`;
    const accountTypeDisplay = accountType === 'customer' ? 'Customer' : 'Installer';

    return {
      to: email,
      subject: `Verify your Enerwise ${accountTypeDisplay} Account`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Verify Your Enerwise Account</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #10b981, #059669); padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 28px;">
              Ener<span style="color: #d1fae5;">wise</span>
            </h1>
            <p style="color: #d1fae5; margin: 10px 0 0 0; font-size: 16px;">UK's Leading Renewable Energy Platform</p>
          </div>
          
          <div style="background: #f9fafb; padding: 40px 30px; border-radius: 0 0 8px 8px;">
            <h2 style="color: #1f2937; margin-bottom: 20px;">Welcome to Enerwise!</h2>
            
            <p style="margin-bottom: 20px; font-size: 16px;">
              Thank you for creating your ${accountTypeDisplay.toLowerCase()} account with Enerwise. To complete your registration and start ${accountType === 'customer' ? 'exploring renewable energy solutions' : 'connecting with potential customers'}, please verify your email address.
            </p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${verificationUrl}" style="background: #10b981; color: white; padding: 15px 30px; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 16px; display: inline-block;">
                Verify Email Address
              </a>
            </div>
            
            <p style="margin-bottom: 15px; font-size: 14px; color: #6b7280;">
              If the button doesn't work, copy and paste this link into your browser:
            </p>
            <p style="margin-bottom: 25px; font-size: 14px; color: #10b981; word-break: break-all;">
              ${verificationUrl}
            </p>
            
            <div style="border-top: 1px solid #e5e7eb; padding-top: 20px; margin-top: 30px;">
              <p style="margin-bottom: 10px; font-size: 14px; color: #6b7280;">
                <strong>What happens next?</strong>
              </p>
              ${accountType === 'customer' ? `
                <ul style="color: #6b7280; font-size: 14px; margin-left: 20px;">
                  <li>Access your personal energy recommendations</li>
                  <li>Compare quotes from MCS-certified installers</li>
                  <li>Track your renewable energy journey</li>
                  <li>Get expert guidance from Orla, our AI assistant</li>
                </ul>
              ` : `
                <ul style="color: #6b7280; font-size: 14px; margin-left: 20px;">
                  <li>Set up your service areas and specialties</li>
                  <li>Browse available tender packs in your area</li>
                  <li>Submit competitive quotes to potential customers</li>
                  <li>Grow your renewable energy business</li>
                </ul>
              `}
            </div>
            
            <p style="margin-top: 25px; font-size: 12px; color: #9ca3af;">
              This verification link will expire in 24 hours. If you didn't create an account with Enerwise, you can safely ignore this email.
            </p>
          </div>
          
          <div style="text-align: center; padding: 20px; font-size: 12px; color: #9ca3af;">
            <p>&copy; 2025 Enerwise. Helping UK homeowners transition to renewable energy.</p>
            <p>Questions? Contact us at <a href="mailto:support@enerwise.uk" style="color: #10b981;">support@enerwise.uk</a></p>
          </div>
        </body>
        </html>
      `
    };
  }

  // Quote notification for customers
  generateQuoteNotificationEmail(customerEmail: string, customerName: string, quoteDetails: any): EmailTemplate {
    return {
      to: customerEmail,
      subject: 'Your Renewable Energy Quote is Ready - Enerwise',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Your Energy Quote is Ready</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #10b981, #059669); padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 28px;">
              Ener<span style="color: #d1fae5;">wise</span>
            </h1>
            <p style="color: #d1fae5; margin: 10px 0 0 0; font-size: 16px;">UK's Leading Renewable Energy Platform</p>
          </div>
          
          <div style="background: #f9fafb; padding: 40px 30px; border-radius: 0 0 8px 8px;">
            <h2 style="color: #1f2937; margin-bottom: 20px;">Great news, ${customerName}!</h2>
            
            <p style="margin-bottom: 20px; font-size: 16px;">
              Your renewable energy quote request has been processed, and we've matched you with MCS-certified installers in your area.
            </p>
            
            <div style="background: white; border: 1px solid #e5e7eb; border-radius: 8px; padding: 25px; margin: 25px 0;">
              <h3 style="color: #10b981; margin-bottom: 15px; font-size: 18px;">Your Quote Summary</h3>
              <div style="color: #6b7280; font-size: 14px; line-height: 1.8;">
                <p><strong>Systems Requested:</strong> ${quoteDetails.systemTypes?.join(', ') || 'Renewable Energy Solutions'}</p>
                <p><strong>Property Location:</strong> ${quoteDetails.address || 'Your Property'}</p>
                <p><strong>Estimated Timeline:</strong> ${quoteDetails.timeframe || 'As discussed'}</p>
                <p><strong>Budget Range:</strong> ${quoteDetails.budget || 'As specified'}</p>
              </div>
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="https://enerwise.uk/customer-portal" style="background: #10b981; color: white; padding: 15px 30px; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 16px; display: inline-block;">
                View Your Quotes
              </a>
            </div>
            
            <div style="border-top: 1px solid #e5e7eb; padding-top: 20px; margin-top: 30px;">
              <p style="margin-bottom: 15px; font-size: 14px; color: #6b7280;">
                <strong>What happens next?</strong>
              </p>
              <ul style="color: #6b7280; font-size: 14px; margin-left: 20px;">
                <li>Installers will review your requirements and submit detailed quotes</li>
                <li>You'll receive notifications as quotes become available</li>
                <li>Compare proposals and select the best installer for your needs</li>
                <li>Schedule consultations directly through your customer portal</li>
              </ul>
            </div>
            
            <p style="margin-top: 25px; font-size: 14px; color: #6b7280;">
              Need help? Chat with Orla, our AI assistant, or contact our support team anytime.
            </p>
          </div>
          
          <div style="text-align: center; padding: 20px; font-size: 12px; color: #9ca3af;">
            <p>&copy; 2025 Enerwise. Helping UK homeowners transition to renewable energy.</p>
            <p>Questions? Contact us at <a href="mailto:support@enerwise.uk" style="color: #10b981;">support@enerwise.uk</a></p>
          </div>
        </body>
        </html>
      `
    };
  }

  // Lead alert for installers
  generateLeadAlertEmail(installerEmail: string, installerName: string, leadDetails: any): EmailTemplate {
    return {
      to: installerEmail,
      subject: 'New Lead Alert - Enerwise Installer Portal',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Lead Alert</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #3b82f6, #1d4ed8); padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 28px;">
              Ener<span style="color: #dbeafe;">wise</span>
            </h1>
            <p style="color: #dbeafe; margin: 10px 0 0 0; font-size: 16px;">Installer Portal</p>
          </div>
          
          <div style="background: #f9fafb; padding: 40px 30px; border-radius: 0 0 8px 8px;">
            <h2 style="color: #1f2937; margin-bottom: 20px;">New Quote Opportunity!</h2>
            
            <p style="margin-bottom: 20px; font-size: 16px;">
              Hello ${installerName}, a new customer in your service area is looking for renewable energy solutions that match your expertise.
            </p>
            
            <div style="background: white; border: 1px solid #e5e7eb; border-radius: 8px; padding: 25px; margin: 25px 0;">
              <h3 style="color: #3b82f6; margin-bottom: 15px; font-size: 18px;">Lead Details</h3>
              <div style="color: #6b7280; font-size: 14px; line-height: 1.8;">
                <p><strong>Location:</strong> ${leadDetails.area || 'Service Area'}</p>
                <p><strong>Systems Required:</strong> ${leadDetails.systemTypes?.join(', ') || 'Renewable Energy Systems'}</p>
                <p><strong>Budget Range:</strong> ${leadDetails.budget || 'As specified'}</p>
                <p><strong>Timeline:</strong> ${leadDetails.timeframe || 'As discussed'}</p>
                <p><strong>Property Type:</strong> ${leadDetails.propertyType || 'Residential'}</p>
              </div>
            </div>
            
            <div style="background: #fef3c7; border: 1px solid #f59e0b; border-radius: 6px; padding: 15px; margin: 20px 0;">
              <p style="margin: 0; font-size: 14px; color: #92400e;">
                <strong>⚡ Act Fast:</strong> This lead is available to all qualified installers in the area. Submit your quote early to increase your chances.
              </p>
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="https://enerwise.uk/installer-portal" style="background: #3b82f6; color: white; padding: 15px 30px; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 16px; display: inline-block;">
                View Full Details & Quote
              </a>
            </div>
            
            <div style="border-top: 1px solid #e5e7eb; padding-top: 20px; margin-top: 30px;">
              <p style="margin-bottom: 15px; font-size: 14px; color: #6b7280;">
                <strong>How to respond:</strong>
              </p>
              <ul style="color: #6b7280; font-size: 14px; margin-left: 20px;">
                <li>Log into your installer portal to view complete requirements</li>
                <li>Submit a detailed, competitive quote with timeline</li>
                <li>Include any relevant certifications and previous work examples</li>
                <li>Respond within 24 hours for best results</li>
              </ul>
            </div>
            
            <p style="margin-top: 25px; font-size: 14px; color: #6b7280;">
              Questions about this lead? Contact our installer support team.
            </p>
          </div>
          
          <div style="text-align: center; padding: 20px; font-size: 12px; color: #9ca3af;">
            <p>&copy; 2025 Enerwise. Connecting renewable energy professionals with customers.</p>
            <p>Support: <a href="mailto:installers@enerwise.uk" style="color: #3b82f6;">installers@enerwise.uk</a></p>
          </div>
        </body>
        </html>
      `
    };
  }

  // Password reset email
  generatePasswordResetEmail(email: string, resetToken: string, accountType: 'customer' | 'installer'): EmailTemplate {
    const resetUrl = `https://enerwise.uk/reset-password?token=${resetToken}&type=${accountType}`;
    const accountTypeDisplay = accountType === 'customer' ? 'Customer' : 'Installer';

    return {
      to: email,
      subject: 'Reset Your Enerwise Password',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Reset Your Password</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #10b981, #059669); padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 28px;">
              Ener<span style="color: #d1fae5;">wise</span>
            </h1>
            <p style="color: #d1fae5; margin: 10px 0 0 0; font-size: 16px;">Password Reset Request</p>
          </div>
          
          <div style="background: #f9fafb; padding: 40px 30px; border-radius: 0 0 8px 8px;">
            <h2 style="color: #1f2937; margin-bottom: 20px;">Reset Your Password</h2>
            
            <p style="margin-bottom: 20px; font-size: 16px;">
              We received a request to reset the password for your ${accountTypeDisplay.toLowerCase()} account. Click the button below to create a new password.
            </p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${resetUrl}" style="background: #10b981; color: white; padding: 15px 30px; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 16px; display: inline-block;">
                Reset Password
              </a>
            </div>
            
            <p style="margin-bottom: 15px; font-size: 14px; color: #6b7280;">
              If the button doesn't work, copy and paste this link into your browser:
            </p>
            <p style="margin-bottom: 25px; font-size: 14px; color: #10b981; word-break: break-all;">
              ${resetUrl}
            </p>
            
            <div style="background: #fef2f2; border: 1px solid #f87171; border-radius: 6px; padding: 15px; margin: 20px 0;">
              <p style="margin: 0; font-size: 14px; color: #dc2626;">
                <strong>Security Notice:</strong> This password reset link will expire in 1 hour. If you didn't request this reset, please ignore this email and your password will remain unchanged.
              </p>
            </div>
            
            <p style="margin-top: 25px; font-size: 14px; color: #6b7280;">
              For security reasons, we recommend choosing a strong password that includes uppercase and lowercase letters, numbers, and special characters.
            </p>
          </div>
          
          <div style="text-align: center; padding: 20px; font-size: 12px; color: #9ca3af;">
            <p>&copy; 2025 Enerwise. Helping UK homeowners transition to renewable energy.</p>
            <p>Questions? Contact us at <a href="mailto:support@enerwise.uk" style="color: #10b981;">support@enerwise.uk</a></p>
          </div>
        </body>
        </html>
      `
    };
  }
}

export const emailService = new EmailService();