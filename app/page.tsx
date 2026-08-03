import About from "@/components/About";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import StaffSection from "@/components/StaffSection";
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
        <StaffSection />
        <ClanWars />
        <Tryouts />
        <Footer />
      </main>
    </>
  );
}