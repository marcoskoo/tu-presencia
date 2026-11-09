import { Navbar } from '@/components/landing/navbar'
import { Hero } from '@/components/landing/hero'
import { Practices } from '@/components/landing/practices'
import { Breathing } from '@/components/landing/breathing'
import { Meditations } from '@/components/landing/meditations'
import { Sanctuary } from '@/components/landing/sanctuary'
import { Topics } from '@/components/landing/topics'
import { Quotes } from '@/components/landing/quotes'
import { Traditions } from '@/components/landing/traditions'
import { Reflections } from '@/components/landing/reflections'
import { Premium } from '@/components/landing/premium'
import { Newsletter } from '@/components/landing/newsletter'
import { Footer } from '@/components/landing/footer'
import { PauseOverlay } from '@/components/pause-overlay'
import { ServiceWorkerRegister } from '@/components/pwa/register'

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <ServiceWorkerRegister />
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Practices />
        <Breathing />
        <Meditations />
        <Sanctuary />
        <Topics />
        <Quotes />
        <Traditions />
        <Reflections />
        <Premium />
        <Newsletter />
      </main>
      <Footer />
      <PauseOverlay />
    </div>
  )
}
