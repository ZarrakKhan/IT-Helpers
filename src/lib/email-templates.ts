import type { ContactFormData } from "@/types/contact";
import { escapeHtml } from "@/lib/utils";

/**
 * Table-based layout with inline styles (no external CSS/images/tracking
 * pixels) — the pattern that renders consistently across Gmail, Outlook,
 * and mobile mail clients, most of which strip `<style>` blocks.
 */
export function contactFormEmailHtml(data: ContactFormData): string {
  const name = escapeHtml(data.name.trim());
  const email = escapeHtml(data.email.trim());
  const phone = data.phone?.trim() ? escapeHtml(data.phone.trim()) : null;
  const service = data.service?.trim() ? escapeHtml(data.service.trim()) : null;
  const message = escapeHtml(data.message.trim()).replace(/\n/g, "<br />");

  return `<!doctype html>
<html>
  <body style="margin:0;padding:0;background-color:#f1f5f9;font-family:Arial,Helvetica,sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f1f5f9;padding:24px 0;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background-color:#ffffff;border-radius:8px;overflow:hidden;">
            <tr>
              <td style="background-color:#0f172a;padding:20px 24px;">
                <span style="color:#ffffff;font-size:18px;font-weight:bold;">IT Helpers</span>
              </td>
            </tr>
            <tr>
              <td style="padding:24px;">
                <h1 style="margin:0 0 16px;font-size:18px;color:#0f172a;">New contact form submission</h1>
                ${service ? `<p style="margin:0 0 12px;font-size:14px;color:#64748b;"><strong>Service:</strong> ${service}</p>` : ""}
                <p style="margin:0 0 8px;font-size:14px;color:#0f172a;"><strong>Name:</strong> ${name}</p>
                <p style="margin:0 0 8px;font-size:14px;color:#0f172a;"><strong>Email:</strong> ${email}</p>
                ${phone ? `<p style="margin:0 0 8px;font-size:14px;color:#0f172a;"><strong>Phone:</strong> ${phone}</p>` : ""}
                <p style="margin:16px 0 4px;font-size:14px;color:#0f172a;"><strong>Message:</strong></p>
                <p style="margin:0;font-size:14px;color:#334155;line-height:1.6;">${message}</p>
              </td>
            </tr>
            <tr>
              <td style="background-color:#f1f5f9;padding:16px 24px;">
                <p style="margin:0;font-size:12px;color:#64748b;">Sent from the ithelper.com.au contact form.</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}
