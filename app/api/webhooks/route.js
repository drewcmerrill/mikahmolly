import { NextResponse } from "next/server";
import Stripe from "stripe";
import nodemailer from "nodemailer";

// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  const payload = await req.text();
  const sig = req.headers.get("stripe-signature");

  try {
    // Verify the webhook signature
    const event = stripe.webhooks.constructEvent(
      payload,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const customerEmail = session.customer_details.email;

      console.log(
        "Payment successful! Sending confirmation email to:",
        customerEmail
      );

      // Configure email transport
      const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      // Send the confirmation email
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: customerEmail,
        subject: "Order Confirmation",
        text: `Thank you for your order! Your payment was successful.`,
        html: `<p>Thank you for your order! Your payment has been successfully processed.</p>`,
      };

      await transporter.sendMail(mailOptions);
      console.log("Email sent to:", customerEmail);

      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 400 }
    );
  }
}
