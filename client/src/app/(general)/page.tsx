import type { Metadata } from 'next'
import JobsSection from './_components/JobsSection'
import HeroSection from './_components/HeroSection'

export const metadata: Metadata = {
  title: 'Find Jobs | Airjobs',
  themeColor: '#0F03C1'
}

interface JobsSectionProps {
  searchParams: Record<string, string>
}

const Home = ({ searchParams }: JobsSectionProps) => (
  <>
    <HeroSection />
    <JobsSection searchParams={searchParams} />
  </>
)

export default Home
