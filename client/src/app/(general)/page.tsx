import { JobsFlex } from '@/components'
import HeroSection from './components/HeroSection'

const Home = () => (
  <>
    <HeroSection />
    <section>
      <JobsFlex jobs={[]} />
    </section>
  </>
)

export default Home
