// import Image from "next/image";
// import About from "@/components/About";
// import Footer from "@/components/Footer";
// import Grid from "@/components/Grid";
import Hero from "@/components/Hero";
import Checkout from "@/components/Checkout";
import Header from "@/components/Header";

export default function Home() {
  return (
    <main className="background relative flex justify-center items-center flex-col mx-auto sm:px-10 px-5 overflow-clip">
      <div className="max-w-7xl w-full">
        <Header />
        <Hero />
        <Checkout />
        {/* <Grid />
        <About />
        <PhotoScroll />
        <Footer /> */}
      </div>
    </main>
  );
}
