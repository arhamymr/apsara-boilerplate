/**
 * Type definitions for email functionality
 */

export interface EmailRecipient {
  email: string;
  name?: string;
}

export interface EmailSender {
  name: string;
  email: string;
}

export interface SendEmailParams {
  to: EmailRecipient[] | string;
  subject: string;
  text: string;
}

export interface SendEmailResult {
  success: boolean;
  messageId?: string;
  error?: string;
}
