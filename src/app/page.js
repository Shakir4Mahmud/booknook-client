import HeroSlider from "@/components/home/HeroSlider";
import StatsStrip from "@/components/home/StatsStrip";
import NewArrivals from "@/components/home/NewArrivals";
import TopCategories from "@/components/home/TopCategories";
import HowItWorks from "@/components/home/HowItWorks";
import WhyBookNook from "@/components/home/WhyBookNook";
import Reviews from "@/components/home/Reviews";
import FaqSection from "@/components/home/FaqSection";
import CtaBanner from "@/components/home/CtaBanner";
import { mockStats } from "@/lib/mock-books";

export default function Home() {
  return (
    <main>
      <HeroSlider />
      <StatsStrip stats={mockStats} />
      <NewArrivals />
      <TopCategories />
      <HowItWorks />
      <WhyBookNook />
      <Reviews />
      <FaqSection />
      <CtaBanner />
    </main>
  );
}