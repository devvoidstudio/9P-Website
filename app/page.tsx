import About from "@/components/About";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Staff from "@/components/Staff";
import ClanWars from "@/components/ClanWars";
import Tryouts from "@/components/Tryouts";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />
        <About />
        <Staff />
        <ClanWars />
        <Tryouts />
        <Footer />
      </main>
    </>
  );
}