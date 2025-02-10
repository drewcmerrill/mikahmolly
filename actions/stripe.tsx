"use server";

import { headers } from "next/headers";

import { stripe } from "../lib/stripe";

export async function fetchClientSecret() {
  const origin = (await headers()).get("origin");

  // Create Checkout Sessions from body params.
  const session = await stripe.checkout.sessions.create({
    ui_mode: "embedded",
    line_items: [
      {
        // Provide the exact Price ID (for example, pr_1234) of
        // the product you want to sell
        price: "price_1Qr4TUCROlPmOkC65Q1dITe9",
        quantity: 1,
      },
    ],
    mode: "payment",
    return_url: `${origin}/ordercomplete?session_id={CHECKOUT_SESSION_ID}`,
  });

  return session.client_secret;
}
