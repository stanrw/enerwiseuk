import crypto from 'crypto';
import { emailService } from './email-service';

export function generateVerificationToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

export function generatePasswordResetToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

export function hashPassword(password: string): string {
  // Simple base64 encoding for now - would use bcrypt in production
  return Buffer.from(password).toString('base64');
}

export function verifyPassword(password: string, hashedPassword: string): boolean {
  const hashedInput = Buffer.from(password).toString('base64');
  return hashedInput === hashedPassword;
}

export function getTokenExpiration(): Date {
  // Token expires in 24 hours for email verification, 1 hour for password reset
  return new Date(Date.now() + 24 * 60 * 60 * 1000);
}

export function getPasswordResetExpiration(): Date {
  // Password reset expires in 1 hour
  return new Date(Date.now() + 60 * 60 * 1000);
}

export async function sendVerificationEmail(email: string, token: string, accountType: 'customer' | 'installer'): Promise<boolean> {
  const emailTemplate = emailService.generateVerificationEmail(email, token, accountType);
  return await emailService.sendEmail(emailTemplate);
}

export async function sendPasswordResetEmail(email: string, token: string, accountType: 'customer' | 'installer'): Promise<boolean> {
  const emailTemplate = emailService.generatePasswordResetEmail(email, token, accountType);
  return await emailService.sendEmail(emailTemplate);
}

export async function sendQuoteNotification(customerEmail: string, customerName: string, quoteDetails: any): Promise<boolean> {
  const emailTemplate = emailService.generateQuoteNotificationEmail(customerEmail, customerName, quoteDetails);
  return await emailService.sendEmail(emailTemplate);
}

export async function sendLeadAlert(installerEmail: string, installerName: string, leadDetails: any): Promise<boolean> {
  const emailTemplate = emailService.generateLeadAlertEmail(installerEmail, installerName, leadDetails);
  return await emailService.sendEmail(emailTemplate);
}