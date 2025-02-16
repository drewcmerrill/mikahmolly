import { buffer } from "micro";
import Stripe from "stripe";
import nodemailer from "nodemailer";

export const config = {
  api: {
    bodyParser: false, // Required for Stripe webhooks
  },
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    const payload = await buffer(req);
    const sig = req.headers.get("stripe-signature");

    const event = stripe.webhooks.constructEvent(
      payload,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );

    if (event.type === "checkout.session.completed") {
      console.log("✅ Payment successful:", event.data.object);

      // Get customer email from session
      const customerEmail = event.data.object.customer_details.email;

      // Send email with attachment
      await sendEmailWithAttachment(customerEmail);
    }

    return new Response(JSON.stringify({ received: true }), { status: 200 });
  } catch (error) {
    console.error("❌ Webhook Error:", error);
    return new Response(`Webhook error: ${error.message}`, { status: 400 });
  }
}

async function sendEmailWithAttachment(toEmail) {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  let mailOptions = {
    from: '"Your Store" <orders@example.com>',
    to: toEmail,
    subject: "Your Order Confirmation",
    text: "Thank you for your purchase! Attached is your invoice.",
    attachments: [
      {
        filename: "workout.pdf",
        path: "/root/media/workout.pdf",
        contentType: "application/pdf",
      },
    ],
  };

  await transporter.sendMail(mailOptions);
  console.log(`📧 Email sent to ${toEmail}`);
}
