"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY || "");

export async function sendInquiry(formData: FormData) {
  const projectName = (formData.get("projectName") as string) || "Untitled Project";
  const userEmail = formData.get("userEmail") as string;
  const details = formData.get("details") as string;
  const file = formData.get("file") as File | null;

  if (!process.env.RESEND_API_KEY) {
    return {
      success: false,
      error: "RESEND_API_KEY is not configured in .env file. Please add your Resend API Key.",
    };
  }

  try {
    const attachments = [];
    if (file && file.size > 0) {
      const buffer = Buffer.from(await file.arrayBuffer());
      attachments.push({
        filename: file.name,
        content: buffer,
      });
    }

    const recipientEmail = process.env.MY_EMAIL || "muksitul44@gmail.com";

    const { data, error } = await resend.emails.send({
      from: "Portfolio Inquiry <onboarding@resend.dev>",
      to: [recipientEmail],
      replyTo: userEmail,
      subject: `Muksitul's Portfolio: ${projectName} (${userEmail})`,
      attachments: attachments.length > 0 ? attachments : undefined,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: Arial, Helvetica, sans-serif; background-color: #ffffff; margin: 0; padding: 0; color: #111827; width: 100%;">
          
          <div style="width: 100%; box-sizing: border-box; background-color: #ffffff; padding: 32px;">
            
            <!-- Header -->
            <div style="border-bottom: 2px solid #111827; padding-bottom: 16px; margin-bottom: 24px; width: 100%;">
              <p style="margin: 0 0 6px 0; font-size: 13px; font-weight: bold; color: #6b7280; text-transform: uppercase; letter-spacing: 1px;">
                New Portfolio Inquiry
              </p>
              <h1 style="margin: 0; font-size: 26px; font-weight: bold; color: #111827;">
                ${projectName}
              </h1>
            </div>

            <!-- Source Notice -->
            <div style="background-color: #f3f4f6; border-left: 4px solid #374151; padding: 14px 18px; margin-bottom: 28px; border-radius: 4px; width: 100%; box-sizing: border-box;">
              <p style="margin: 0; font-size: 15px; color: #374151; font-weight: bold;">
                Source Notice:
              </p>
              <p style="margin: 4px 0 0 0; font-size: 15px; color: #4b5563;">
                This email was sent by a visitor using the <strong>Contact Modal</strong> on your portfolio website.
              </p>
            </div>

            <!-- Client Email -->
            <div style="margin-bottom: 24px; width: 100%;">
              <p style="margin: 0 0 4px 0; font-size: 13px; font-weight: bold; color: #6b7280; text-transform: uppercase; letter-spacing: 0.5px;">
                Client Email Address
              </p>
              <p style="margin: 0; font-size: 19px; font-weight: bold; color: #111827;">
                <a href="mailto:${userEmail}" style="color: #111827; text-decoration: underline;">${userEmail}</a>
              </p>
            </div>

            <!-- Project Name -->
            <div style="margin-bottom: 28px; width: 100%;">
              <p style="margin: 0 0 4px 0; font-size: 13px; font-weight: bold; color: #6b7280; text-transform: uppercase; letter-spacing: 0.5px;">
                Project Name / Idea
              </p>
              <p style="margin: 0; font-size: 19px; font-weight: bold; color: #111827;">
                ${projectName}
              </p>
            </div>

            <!-- Message Details -->
            <div style="margin-bottom: 32px; background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 6px; padding: 24px; width: 100%; box-sizing: border-box;">
              <p style="margin: 0 0 12px 0; font-size: 13px; font-weight: bold; color: #6b7280; text-transform: uppercase; letter-spacing: 0.5px;">
                Message & Project Details
              </p>
              <div style="font-size: 18px; line-height: 1.8; color: #111827; white-space: pre-wrap; word-break: break-word;">
${details}
              </div>
            </div>

            <!-- Attachment -->
            ${
              file && file.size > 0
                ? `
            <div style="margin-bottom: 32px; padding: 16px 20px; background-color: #f3f4f6; border: 1px solid #d1d5db; border-radius: 6px; width: 100%; box-sizing: border-box;">
              <p style="margin: 0; font-size: 16px; color: #111827; font-weight: bold;">
                📎 Attachment: <span style="font-weight: normal; color: #374151;">${file.name} (${(file.size / 1024).toFixed(1)} KB)</span>
              </p>
            </div>
            `
                : `
            <p style="margin: 0 0 32px 0; font-size: 15px; color: #9ca3af; font-style: italic;">
              No file attachments included.
            </p>
            `
            }

            <hr style="border: 0; border-top: 1px solid #e5e7eb; margin: 32px 0 24px 0; width: 100%;" />

            <!-- Footer -->
            <div style="font-size: 14px; color: #6b7280; text-align: left; width: 100%;">
              <p style="margin: 0 0 6px 0;">
                Click <strong>"Reply"</strong> in your email client to send a message directly to <strong>${userEmail}</strong>.
              </p>
              <p style="margin: 0; font-size: 12px; color: #9ca3af;">
                Sent via Portfolio Website (Resend API)
              </p>
            </div>

          </div>
        </body>
        </html>
      `,
    });

    if (error) {
      console.error("Resend Error:", error);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (err: any) {
    console.error("sendInquiry Error:", err);
    return { success: false, error: err?.message || "An unexpected error occurred." };
  }
}
