import { redirect } from "next/navigation";

import { stripe } from "../../lib/stripe";
import { Highlight } from "@/components/ui/hero-highlight";
import DownloadButton from "@/components/ui/download-button";
import InstagramButton from "@/components/ui/instagram-button";
import { FaInstagram } from "react-icons/fa";
import { FloatingNav } from "@/components/ui/floating-navbar";
import { navItems } from "@/data";

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
        <FloatingNav navItems={navItems} />
        <Highlight
          className="text-black p-2 text-2xl lg:text-5xl justify-center text-center mt-10"
          duration={1}
        >
          THANK YOU FOR YOUR ORDER
        </Highlight>
        <p className="lg:text-3xl text-center mt-5">
          Your 12 Week Hybrid Workout Program will be emailed to {customerEmail}
          , or download it below!
        </p>
        <DownloadButton />
        <p className="my-5 text-center">
          If you have any questions or concerns please reach out to us at
          mikahandmolly@gmail.com or DM us on Instagram!
        </p>

        <InstagramButton
          title="Our Instagram"
          icon={<FaInstagram />}
          position="right"
        />
      </div>
    );
  }
}
