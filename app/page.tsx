import { Navigation } from '@/features/navigation'
import { Hero } from '@/features/hero'
import { Problem } from '@/features/problem'
import { What } from '@/features/what'
import { CTA } from '@/features/cta'
import { Footer } from '@/features/footer'

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <Problem />
        <What />
        <CTA />
      </main>
      <Footer />
    </>
  )
}
