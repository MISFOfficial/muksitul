import Hero from "./_Component/HeroSecton/Hero";
import Navigaton from "./_Component/Navigation/Navigaton";
import Skill from "./_Component/Skll/Skill";
import Projects from "./_Component/Projects/Projects";
import Services from "./_Component/Services/Services";
import EngineeringMindset from "./_Component/EngineeringMindset/EngineeringMindset";
import Faq from "./_Component/Faq/Faq";
import Optical from "./_Component/Optical/Optical";
import AllProjects from "./_Component/Projects/AllProjects";
import HireMe from "./_Component/HireMe/HireMe";
import Footer from "./_Component/Footer/Footer";
import VideoResume from "./_Component/VideoResume/VideoResume";

export default function Home() {
  return (
    <main className="relative">
      <div className="sticky top-0 w-full z-50 backdrop-blur-xl ">

        <Navigaton />
      </div>
      <div className="ratio  min-h-screen ">
        <Hero />
      </div>


      <div className="ratio flex flex-col w-full  gap-30 mb-30">
        <Skill />
        <EngineeringMindset />
        <Projects />
        <AllProjects />
        <Services />
        <Optical />
        <Faq />
        <HireMe />
      </div>
      <Footer />
    </main>
  );
}

