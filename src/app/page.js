import HeroSlider from "@/components/home/HeroSlider";
import HomeBooks from "@/components/home/HomeBooks";
import TopCategories from "@/components/home/TopCategories";
import HowItWorks from "@/components/home/HowItWorks";
import WhyBookNook from "@/components/home/WhyBookNook";
import Reviews from "@/components/home/Reviews";
import FaqSection from "@/components/home/FaqSection";
import CtaBanner from "@/components/home/CtaBanner";
import Reveal from "@/components/shared/Reveal";

export default function Home() {
  return (
    <main>
      <HeroSlider />
      <HomeBooks />
      <Reveal>
        <TopCategories />
      </Reveal>
      <Reveal>
        <HowItWorks />
      </Reveal>
      <Reveal>
        <WhyBookNook />
      </Reveal>
      <Reveal>
        <Reviews />
      </Reveal>
      <Reveal>
        <FaqSection />
      </Reveal>
      <Reveal>
        <CtaBanner />
      </Reveal>
    </main>
  );
}