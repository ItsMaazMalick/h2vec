import { Hero } from "@/components/home/Hero";
import { FeaturedDatasets } from "@/components/home/FeaturedDatasets";
import { LatestResearch } from "@/components/home/LatestResearch";
import { OutreachHighlights } from "@/components/home/OutreachHighlights";
import { Partners } from "@/components/home/Partners";

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedDatasets />
      <LatestResearch />
      <OutreachHighlights />
      <Partners />
    </>
  );
}
