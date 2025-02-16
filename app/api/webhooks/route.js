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
