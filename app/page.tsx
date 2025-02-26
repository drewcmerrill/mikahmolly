// import Image from "next/image";
// import About from "@/components/About";
// import Footer from "@/components/Footer";
// import Grid from "@/components/Grid";
import Hero from "@/components/Hero";
import Products from "@/components/Products";
import { FloatingNav } from "@/components/ui/floating-navbar";
import InstagramButton from "@/components/ui/instagram-button";
import { navItems } from "@/data";
import { FaInstagram } from "react-icons/fa";

export default function Home() {
  return (
    <main className="relative flex justify-center items-center flex-col mx-auto sm:px-10 px-5 overflow-clip my-5">
      <FloatingNav navItems={navItems} />
      <Hero />
      {/* <InfiniteCards /> */}
      <Products />
      <InstagramButton
        title="Our Instagram"
        icon={<FaInstagram />}
        position="right"
      />
    </main>
  );
}
