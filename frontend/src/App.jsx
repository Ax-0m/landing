import Header from "./components/Header";
import Hero from "./components/Hero";
import HowItWorks, { Marquee } from "./components/HowItWorks";
import Faq from "./components/Faq";
import ClosingCard from "./components/ClosingCard";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="page" id="top">
      <Header />
      <main>
        <Hero />
        <Marquee />
        <HowItWorks />
        <Faq />
        <ClosingCard />
      </main>
      <Footer />
    </div>
  );
}
