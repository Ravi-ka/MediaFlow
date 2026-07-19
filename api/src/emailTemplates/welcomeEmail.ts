interface WelcomeEmailContent {
  subject: string;
  html: string;
  text: string;
}

export const buildWelcomeEmail = (
  email: string,
  first_name: string,
  last_name: string,
  username: string
): WelcomeEmailContent => {
  const tierLabel =  "Free";

  return {
    subject: "Welcome to Imadeo",
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #1a1a1a;">
        <h1 style="margin-bottom: 8px;">Welcome to Imadeo</h1>
        <p>Hi ${first_name} ${last_name},</p>
        <p>Your username is <strong>${username}</strong>.</p>
        <p>Your account has been created successfully on the <strong>${tierLabel}</strong> plan.</p>
        <p>You can now sign in and start uploading, processing, and sharing your media assets.</p>
        <p style="margin-top: 24px;">— The Imadeo Team</p>
      </div>
    `,
    text: [
      "Welcome to Imadeo",
      "",
      `Hi ${email},`,
      "",
      `Your account has been created successfully on the ${tierLabel} plan.`,
      "You can now sign in and start uploading, processing, and sharing your media assets.",
      "",
      "— The Imadeo Team",
    ].join("\n"),
  };
};
