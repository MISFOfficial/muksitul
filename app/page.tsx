import Hero from "./_Component/HeroSecton/Hero";
import Navigaton from "./_Component/Navigation/Navigaton";
import Skill from "./_Component/Skll/Skill";
import Projects from "./_Component/Projects/Projects";
import Services from "./_Component/Services/Services";

export default function Home() {
  return (
    <main className="">
      <div className="fixed top-0 left-0 w-full z-50 backdrop-blur-xl ">
        <Navigaton />
      </div>
      <div className="ratio  min-h-screen ">
        <Hero />
      </div>
      <Skill />
      <Projects />
      <Services />
    </main>
  );
}
