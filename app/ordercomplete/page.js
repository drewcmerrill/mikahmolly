import { redirect } from "next/navigation";

import { stripe } from "../../lib/stripe";
import { Highlight } from "@/components/ui/hero-highlight";
import DownloadButton from "@/components/ui/download-button";

export default async function Return({ searchParams }) {
  const { session_id } = await searchParams;

  if (!session_id)
    throw new Error("Please provide a valid session_id (`cs_test_...`)");

  const {
    status,
    customer_details: { email: customerEmail },
  } = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ["line_items", "payment_intent"],
  });

  if (status === "open") {
    return redirect("/");
  }

  if (status === "complete") {
    return (
      <div className="flex items-center flex-col p-10">
        <Highlight className="text-black p-2 text-5xl" duration={1}>
          THANK YOU FOR YOUR ORDER
        </Highlight>
        <p className="text-3xl text-center mt-5">
          Your 12 Week Hybrid Workout Program will be emailed to {customerEmail}
          . Or download it below!
        </p>
        <DownloadButton />
        <div>
          <p className="mt-5">
            If you have any questions or concerns please reach out to us at
            mikahandmolly@gmail.com
          </p>
        </div>
      </div>
    );
  }
}
