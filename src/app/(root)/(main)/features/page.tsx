import { FeaturesHero } from './components/features-hero'
import { FeaturesGrid } from './components/features-grid'
import { FeaturesCTA } from './components/features-cta'
import { FeaturesHighlight } from './components/features-highlight'
import { FeaturesWorkflow } from './components/features-workflow'
import { FeaturesStats } from './components/features-stats'

export default function FeaturesPage() {
  return (
    <>
      <FeaturesHero />
      <FeaturesGrid />
      <FeaturesHighlight />
      <FeaturesWorkflow />
      <FeaturesStats />
      <FeaturesCTA />
    </>
  )
}
