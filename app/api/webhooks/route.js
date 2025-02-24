import Stripe from "stripe";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const config = {
  api: {
    bodyParser: false, // Disable built-in body parsing
  },
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Store the event IDs to prevent re-sending emails
const processedEvents = new Set();

export async function POST(req) {
  try {
    const rawBody = await req.text(); // Correctly read the raw body
    const sig = req.headers.get("stripe-signature");

    const event = stripe.webhooks.constructEvent(
      rawBody,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );

    if (event.type === "checkout.session.completed") {
      console.log("✅ Payment successful:", event.data.object);

      // Use the event ID to ensure the email is only sent once
      const eventId = event.id;
      if (!processedEvents.has(eventId)) {
        processedEvents.add(eventId); // Mark the event as processed

        const customerEmail = event.data.object.customer_details?.email;
        if (customerEmail) {
          await sendEmailWithAttachment(customerEmail);
        }
      } else {
        console.log("📧 Email already sent for this event.");
      }
    }

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error) {
    console.error("❌ Webhook Error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 400 });
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
    from: '"Mikah & Molly" <mikahandmolly@gmail.com>',
    to: toEmail,
    subject: "Your Order Confirmation",
    text: "Thank you for buying our 12 Week Hybrid Workout plan! We're so excited to share this journey with you!\n Please feel free to reach out with any questions or feedback, you can reply to this email or shoot us a DM on instagram @mikahmolly!\n\n- Mikah & Molly",
    attachments: [
      {
        filename: "Mikah and Molly 12 Week Training Program.pdf",
        path: "/root/media/Mikah and Molly 12 Week Training Program.pdf",
        contentType: "application/pdf",
      },
    ],
  };

  await transporter.sendMail(mailOptions);
  console.log(`📧 Email sent to ${toEmail}`);
}
