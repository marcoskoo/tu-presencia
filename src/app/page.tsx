import { Navbar } from '@/components/landing/navbar'
import { Hero } from '@/components/landing/hero'
import { Practices } from '@/components/landing/practices'
import { Breathing } from '@/components/landing/breathing'
import { Meditations } from '@/components/landing/meditations'
import { Topics } from '@/components/landing/topics'
import { Quotes } from '@/components/landing/quotes'
import { Reflections } from '@/components/landing/reflections'
import { Newsletter } from '@/components/landing/newsletter'
import { Footer } from '@/components/landing/footer'

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Practices />
        <Breathing />
        <Meditations />
        <Topics />
        <Quotes />
        <Reflections />
        <Newsletter />
      </main>
      <Footer />
    </div>
  )
}
