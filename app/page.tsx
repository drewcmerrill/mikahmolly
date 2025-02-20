// import Image from "next/image";
// import About from "@/components/About";
// import Footer from "@/components/Footer";
// import Grid from "@/components/Grid";
import Hero from "@/components/Hero";
import Products from "@/components/Products";
import { FloatingNav } from "@/components/ui/floating-navbar";
import { navItems } from "@/data";

export default function Home() {
  return (
    <main className="relative flex justify-center items-center flex-col mx-auto sm:px-10 px-5 overflow-clip">
      <div className="max-w-7xl w-full">
        <FloatingNav navItems={navItems} />
        {/* <Header /> */}
        <Hero />
        <Products />
        {/* <Checkout /> */}
        {/* <Grid />
        <About />
        <PhotoScroll />
        <Footer /> */}
      </div>
    </main>
  );
}
