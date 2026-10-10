import Hero from "../components/home/Hero.jsx";
import PopularDestinations from "../components/home/PopularDestinations.jsx";
import RecommendedHotels from "../components/home/RecommendedHotels.jsx";
import BestDeals from "../components/home/BestDeals.jsx";
import TopRatedHotels from "../components/home/TopRatedHotels.jsx";
import PopularTours from "../components/home/PopularTours.jsx";
import WhyStaySphere from "../components/home/WhyStaySphere.jsx";
import Testimonials from "../components/home/Testimonials.jsx";

function Home() {
  return (
    <>
      <Hero />
      <PopularDestinations />
      <RecommendedHotels />
      <BestDeals />
      <TopRatedHotels />
      <PopularTours />
      <WhyStaySphere />
      <Testimonials />
    </>
  );
}

export default Home;