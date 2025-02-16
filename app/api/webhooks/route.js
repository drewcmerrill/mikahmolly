import { buffer } from "micro";
import Stripe from "stripe";
import nodemailer from "nodemailer";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const config = {
  api: {
    bodyParser: false, // Required for Stripe webhooks
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).send("Method Not Allowed");
  }

  const payload = await buffer(req);
  const sig = req.headers["stripe-signature"];

  try {
    // Verify webhook signature
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

    return res.json({ received: true });
  } catch (error) {
    console.error("❌ Webhook Error:", error);
    return res.status(400).send(`Webhook error: ${error.message}`);
  }
}

async function sendEmailWithAttachment(toEmail) {
  let transporter = nodemailer.createTransport({
    service: "gmail", // Or use SMTP details for another provider
    auth: {
      user: process.env.EMAIL_USER, // Your email
      pass: process.env.EMAIL_PASS, // Your email password or app password
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
