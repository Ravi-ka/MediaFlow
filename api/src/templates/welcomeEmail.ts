interface WelcomeEmailContent {
  subject: string;
  html: string;
  text: string;
}

export const buildWelcomeEmail = (
  email: string,
  subscriptionTier: "FREE" | "PREMIUM"
): WelcomeEmailContent => {
  const tierLabel = subscriptionTier === "PREMIUM" ? "Premium" : "Free";

  return {
    subject: "Welcome to MediaFlow",
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #1a1a1a;">
        <h1 style="margin-bottom: 8px;">Welcome to MediaFlow</h1>
        <p>Hi ${email},</p>
        <p>Your account has been created successfully on the <strong>${tierLabel}</strong> plan.</p>
        <p>You can now sign in and start uploading, processing, and sharing your media assets.</p>
        <p style="margin-top: 24px;">— The MediaFlow Team</p>
      </div>
    `,
    text: [
      "Welcome to MediaFlow",
      "",
      `Hi ${email},`,
      "",
      `Your account has been created successfully on the ${tierLabel} plan.`,
      "You can now sign in and start uploading, processing, and sharing your media assets.",
      "",
      "— The MediaFlow Team",
    ].join("\n"),
  };
};
