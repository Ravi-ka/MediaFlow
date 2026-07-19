import { Resend } from "resend";
import logger from "../utils/logger";
import { buildWelcomeEmail } from "../emailTemplates/welcomeEmail";

const resendApiKey = process.env.RESEND_API_KEY;
const emailFrom =
  process.env.EMAIL_FROM || "Imadeo <onboarding@resend.dev>";

let resendClient: Resend | null = null;

const getResendClient = (): Resend | null => {
  if (!resendApiKey) {
    return null;
  }

  if (!resendClient) {
    resendClient = new Resend(resendApiKey);
  }
  return resendClient;
};

export const sendWelcomeEmail = async (
  email: string,
  first_name: string,
  last_name: string,
  username: string
): Promise<void> => {
  const resend = getResendClient();

  if (!resend) {
    logger.warn("Welcome email skipped: RESEND_API_KEY is not configured", {
      email,
    });
    return;
  }

  const { subject, html, text } = buildWelcomeEmail(email, first_name, last_name, username);

  try {
    const { error } = await resend.emails.send({
      from: emailFrom,
      to: [email],
      subject,
      html,
      text,
    });

    if (error) {
      throw error;
    }

    logger.info("Welcome email sent", { email, first_name, last_name, username });
  } catch (error) {
    logger.error("Failed to send welcome email", { email, first_name, last_name, username, error });
  }
};
