import { Navbar, Footer } from '@/components/layout';
import { Hero, Services, Portfolio, Process, Testimonials, CTA } from '@/components/sections';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Portfolio />
        <Process />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
