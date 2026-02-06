import {
  TransactionalEmailsApi,
  SendSmtpEmail,
  TransactionalEmailsApiApiKeys,
} from "@getbrevo/brevo";

/**
 * BrevoClient class to handle Brevo API initialization and authentication
 * This wrapper avoids the protected 'authentications' property issue in v3.0+
 */
export class BrevoClient {
  private emailApi: TransactionalEmailsApi;
  private isInitialized: boolean = false;

  /**
   * Initialize the Brevo client with API key
   * @param apiKey Brevo API key (format: xkeysib-xxxxxxxxx)
   */
  constructor(apiKey: string) {
    this.emailApi = new TransactionalEmailsApi();
    this.emailApi.setApiKey(TransactionalEmailsApiApiKeys.apiKey, apiKey);
    this.isInitialized = true;
  }

  /**
   * Send a transactional email
   * @param params Email parameters
   * @returns Promise with the API response
   */
  async sendEmail(params: {
    to: { email: string; name?: string }[];
    subject: string;
    text: string;
    sender: { name: string; email: string };
  }) {
    if (!this.isInitialized) {
      throw new Error("BrevoClient not initialized with API key");
    }

    try {
      // Create the email object
      const emailData = new SendSmtpEmail();
      emailData.to = params.to;
      emailData.subject = params.subject;
      emailData.textContent = params.text;
      emailData.sender = params.sender;

      // Send the email
      const response = await this.emailApi.sendTransacEmail(emailData);

      return {
        success: true,
        messageId: response.body.messageId,
        response: response.body,
      };
    } catch (error) {
      console.error("Brevo API Error:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred";
      throw new Error(`Failed to send email: ${errorMessage}`);
    }
  }

  /**
   * Get the underlying TransactionalEmailsApi instance (for advanced usage)
   * @returns TransactionalEmailsApi instance
   */
  getEmailApi(): TransactionalEmailsApi {
    if (!this.isInitialized) {
      throw new Error("BrevoClient not initialized with API key");
    }
    return this.emailApi;
  }
}

// Create and export a default instance with API key from environment
export const brevoClient = new BrevoClient(
  process.env.BREVO_API_KEY || "xkeysib-YOUR_API_KEY_HERE",
);
