import { brevoClient, BrevoClient } from "./brevo-client";
import {
  SendEmailParams,
  SendEmailResult,
  EmailSender,
  EmailRecipient,
} from "../../types/email";

// Default sender configuration
// TODO: Replace with your actual sender information
const defaultSender: EmailSender = {
  name: "Your App Name",
  email: "noreply@yourapp.com",
};

/**
 * Send an email using Brevo API
 * @param params Email parameters (to, subject, text)
 * @returns Promise with the result of the email sending operation
 */
export const sendEmail = async (
  params: SendEmailParams,
): Promise<SendEmailResult> => {
  try {
    // Convert the 'to' parameter to the expected format
    let recipients: EmailRecipient[];
    if (Array.isArray(params.to)) {
      recipients = params.to.map((email) =>
        typeof email === "string" ? { email } : email,
      );
    } else {
      recipients = [{ email: params.to }];
    }

    // Send email using BrevoClient
    const result = await brevoClient.sendEmail({
      to: recipients,
      subject: params.subject,
      text: params.text,
      sender: defaultSender,
    });

    return {
      success: true,
      messageId: result.messageId,
    };
  } catch (error) {
    console.error("Failed to send email:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    return {
      success: false,
      error: errorMessage,
    };
  }
};

/**
 * Send an email with custom sender
 * @param params Email parameters (to, subject, text)
 * @param sender Custom sender information
 * @returns Promise with the result of the email sending operation
 */
export const sendEmailWithCustomSender = async (
  params: SendEmailParams,
  sender: EmailSender,
): Promise<SendEmailResult> => {
  try {
    // Convert the 'to' parameter to the expected format
    let recipients: EmailRecipient[];
    if (Array.isArray(params.to)) {
      recipients = params.to.map((email) =>
        typeof email === "string" ? { email } : email,
      );
    } else {
      recipients = [{ email: params.to }];
    }

    // Send email using BrevoClient with custom sender
    const result = await brevoClient.sendEmail({
      to: recipients,
      subject: params.subject,
      text: params.text,
      sender,
    });

    return {
      success: true,
      messageId: result.messageId,
    };
  } catch (error) {
    console.error("Failed to send email:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    return {
      success: false,
      error: errorMessage,
    };
  }
};

/**
 * Create a new BrevoClient instance with custom API key
 * @param apiKey Brevo API key
 * @returns BrevoClient instance
 */
export const createBrevoClient = (apiKey: string): BrevoClient => {
  return new BrevoClient(apiKey);
};
