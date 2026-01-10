import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, subject, message, adminEmail } = await req.json();
    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

    if (!RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY is not configured");
    }

    console.log("Sending contact form emails for:", email);

    // Send notification to admin
    if (adminEmail) {
      const adminRes = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: "Contact Form <onboarding@resend.dev>",
          to: [adminEmail],
          subject: `New Contact: ${subject}`,
          html: `
            <h2>New Contact Form Submission</h2>
            <p><strong>From:</strong> ${name} (${email})</p>
            <p><strong>Subject:</strong> ${subject}</p>
            <hr />
            <p><strong>Message:</strong></p>
            <p>${message.replace(/\n/g, '<br>')}</p>
            <hr />
            <p style="color: #666; font-size: 12px;">Reply directly to this email to respond to ${name}.</p>
          `,
          reply_to: email,
        }),
      });

      if (!adminRes.ok) {
        console.error("Admin email error:", await adminRes.text());
      }
    }

    // Send confirmation to user
    const userRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "AiSphere Daily <onboarding@resend.dev>",
        to: [email],
        subject: "We received your message!",
        html: `
          <h2>Thank you for contacting us, ${name}!</h2>
          <p>We have received your message and will get back to you as soon as possible.</p>
          <p><strong>Your message:</strong></p>
          <blockquote style="border-left: 3px solid #ccc; padding-left: 15px; color: #666;">
            ${message.replace(/\n/g, '<br>')}
          </blockquote>
          <p>Best regards,<br>The AiSphere Daily Team</p>
        `,
      }),
    });

    if (!userRes.ok) {
      const errorText = await userRes.text();
      console.error("User email error:", errorText);
      throw new Error(`Failed to send confirmation email: ${errorText}`);
    }

    console.log("Emails sent successfully");

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }
});
