"use server";

import { Resend } from 'resend';

// Initialize Resend with an API Key (User will need to provide this in .env)
const resend = new Resend(process.env.RESEND_API_KEY || 're_123456789');

export async function sendInquiry(formData: FormData) {
    const projectName = formData.get('projectName') as string;
    const userEmail = formData.get('userEmail') as string;
    const details = formData.get('details') as string;
    const file = formData.get('file') as File;

    try {
        const { data, error } = await resend.emails.send({
            from: 'Portfolio Inquiry <onboarding@resend.dev>',
            to: ['muksitul44@gmail.com'],
            replyTo: userEmail,
            subject: `New Project Inquiry: ${projectName}`,

            html: `
                <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e5e7eb; border-radius: 12px; background-color: #ffffff;">
                    <div style="text-align: center; margin-bottom: 24px;">
                        <h1 style="color: #1f2937; margin: 0; font-size: 24px;">New Project Inquiry</h1>
                        <p style="color: #6b7280; margin-top: 4px;">You have a new lead from your portfolio!</p>
                    </div>

                    <div style="margin-bottom: 20px; padding: 16px; background-color: #f9fafb; border-radius: 8px;">
                        <h2 style="color: #374151; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 8px;">Contact Information</h2>
                        <p style="color: #111827; font-size: 16px; font-weight: 600; margin: 0;">${userEmail}</p>
                    </div>

                    <div style="margin-bottom: 24px; padding: 16px; background-color: #f9fafb; border-radius: 8px;">
                        <h2 style="color: #374151; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 8px;">Project Name / Idea</h2>
                        <p style="color: #111827; font-size: 18px; font-weight: 600; margin: 0;">${projectName}</p>
                    </div>

                    <div style="margin-bottom: 24px;">
                        <h2 style="color: #374151; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 8px;">Project Details</h2>
                        <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin: 0; white-space: pre-wrap;">${details}</p>
                    </div>

                    ${file && file.size > 0 ? `
                    <div style="padding: 12px; background-color: #eff6ff; border-radius: 8px; border: 1px solid #bfdbfe; display: flex; align-items: center; gap: 8px;">
                        <span style="color: #2563eb; font-weight: 600;">📎 Attachment Info:</span>
                        <span style="color: #1e40af;">${file.name} (File metadata received)</span>
                    </div>
                    ` : `
                    <p style="color: #9ca3af; font-size: 14px; font-style: italic;">No documents were attached.</p>
                    `}

                    <hr style="border: 0; border-top: 1px solid #e5e7eb; margin: 32px 0;" />

                    <div style="text-align: center; color: #9ca3af; font-size: 12px;">
                        <p>This inquiry was sent from your portfolio's Project Modal.</p>
                        <p>Simply click "Reply" to message the client directly at ${userEmail}.</p>
                    </div>
                </div>
            `,
        });


        if (error) {
            console.error('Resend Error:', error);
            return { success: false, error: error.message };
        }

        return { success: true, data };
    } catch (err) {
        console.error('Action Catch:', err);
        return { success: false, error: 'An unexpected error occurred.' };
    }
}
