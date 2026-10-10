import Ambient from '@/components/Ambient';
import Effects from '@/components/Effects';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Intro from '@/components/Intro';
import About from '@/components/About';
import Stats from '@/components/Stats';
import Portfolio from '@/components/Portfolio';
import Categories from '@/components/Categories';
import Services from '@/components/Services';
import Experience from '@/components/Experience';
import Showreel from '@/components/Showreel';
import Signature from '@/components/Signature';
import Testimonials from '@/components/Testimonials';
import FinalCta from '@/components/FinalCta';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Ambient />
      <a className="skip" href="#main">Skip to content</a>
      <Header />
      <main id="main">
        <Hero />
        <Intro />
        <About />
        <Stats />
        <Portfolio />
        <Categories />
        <Services />
        <Experience />
        <Showreel />
        <Signature />
        <Testimonials />
        <FinalCta />
        <Contact />
      </main>
      <Footer />
      <Effects />
    </>
  );
}
