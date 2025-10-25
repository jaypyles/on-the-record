import { AboutUs } from "@/components/display/about-us";

export const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <AboutUs.Hero />
      <AboutUs.Mission />
      <AboutUs.ProfitSharing />
      <AboutUs.CallToAction />
    </div>
  );
};
