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
      subject: `🌐 Portfolio Inquiry: ${projectName} (${userEmail})`,
      attachments: attachments.length > 0 ? attachments : undefined,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 650px; margin: 0 auto; padding: 0; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; background-color: #ffffff;">
          
          <!-- Header Banner -->
          <div style="background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%); color: #ffffff; padding: 24px; text-align: center;">
            <span style="background-color: rgba(255, 255, 255, 0.2); padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: bold; letter-spacing: 1px; text-transform: uppercase;">
              New Lead from Portfolio Website
            </span>
            <h1 style="margin: 12px 0 0 0; font-size: 24px; font-weight: 800;">${projectName}</h1>
          </div>

          <div style="padding: 24px;">
            <!-- Source Alert Box -->
            <div style="background-color: #eef2ff; border-left: 4px solid #6366f1; padding: 14px; border-radius: 6px; margin-bottom: 24px;">
              <p style="margin: 0; font-size: 13px; color: #374151; font-weight: bold;">
                📌 Source Notice:
              </p>
              <p style="margin: 4px 0 0 0; font-size: 13px; color: #4338ca; line-height: 1.4;">
                This message was submitted directly through the <strong>Contact / Hire Me Modal</strong> on your portfolio website.
              </p>
            </div>

            <!-- Client Info Card -->
            <div style="margin-bottom: 20px; padding: 16px; background-color: #f8fafc; border-radius: 8px; border: 1px solid #f1f5f9;">
              <h2 style="color: #64748b; font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em; margin: 0 0 6px 0;">Client Email Address</h2>
              <p style="color: #0f172a; font-size: 16px; font-weight: bold; margin: 0;">
                <a href="mailto:${userEmail}" style="color: #4f46e5; text-decoration: none;">${userEmail}</a>
              </p>
            </div>

            <!-- Project Name -->
            <div style="margin-bottom: 20px; padding: 16px; background-color: #f8fafc; border-radius: 8px; border: 1px solid #f1f5f9;">
              <h2 style="color: #64748b; font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em; margin: 0 0 6px 0;">Project Idea / Name</h2>
              <p style="color: #0f172a; font-size: 16px; font-weight: 600; margin: 0;">${projectName}</p>
            </div>

            <!-- Project Details -->
            <div style="margin-bottom: 24px; padding: 16px; background-color: #f8fafc; border-radius: 8px; border: 1px solid #f1f5f9;">
              <h2 style="color: #64748b; font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em; margin: 0 0 6px 0;">Message / Details</h2>
              <p style="color: #334155; font-size: 15px; line-height: 1.6; margin: 0; white-space: pre-wrap;">${details}</p>
            </div>

            <!-- Attachment -->
            ${
              file && file.size > 0
                ? `
            <div style="padding: 14px; background-color: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; margin-bottom: 24px;">
              <span style="color: #166534; font-weight: bold; font-size: 13px;">📎 Attachment Attached:</span>
              <span style="color: #15803d; font-size: 13px; margin-left: 6px;">${file.name} (${(file.size / 1024).toFixed(1)} KB)</span>
            </div>
            `
                : `
            <p style="color: #94a3b8; font-size: 13px; font-style: italic; margin-bottom: 24px;">No file attachments were included.</p>
            `
            }

            <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 24px 0;" />

            <div style="text-align: center; color: #64748b; font-size: 13px;">
              <p style="margin: 0 0 4px 0;">To reply to the client, simply click <strong>"Reply"</strong> in your email client.</p>
              <p style="margin: 0; color: #94a3b8; font-size: 11px;">Sent automatically via Portfolio Website Server Action (Resend API).</p>
            </div>
          </div>
        </div>
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
