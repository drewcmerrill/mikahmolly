import Stripe from "stripe";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer"; // Use import instead of require

export const config = {
  api: {
    bodyParser: false, // Disable built-in body parsing
  },
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

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

      const customerEmail = event.data.object.customer_details?.email;
      if (customerEmail) {
        await sendEmailWithAttachment(customerEmail);
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
    text: "Thank you for your purchase! Attached is the workout plan!.",
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
