import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { MobileCta } from "@/components/layout/MobileCta";
import { Hero } from "@/components/sections/Hero";
import { Faq } from "@/components/sections/Faq";
import { Features } from "@/components/sections/Features";
import { FinalCta } from "@/components/sections/FinalCta";
import { LogoCloud } from "@/components/sections/LogoCloud";
import { Process } from "@/components/sections/Process";
import { Pricing } from "@/components/sections/Pricing";
import { Services } from "@/components/sections/Services";
import { Testimonials } from "@/components/sections/Testimonials";
import { Work } from "@/components/sections/Work";
import { site } from "@/content/site";

export default function Home() {
  return (
    <>
      <Header />
      <main id="main" className="flex-1">
        <Hero content={site.hero} />
        <LogoCloud logos={site.logos} />
        <Services services={site.services} content={site.servicesSection} />
        <Process steps={site.process} content={site.processSection} />
        <Work projects={site.projects} content={site.workSection} />
        <Features features={site.features} content={site.featuresSection} />
        <Testimonials testimonials={site.testimonials} content={site.testimonialsSection} />
        <Pricing plans={site.plans} />
        <Faq faqs={site.faqs} />
        <FinalCta content={site.finalCta} />
      </main>
      <MobileCta label={site.hero.primaryCta} />
      <Footer />
    </>
  );
}
