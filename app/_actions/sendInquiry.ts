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
      subject: `Mukstitul's Portfolio: ${projectName} (${userEmail})`,
      attachments: attachments.length > 0 ? attachments : undefined,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; margin: 0; padding: 32px 16px; color: #1e293b;">
          
          <div style="max-width: 680px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05);">
            
            <!-- Header Banner -->
            <div style="background-color: #0f172a; padding: 32px 28px; text-align: left; border-bottom: 4px solid #6366f1;">
              <div style="display: inline-block; background-color: rgba(99, 102, 241, 0.2); color: #818cf8; border: 1px solid rgba(129, 140, 248, 0.3); padding: 6px 14px; border-radius: 20px; font-size: 13px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; margin-bottom: 12px;">
                🌐 PORTFOLIO INQUIRY
              </div>
              <h1 style="margin: 0; color: #ffffff; font-size: 26px; font-weight: 800; line-height: 1.3;">
                ${projectName}
              </h1>
            </div>

            <!-- Main Body -->
            <div style="padding: 32px 28px;">

              <!-- Source Notification Badge -->
              <div style="background-color: #f0f9ff; border-left: 4px solid #0284c7; border-radius: 8px; padding: 16px 20px; margin-bottom: 28px;">
                <p style="margin: 0 0 4px 0; font-size: 15px; font-weight: 700; color: #0369a1;">
                  📌 Source Identification
                </p>
                <p style="margin: 0; font-size: 15px; color: #0c4a6e; line-height: 1.5;">
                  This email was sent via the <strong>Contact / Hire Me Modal</strong> on your portfolio website.
                </p>
              </div>

              <!-- Client Information Section -->
              <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px; margin-bottom: 24px;">
                <p style="margin: 0 0 6px 0; font-size: 13px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px;">
                  Client Email Address
                </p>
                <p style="margin: 0; font-size: 19px; font-weight: 700; color: #0f172a;">
                  <a href="mailto:${userEmail}" style="color: #4f46e5; text-decoration: none;">${userEmail}</a>
                </p>
              </div>

              <!-- Project Title Section -->
              <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px; margin-bottom: 24px;">
                <p style="margin: 0 0 6px 0; font-size: 13px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px;">
                  Project Idea / Name
                </p>
                <p style="margin: 0; font-size: 19px; font-weight: 700; color: #0f172a;">
                  ${projectName}
                </p>
              </div>

              <!-- Details Section -->
              <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 24px; margin-bottom: 28px;">
                <p style="margin: 0 0 10px 0; font-size: 13px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px;">
                  Message & Project Details
                </p>
                <div style="font-size: 17px; line-height: 1.75; color: #1e293b; white-space: pre-wrap; word-break: break-word;">
${details}
                </div>
              </div>

              <!-- File Attachment Section -->
              ${
                file && file.size > 0
                  ? `
              <div style="background-color: #f0fdf4; border: 1px solid #86efac; border-radius: 12px; padding: 18px 20px; margin-bottom: 28px;">
                <p style="margin: 0 0 4px 0; font-size: 15px; font-weight: 700; color: #166534;">
                  📎 Supporting Document Attached
                </p>
                <p style="margin: 0; font-size: 15px; color: #15803d;">
                  File Name: <strong>${file.name}</strong> (${(file.size / 1024).toFixed(1)} KB)
                </p>
              </div>
              `
                  : `
              <div style="background-color: #f8fafc; border: 1px dashed #cbd5e1; border-radius: 12px; padding: 14px 20px; margin-bottom: 28px;">
                <p style="margin: 0; font-size: 14px; color: #94a3b8; font-style: italic;">
                  No supporting documents were attached.
                </p>
              </div>
              `
              }

              <!-- Divider -->
              <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 32px 0 24px 0;" />

              <!-- Footer Call to Action -->
              <div style="text-align: center; background-color: #f1f5f9; border-radius: 12px; padding: 20px; color: #475569;">
                <p style="margin: 0 0 6px 0; font-size: 15px; font-weight: 700; color: #334155;">
                  💬 Direct Response
                </p>
                <p style="margin: 0; font-size: 14px; color: #64748b; line-height: 1.5;">
                  Click <strong>"Reply"</strong> in your email client to send a message directly to <strong>${userEmail}</strong>.
                </p>
              </div>

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
