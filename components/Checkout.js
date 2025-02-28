"use client";

import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { BackgroundGradient } from "./ui/background-gradient";
import { Highlight } from "@/components/ui/hero-highlight";

import { fetchClientSecret } from "../actions/stripe";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

export default function Checkout() {
  return (
    <div className="flex flex-col items-center  mt-7 max-w-[68rem]">
      <p className="lg:text-3xl text-center mt-5">
        After years of running and lifting experience, we have compiled
        everything we’ve learned into a 12 Week Running and Lifting Workout
        Program. <br />
        <br />
        This workout program consists of 3 weightlifting sessions a week and 3
        running sessions a week. Be consistent with your training and you will
        see results. <br />
        <br />
        Thank you for making this possible.
      </p>

      <Highlight
        className="text-black p-2 text-2xl lg:text-5xl justify-center text-center mt-10"
        duration={1}
      >
        Get it done.
      </Highlight>
      <div
        id="checkout"
        className="max-w-[68rem] w-full overflow-hidden rounded-[20px] mt-10"
      >
        <BackgroundGradient className="rounded-[22px] p-4 sm:p-10 bg-white dark:bg-zinc-900">
          <EmbeddedCheckoutProvider
            stripe={stripePromise}
            options={{ fetchClientSecret }}
          >
            <EmbeddedCheckout />
          </EmbeddedCheckoutProvider>
        </BackgroundGradient>
      </div>
    </div>
  );
}
