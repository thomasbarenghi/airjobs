'use client'
import { useState } from 'react'
import HeroSection from './HeroSection'
import JobsSection from './JobsSection'

const Content = () => {
  const [query, setQuery] = useState<Record<string, string>>({})
  return (
    <>
      <HeroSection setQuery={setQuery} query={query} />
      <JobsSection query={query} />
    </>
  )
}

export default Content
