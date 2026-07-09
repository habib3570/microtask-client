import HeroSection from "../../components/home/HeroSection";
import StatsSection from "../../components/home/StatsSection";
import HowItWorks from "../../components/home/HowItWorks";
import TopWorkers from "../../components/home/TopWorkers";
import AvailableTasks from "../../components/home/AvailableTasks";
import WhyChooseUs from "../../components/home/WhyChooseUs";
import Testimonials from "../../components/home/Testimonials";
import CtaSection from "../../components/home/CtaSection";

const Home = () => {
  return (
    <div className="bg-white">
      <div id="home">
        <HeroSection />
      </div>
      <StatsSection />
      <div id="how-it-works">
        <HowItWorks />
      </div>
      <div id="top-workers">
        <TopWorkers />
      </div>
      <div id="browse-tasks">
        <AvailableTasks />
      </div>
      <div id="about">
        <WhyChooseUs />
      </div>
      <Testimonials />
      <CtaSection />
    </div>
  );
};

export default Home;