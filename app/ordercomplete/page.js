import { redirect } from "next/navigation";

import { stripe } from "../../lib/stripe";
import { Highlight } from "@/components/ui/hero-highlight";

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
        <Highlight className="text-black p-2" duration={1}>
          THANK YOU FOR YOUR ORDER
        </Highlight>
        <p>
          Testing! A confirmation email will be sent to {customerEmail}. If you
          have any questions, please email{" "}
        </p>
        {/* <a href="mailto:orders@example.com">orders@example.com</a>. */}
      </div>
    );
  }
}
